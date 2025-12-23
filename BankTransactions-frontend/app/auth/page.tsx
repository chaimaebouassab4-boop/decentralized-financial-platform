"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Wallet, Github, Chrome } from "lucide-react"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  const connectWallet = async () => {
    setIsLoading(true)
    // Simulate wallet connection
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
  }

  return (
<div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative overflow-hidden flex flex-col">      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow-delayed"></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-blue-400 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-cyan-400 rounded-full animate-float-delayed"></div>
        
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]"></div>
      </div>

      <Navbar />
      
      <main className="relative flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Info */}
         {/* Left Side - Info */}
          <div className="hidden lg:block space-y-8 animate-slide-in-left">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-600 dark:text-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors group">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </Link>
            
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-slate-900 dark:text-white leading-tight">
                Welcome to the
                <span className="block bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                  Future of Finance
                </span>
              </h1>
              {/* FIXED: Readable dark gray in Light Mode */}
              <p className="text-xl text-slate-600 dark:text-slate-400">
                Connect your wallet or sign in to access decentralized financial services
              </p>
            </div>

            {/* Feature highlights */}
            <div className="space-y-4">
              {[
                { 
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  ), 
                  text: "Bank-grade security",
                  // Dynamic colors: Darker for light mode, brighter for dark mode
                  colorClass: "text-cyan-600 dark:text-cyan-400" 
                },
                { 
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ), 
                  text: "Instant transactions",
                  colorClass: "text-purple-600 dark:text-purple-400"
                },
                { 
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ), 
                  text: "Global access 24/7",
                  colorClass: "text-blue-600 dark:text-blue-400"
                },
                { 
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ), 
                  text: "Blockchain verified",
                  colorClass: "text-green-600 dark:text-green-400"
                }
              ].map((feature, i) => (
                <div 
                  key={i}
                  className="flex items-center gap-4 text-slate-600 dark:text-slate-300 animate-fade-in group hover:translate-x-2 transition-transform duration-300"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center
                    bg-white dark:bg-slate-800
                    fancy-border
                    shadow-sm dark:shadow-none
                    ${feature.colorClass}
                    transition-all duration-300 group-hover:scale-110 group-hover:rotate-3
                  `}>
                    {feature.icon}
                  </div>
                  <span className="font-medium group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Animated blockchain visualization */}
            <div className="relative h-32 mt-8">
              <div className="absolute inset-0 flex items-center justify-between">
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i}
                    className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg animate-pulse-slow shadow-lg shadow-cyan-500/20"
                    style={{ 
                      animationDelay: `${i * 200}ms`,
                      opacity: 0.6 + (i * 0.1)
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="w-full max-w-md mx-auto animate-slide-in-right">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500">
              
              {/* Toggle Login/Register */}
              <div className="flex gap-2 mb-8 p-1 rounded-lg fancy-border bg-white/60 dark:bg-slate-800/50">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-300 flex items-center justify-center text-center ${
                    isLogin
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50 ring-1 ring-cyan-400/20' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-white hover:scale-[1.02]'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-300 flex items-center justify-center text-center ${
                    !isLogin
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50 ring-1 ring-cyan-400/20' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-white hover:scale-[1.02]'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <h2 className="text-2xl font-bold text-white mb-6">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>

              {/* Web3 Login Options */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={connectWallet}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <Wallet className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Connecting...
                    </span>
                  ) : (
                    'Connect MetaMask'
                  )}
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group">
                    <Github className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                    GitHub
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group">
                    <Chrome className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                    Google
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-slate-900/50 text-slate-400">Or continue with email</span>
                </div>
              </div>

              {/* Email/Password Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-slate-900">Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-slate-50 border-slate-700 focus:border-cyan-500 focus:ring-cyan-500/20 text-white placeholder:text-slate-500 h-12 rounded-lg transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-slate-900">Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 bg-slate-50 border-slate-700 focus:border-cyan-500 focus:ring-cyan-500/20 text-white placeholder:text-slate-500 h-12 rounded-lg transition-all duration-300"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {isLogin && (
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-slate-900 cursor-pointer">
                      <input type="checkbox" className="rounded border-slate-700 bg-slate-50 text-cyan-500 focus:ring-cyan-500/20" />
                      Remember me
                    </label>
                    <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                      Forgot password?
                    </a>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white h-12 rounded-lg font-semibold shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </span>
                  ) : (
                    isLogin ? 'Sign In' : 'Create Account'
                  )}
                </Button>
              </form>

              {/* Footer */}
              <p className="mt-6 text-center text-sm text-slate-900">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>

            {/* Mobile back button */}
            <Link href="/" className="lg:hidden mt-6 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-30px) translateX(5px); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-30px) translateX(-10px); }
          50% { transform: translateY(-15px) translateX(10px); }
          75% { transform: translateY(-25px) translateX(-5px); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }

        @keyframes pulse-slow-delayed {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.08); }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-pulse-slow-delayed {
          animation: pulse-slow-delayed 5s ease-in-out infinite;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}