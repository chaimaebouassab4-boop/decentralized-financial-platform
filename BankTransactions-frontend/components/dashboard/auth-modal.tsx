"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Mail, Lock, Eye, EyeOff, Wallet, Zap, User, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/contexts/auth-context"

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string }) => Promise<string[]>
      isMetaMask?: boolean
    }
  }
}

export function AuthModal() {
  const { login, signup, loginWithWallet, continueAsGuest, isLoading } = useAuth()
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin")
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [walletConnecting, setWalletConnecting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      if (activeTab === "signin") {
        await login(email, password)
      } else {
        if (!agreeTerms) {
          setError("Please agree to the terms and conditions")
          return
        }
        await signup(email, password, name)
      }
    } catch (err) {
      setError("Authentication failed. Please try again.")
    }
  }

  const handleMetaMaskConnect = async () => {
    if (typeof window.ethereum === "undefined") {
      setError("MetaMask is not installed. Please install it to continue.")
      return
    }

    setWalletConnecting(true)
    setError("")

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      if (accounts[0]) {
        await loginWithWallet(accounts[0])
      }
    } catch (err) {
      setError("Failed to connect wallet. Please try again.")
    } finally {
      setWalletConnecting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="relative rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
          {/* Gradient top border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-teal-400 to-primary" />

          {/* Header */}
          <div className="pt-8 pb-4 px-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.1 }}
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-teal-500/20 border border-primary/20"
            >
              <Shield className="h-8 w-8 text-primary" />
            </motion.div>
            <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
            <p className="mt-1 text-sm text-muted-foreground">Sign in to access your FinChain dashboard</p>
          </div>

          {/* Tabs */}
          <div className="px-8">
            <div className="flex rounded-lg bg-muted p-1">
              <button
                onClick={() => setActiveTab("signin")}
                className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${
                  activeTab === "signin"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setActiveTab("signup")}
                className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${
                  activeTab === "signup"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 pt-6">
            {/* Wallet Connect */}
            <div className="mb-6">
              <Label className="text-xs text-muted-foreground mb-2 block">Connect Wallet (Optional)</Label>
              <Button
                variant="outline"
                className="w-full justify-between h-14 border-dashed bg-transparent"
                onClick={handleMetaMaskConnect}
                disabled={walletConnecting}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                    <Wallet className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">MetaMask Wallet</p>
                    <p className="text-xs text-muted-foreground">Connect for Web3 features</p>
                  </div>
                </div>
                <Zap className={`h-4 w-4 text-muted-foreground ${walletConnecting ? "animate-pulse" : ""}`} />
              </Button>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-3 text-muted-foreground uppercase tracking-wider">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {activeTab === "signup" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </Label>
                    <div className="relative mt-1.5">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10"
                        required={activeTab === "signup"}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {activeTab === "signin" ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                      Remember me
                    </Label>
                  </div>
                  <a href="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
              ) : (
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreeTerms}
                    onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                    I agree to the{" "}
                    <a href="#" className="text-primary hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                  </Label>
                </div>
              )}

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-destructive text-center"
                >
                  {error}
                </motion.p>
              )}

              <Button type="submit" className="w-full h-11 gap-2" disabled={isLoading}>
                {isLoading ? (
                  <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <>
                    {activeTab === "signin" ? "Sign In" : "Create Account"}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            {/* Guest Mode */}
            <div className="mt-6 pt-6 border-t border-border">
              <Button
                variant="ghost"
                className="w-full gap-2 text-muted-foreground hover:text-foreground"
                onClick={continueAsGuest}
              >
                <Sparkles className="h-4 w-4" />
                Continue as Guest (Demo Mode)
              </Button>
              <p className="mt-2 text-xs text-center text-muted-foreground">
                Explore the dashboard with sample data. No account required.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
