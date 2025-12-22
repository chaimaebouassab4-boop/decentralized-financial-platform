"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Wallet, ArrowUpRight, ArrowDownLeft, Copy, Check } from "lucide-react"
import { Counter } from "./counter"

interface Transaction {
  id: number
  type: "send" | "receive"
  amount: number
  token: string
  address: string
  time: string
}

export function WalletPreview() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, type: "receive", amount: 0.5, token: "ETH", address: "0x1a2b...3c4d", time: "2m ago" },
    { id: 2, type: "send", amount: 100, token: "USDC", address: "0x5e6f...7g8h", time: "15m ago" },
    { id: 3, type: "receive", amount: 0.25, token: "ETH", address: "0x9i0j...1k2l", time: "1h ago" },
  ])
  const [copied, setCopied] = useState(false)
  const [balance, setBalance] = useState(12847.56)

  useEffect(() => {
    // Simulate balance updates
    const interval = setInterval(() => {
      setBalance((prev) => prev + (Math.random() - 0.3) * 10)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Add new transactions periodically
    const interval = setInterval(() => {
      const newTx: Transaction = {
        id: Date.now(),
        type: Math.random() > 0.5 ? "receive" : "send",
        amount: Math.random() * 2,
        token: "ETH",
        address: `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`,
        time: "Just now",
      }
      setTransactions((prev) => [newTx, ...prev.slice(0, 2)])
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      className="w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="border-b border-border bg-secondary/30 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">Main Wallet</div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                0x7a8b...9c0d
                {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
              </button>
            </div>
          </div>
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
        </div>
      </div>

      {/* Balance */}
      <div className="p-6 text-center">
        <div className="text-sm text-muted-foreground">Total Balance</div>
        <motion.div className="mt-2 text-3xl font-bold text-foreground" key={Math.floor(balance)}>
          $<Counter end={balance} decimals={2} duration={1} />
        </motion.div>
        <div className="mt-1 text-sm text-green-500">+$234.56 (1.86%)</div>
      </div>

      {/* Recent Transactions */}
      <div className="border-t border-border p-4">
        <div className="mb-3 text-sm font-medium text-muted-foreground">Recent Activity</div>
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {transactions.map((tx) => (
              <motion.div
                key={tx.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center justify-between rounded-lg bg-secondary/30 p-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      tx.type === "receive" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    {tx.type === "receive" ? (
                      <ArrowDownLeft className="h-4 w-4" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      {tx.type === "receive" ? "Received" : "Sent"} {tx.token}
                    </div>
                    <div className="text-xs text-muted-foreground">{tx.address}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${tx.type === "receive" ? "text-green-500" : "text-red-500"}`}>
                    {tx.type === "receive" ? "+" : "-"}
                    {tx.amount.toFixed(4)} {tx.token}
                  </div>
                  <div className="text-xs text-muted-foreground">{tx.time}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
