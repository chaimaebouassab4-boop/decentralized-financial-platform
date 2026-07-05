"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Wallet,
  FileCheck2,
  Gauge,
  Link2,
  ShieldCheck,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useWallet } from "@/hooks/use-wallet"

const features = [
  {
    icon: ShieldCheck,
    text: "Role-based access for customs officers, importers and brokers",
    colorClass: "text-teal-600 dark:text-teal-400",
  },
  {
    icon: FileCheck2,
    text: "Blockchain-verified declarations and trade documents",
    colorClass: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: Gauge,
    text: "Automated risk scoring on every declaration",
    colorClass: "text-amber-600 dark:text-amber-400",
  },
  {
    icon: Link2,
    text: "Immutable audit trail for every customs operation",
    colorClass: "text-emerald-600 dark:text-emerald-400",
  },
]

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { login, signup, continueAsGuest } = useAuth()
  const { connect, isConnecting } = useWallet()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      if (isLogin) {
        await login(email, password)
      } else {
        await signup(email, password, name || email.split("@")[0])
      }
      router.push("/dashboard")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWalletConnect = async () => {
    await connect()
    router.push("/dashboard")
  }

  const handleGuest = () => {
    continueAsGuest()
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden flex flex-col">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />
      </div>

      <Navbar />

      <main className="relative flex flex-1 items-center justify-center px-4 pt-24 pb-12">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Info */}
          <div className="hidden lg:block space-y-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </Link>

            <div className="space-y-4">
              <h1 className="text-5xl font-bold leading-tight text-foreground">
                Access the
                <span className="block bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">
                  Digital Customs Platform
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Sign in or connect your wallet to manage declarations, verify documents and track
                blockchain-secured trade flows.
              </p>
            </div>

            {/* Feature highlights */}
            <div className="space-y-4">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 text-muted-foreground group hover:translate-x-2 transition-transform duration-300"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center bg-card border border-border shadow-sm ${feature.colorClass} transition-all duration-300 group-hover:scale-110`}
                  >
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <span className="font-medium group-hover:text-foreground transition-colors duration-300">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Blockchain flow visual */}
            <div className="flex items-center gap-3 pt-4">
              {["Declare", "Verify", "Execute", "Anchor", "Clear"].map((label, i) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="flex h-14 w-14 flex-col items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-blue-600 text-white shadow-lg shadow-teal-500/20">
                    <span className="text-[10px] font-semibold">{label}</span>
                    <span className="text-[8px] opacity-80">#{i + 1}</span>
                  </div>
                  {i < 4 && <span className="h-px w-3 bg-border" />}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="w-full max-w-md mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
              {/* Toggle Login/Register */}
              <div className="flex gap-2 mb-8 p-1 rounded-lg bg-secondary">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-300 text-center ${
                    isLogin
                      ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg shadow-teal-500/30"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-300 text-center ${
                    !isLogin
                      ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg shadow-teal-500/30"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <h2 className="text-2xl font-bold text-foreground mb-6">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>

              {/* Wallet Login */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={handleWalletConnect}
                  disabled={isConnecting}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <Wallet className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                  {isConnecting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Connecting...
                    </span>
                  ) : (
                    "Connect MetaMask"
                  )}
                </button>

                <button
                  onClick={handleGuest}
                  className="w-full flex items-center justify-center gap-2 border border-border bg-secondary/50 hover:bg-secondary text-foreground py-3 px-4 rounded-lg font-medium transition-all duration-300"
                >
                  Continue as Guest (Demo)
                </button>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-card text-muted-foreground">Or continue with email</span>
                </div>
              </div>

              {/* Email/Password Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <label className="text-sm text-foreground">Full Name</label>
                    <Input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-12 rounded-lg"
                      required
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm text-foreground">Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      type="email"
                      placeholder="officer@customs.gov.ma"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 rounded-lg"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-foreground">Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-12 rounded-lg"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {isLogin && (
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
                      <input type="checkbox" className="rounded border-border" />
                      Remember me
                    </label>
                    <a href="#" className="text-primary hover:underline transition-colors">
                      Forgot password?
                    </a>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white h-12 rounded-lg font-semibold shadow-lg shadow-teal-500/30 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : isLogin ? (
                    "Sign In"
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>

              {/* Footer */}
              <p className="mt-6 text-center text-sm text-muted-foreground">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary hover:underline font-medium transition-colors"
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </div>

            {/* Mobile back button */}
            <Link
              href="/"
              className="lg:hidden mt-6 inline-flex items-center gap-2 text-primary hover:underline transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
