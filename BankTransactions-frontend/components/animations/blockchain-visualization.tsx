"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Block {
  id: number
  hash: string
  prevHash: string
  timestamp: number
  transactions: number
  x: number
  y: number
  isNew: boolean
}

interface Transaction {
  id: number
  from: { x: number; y: number }
  to: { x: number; y: number }
  progress: number
}

export function BlockchainVisualization() {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const generateHash = () => {
    return "0x" + Math.random().toString(16).substring(2, 10).toUpperCase()
  }

  useEffect(() => {
    // Initialize blocks
    const initialBlocks: Block[] = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      hash: generateHash(),
      prevHash: i > 0 ? generateHash() : "0x00000000",
      timestamp: Date.now() - (5 - i) * 10000,
      transactions: Math.floor(Math.random() * 50) + 10,
      x: 120 + i * 140,
      y: 100,
      isNew: false,
    }))
    setBlocks(initialBlocks)

    // Add new blocks periodically
    const blockInterval = setInterval(() => {
      setBlocks((prev) => {
        const newBlock: Block = {
          id: Date.now(),
          hash: generateHash(),
          prevHash: prev[prev.length - 1]?.hash || "0x00000000",
          timestamp: Date.now(),
          transactions: Math.floor(Math.random() * 50) + 10,
          x: 120 + prev.length * 140,
          y: 100,
          isNew: true,
        }
        const updated = [...prev.slice(-4), newBlock].map((b, i) => ({
          ...b,
          x: 120 + i * 140,
          isNew: b.id === newBlock.id,
        }))
        return updated
      })
    }, 4000)

    // Animate transactions
    const txInterval = setInterval(() => {
      const newTx: Transaction = {
        id: Date.now(),
        from: { x: Math.random() * 600 + 50, y: Math.random() * 60 + 20 },
        to: { x: Math.random() * 600 + 50, y: 100 },
        progress: 0,
      }
      setTransactions((prev) => [...prev.slice(-10), newTx])
    }, 800)

    return () => {
      clearInterval(blockInterval)
      clearInterval(txInterval)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative h-[200px] w-full overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#22d3ee08_1px,transparent_1px),linear-gradient(to_bottom,#22d3ee08_1px,transparent_1px)] bg-[size:20px_20px]" />

      {/* Transaction paths */}
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="txGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(34, 211, 238, 0)" />
            <stop offset="50%" stopColor="rgba(34, 211, 238, 0.8)" />
            <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
          </linearGradient>
        </defs>

        {/* Block connections */}
        {blocks.map((block, i) => {
          if (i === 0) return null
          const prevBlock = blocks[i - 1]
          return (
            <motion.line
              key={`line-${block.id}`}
              x1={prevBlock.x + 40}
              y1={block.y}
              x2={block.x - 40}
              y2={block.y}
              stroke="rgba(34, 211, 238, 0.3)"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }}
            />
          )
        })}

        {/* Transaction animations */}
        {transactions.map((tx) => (
          <motion.circle
            key={tx.id}
            cx={tx.from.x}
            cy={tx.from.y}
            r="3"
            fill="#22d3ee"
            initial={{ cx: tx.from.x, cy: tx.from.y, opacity: 1 }}
            animate={{ cx: tx.to.x, cy: tx.to.y, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        ))}
      </svg>

      {/* Blocks */}
      <AnimatePresence mode="popLayout">
        {blocks.map((block) => (
          <motion.div
            key={block.id}
            className="absolute"
            style={{ left: block.x - 40, top: block.y - 35 }}
            initial={block.isNew ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <div
              className={`flex h-[70px] w-[80px] flex-col items-center justify-center rounded-lg border ${
                block.isNew ? "border-primary bg-primary/20 glow-cyan" : "border-border bg-card"
              } p-2 transition-all`}
            >
              <div className="text-[8px] font-mono text-muted-foreground truncate w-full text-center">{block.hash}</div>
              <div className="text-xs font-bold text-foreground">#{block.id}</div>
              <div className="text-[8px] text-muted-foreground">{block.transactions} txns</div>
            </div>
            {block.isNew && (
              <motion.div
                className="absolute inset-0 rounded-lg border-2 border-primary"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 1, repeat: 2 }}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Labels */}
      <div className="absolute bottom-3 left-3 text-xs text-muted-foreground">Live Blockchain Activity</div>
      <div className="absolute bottom-3 right-3 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
        <span className="text-xs text-muted-foreground">Synced</span>
      </div>
    </div>
  )
}
