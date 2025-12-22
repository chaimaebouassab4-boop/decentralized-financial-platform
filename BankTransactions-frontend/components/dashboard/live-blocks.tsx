"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Blocks, Clock, Hash, Cpu } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Block {
  number: number
  hash: string
  transactions: number
  gasUsed: string
  timestamp: string
  miner: string
}

export function LiveBlocks() {
  const [blocks, setBlocks] = useState<Block[]>([
    {
      number: 19245678,
      hash: "0x8f3c...4d2a",
      transactions: 142,
      gasUsed: "12.5M",
      timestamp: "12s ago",
      miner: "0x1a2b...9c8d",
    },
    {
      number: 19245677,
      hash: "0x7e2b...3c1f",
      transactions: 98,
      gasUsed: "11.2M",
      timestamp: "24s ago",
      miner: "0x4e5f...6g7h",
    },
    {
      number: 19245676,
      hash: "0x6d1a...2b0e",
      transactions: 156,
      gasUsed: "14.8M",
      timestamp: "36s ago",
      miner: "0x9i0j...1k2l",
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setBlocks((prev) => {
        const newBlock: Block = {
          number: prev[0].number + 1,
          hash: `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`,
          transactions: Math.floor(Math.random() * 200) + 50,
          gasUsed: `${(Math.random() * 5 + 10).toFixed(1)}M`,
          timestamp: "Just now",
          miner: `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`,
        }
        return [newBlock, ...prev.slice(0, 2)]
      })
    }, 12000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Live Blocks</CardTitle>
          <span className="flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
        </div>
        <CardDescription>Real-time Ethereum blockchain updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {blocks.map((block, index) => (
              <motion.div
                key={block.number}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`rounded-lg border p-3 transition-colors ${
                  index === 0 ? "border-primary/50 bg-primary/5" : "border-border"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Blocks className="h-4 w-4 text-primary" />
                    <span className="font-mono font-semibold">#{block.number.toLocaleString()}</span>
                    {index === 0 && (
                      <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-[10px] font-medium text-green-500">
                        NEW
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {block.timestamp}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <Hash className="h-3 w-3 text-muted-foreground" />
                    <span className="font-mono text-muted-foreground">{block.hash}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground">Txns:</span>
                    <span className="font-medium">{block.transactions}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Cpu className="h-3 w-3 text-muted-foreground" />
                    <span className="font-medium">{block.gasUsed}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}
