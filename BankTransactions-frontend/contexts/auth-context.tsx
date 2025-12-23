"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type AuthMode = "authenticated" | "guest" | null

interface User {
  id: string
  email: string
  name: string
  avatar?: string
  walletAddress?: string
}

interface AuthContextType {
  user: User | null
  authMode: AuthMode
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  loginWithWallet: (address: string) => Promise<void>
  continueAsGuest: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [authMode, setAuthMode] = useState<AuthMode>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedAuthMode = localStorage.getItem("finchain_auth_mode") as AuthMode
    const savedUser = localStorage.getItem("finchain_user")

    if (savedAuthMode === "guest") {
      setAuthMode("guest")
    } else if (savedAuthMode === "authenticated" && savedUser) {
      setUser(JSON.parse(savedUser))
      setAuthMode("authenticated")
    }

    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Simulated login - replace with real API
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser: User = {
      id: "1",
      email,
      name: email.split("@")[0],
      avatar: "/diverse-avatars.png",
    }

    setUser(mockUser)
    setAuthMode("authenticated")
    localStorage.setItem("finchain_auth_mode", "authenticated")
    localStorage.setItem("finchain_user", JSON.stringify(mockUser))
    setIsLoading(false)
  }

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser: User = {
      id: "1",
      email,
      name,
      avatar: "/diverse-avatars.png",
    }

    setUser(mockUser)
    setAuthMode("authenticated")
    localStorage.setItem("finchain_auth_mode", "authenticated")
    localStorage.setItem("finchain_user", JSON.stringify(mockUser))
    setIsLoading(false)
  }

  const loginWithWallet = async (address: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser: User = {
      id: "1",
      email: "",
      name: `${address.slice(0, 6)}...${address.slice(-4)}`,
      walletAddress: address,
    }

    setUser(mockUser)
    setAuthMode("authenticated")
    localStorage.setItem("finchain_auth_mode", "authenticated")
    localStorage.setItem("finchain_user", JSON.stringify(mockUser))
    setIsLoading(false)
  }

  const continueAsGuest = () => {
    setAuthMode("guest")
    setUser(null)
    localStorage.setItem("finchain_auth_mode", "guest")
    localStorage.removeItem("finchain_user")
  }

  const logout = () => {
    setUser(null)
    setAuthMode(null)
    localStorage.removeItem("finchain_auth_mode")
    localStorage.removeItem("finchain_user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        authMode,
        isLoading,
        login,
        signup,
        loginWithWallet,
        continueAsGuest,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
