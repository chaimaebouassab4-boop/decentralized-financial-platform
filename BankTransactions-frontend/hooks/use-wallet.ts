"use client"

import { useState, useCallback } from "react"
import { useAuth } from "@/contexts/auth-context"

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
      isMetaMask?: boolean
    }
  }
}

export function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

/**
 * Wallet connection hook.
 * Uses MetaMask (window.ethereum) when available; falls back to a demo
 * address so the platform remains fully demonstrable without a wallet.
 */
export function useWallet() {
  const { user, loginWithWallet, logout } = useAuth()
  const [isConnecting, setIsConnecting] = useState(false)

  const address = user?.walletAddress ?? null

  const connect = useCallback(async () => {
    if (isConnecting) return
    setIsConnecting(true)
    try {
      if (typeof window !== "undefined" && window.ethereum) {
        const accounts = (await window.ethereum.request({
          method: "eth_requestAccounts",
        })) as string[]
        if (accounts?.[0]) {
          await loginWithWallet(accounts[0])
        }
      } else {
        // Demo mode: no MetaMask installed
        await loginWithWallet("0x742d35Cc6634C0532925a3b844Bc9e7595f2bD78")
      }
    } catch {
      // User rejected the connection request — nothing to do
    } finally {
      setIsConnecting(false)
    }
  }, [isConnecting, loginWithWallet])

  return {
    address,
    shortAddress: address ? shortenAddress(address) : null,
    isConnected: !!address,
    isConnecting,
    connect,
    disconnect: logout,
  }
}
