"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TrendingUp, TrendingDown } from "lucide-react"

interface CryptoPrice {
  symbol: string
  name: string
  price: number
  change: number
  sparkline: number[]
}

const initialCryptos: CryptoPrice[] = [
  { symbol: "BTC", name: "Bitcoin", price: 67234.56, change: 2.34, sparkline: [65000, 66000, 65500, 67000, 67234] },
  { symbol: "ETH", name: "Ethereum", price: 3456.78, change: -1.23, sparkline: [3500, 3480, 3420, 3450, 3456] },
  { symbol: "SOL", name: "Solana", price: 178.9, change: 5.67, sparkline: [165, 170, 175, 172, 178] },
  { symbol: "MATIC", name: "Polygon", price: 0.89, change: 3.45, sparkline: [0.85, 0.86, 0.88, 0.87, 0.89] },
  { symbol: "LINK", name: "Chainlink", price: 18.45, change: -0.56, sparkline: [18.8, 18.6, 18.5, 18.3, 18.45] },
  { symbol: "AVAX", name: "Avalanche", price: 42.3, change: 4.21, sparkline: [40, 41, 40.5, 42, 42.3] },
]

function Sparkline({ data, isPositive }: { data: number[]; isPositive: boolean }) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const width = 60
  const height = 24

  const points = data
    .map((value, i) => {
      const x = (i / (data.length - 1)) * width
      const y = height - ((value - min) / range) * height
      return `${x},${y}`
    })
    .join(" ")

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={isPositive ? "#22c55e" : "#ef4444"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CryptoTicker() {
  const [cryptos, setCryptos] = useState(initialCryptos)

  useEffect(() => {
    const interval = setInterval(() => {
      setCryptos((prev) =>
        prev.map((crypto) => {
          const changePercent = (Math.random() - 0.5) * 0.5
          const newPrice = crypto.price * (1 + changePercent / 100)
          const newChange = crypto.change + (Math.random() - 0.5) * 0.2
          const newSparkline = [...crypto.sparkline.slice(1), newPrice]
          return {
            ...crypto,
            price: newPrice,
            change: newChange,
            sparkline: newSparkline,
          }
        }),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Duplicate for seamless loop
  const duplicatedCryptos = [...cryptos, ...cryptos]

  return (
    <div className="relative overflow-hidden border-y border-border/50 bg-card/30 backdrop-blur-sm py-3">
      <motion.div
        className="flex gap-8"
        animate={{ x: [0, -50 * cryptos.length * 8] }}
        transition={{
          x: {
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          },
        }}
      >
        {duplicatedCryptos.map((crypto, i) => (
          <div key={`${crypto.symbol}-${i}`} className="flex items-center gap-4 whitespace-nowrap px-4">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                {crypto.symbol.slice(0, 2)}
              </span>
              <div>
                <div className="text-sm font-medium text-foreground">{crypto.symbol}</div>
                <div className="text-xs text-muted-foreground">{crypto.name}</div>
              </div>
            </div>
            <div className="text-right">
              <motion.div
                className="font-mono text-sm font-medium text-foreground"
                key={crypto.price}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
              >
                ${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </motion.div>
              <div
                className={`flex items-center gap-1 text-xs ${crypto.change >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {crypto.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {crypto.change >= 0 ? "+" : ""}
                {crypto.change.toFixed(2)}%
              </div>
            </div>
            <Sparkline data={crypto.sparkline} isPositive={crypto.change >= 0} />
          </div>
        ))}
      </motion.div>
    </div>
  )
}
