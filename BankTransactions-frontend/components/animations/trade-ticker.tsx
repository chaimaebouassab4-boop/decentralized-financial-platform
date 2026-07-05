"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Anchor } from "lucide-react"

interface PortActivity {
  code: string
  name: string
  declarationsToday: number
  clearanceRate: number // percentage of declarations cleared
  trend: number // daily variation in %
}

const initialPorts: PortActivity[] = [
  { code: "TNG", name: "Tanger Med", declarationsToday: 342, clearanceRate: 94.2, trend: 3.4 },
  { code: "CAS", name: "Casablanca Port", declarationsToday: 268, clearanceRate: 91.8, trend: 1.2 },
  { code: "AGA", name: "Agadir Port", declarationsToday: 87, clearanceRate: 96.1, trend: -0.8 },
  { code: "NDR", name: "Nador West Med", declarationsToday: 64, clearanceRate: 92.5, trend: 4.1 },
  { code: "JFL", name: "Jorf Lasfar", declarationsToday: 52, clearanceRate: 89.7, trend: -1.5 },
  { code: "CMN", name: "Casablanca Airport", declarationsToday: 121, clearanceRate: 97.3, trend: 2.2 },
]

export function TradeTicker() {
  const [ports, setPorts] = useState(initialPorts)

  // Simulate live activity for the demo
  useEffect(() => {
    const interval = setInterval(() => {
      setPorts((prev) =>
        prev.map((port) => ({
          ...port,
          declarationsToday: port.declarationsToday + (Math.random() > 0.6 ? 1 : 0),
          trend: Math.max(-9, Math.min(9, port.trend + (Math.random() - 0.5) * 0.4)),
        })),
      )
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  // Duplicate for seamless loop
  const duplicatedPorts = [...ports, ...ports]

  return (
    <div className="relative overflow-hidden border-y border-border/50 bg-card/30 backdrop-blur-sm py-3">
      <motion.div
        className="flex gap-8"
        animate={{ x: [0, -60 * ports.length * 8] }}
        transition={{
          x: {
            duration: 40,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          },
        }}
      >
        {duplicatedPorts.map((port, i) => (
          <div key={`${port.code}-${i}`} className="flex items-center gap-4 whitespace-nowrap px-4">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Anchor className="h-3.5 w-3.5" />
              </span>
              <div>
                <div className="text-sm font-medium text-foreground">{port.name}</div>
                <div className="text-xs text-muted-foreground">Customs office {port.code}</div>
              </div>
            </div>
            <div className="text-right">
              <motion.div
                className="font-mono text-sm font-medium text-foreground"
                key={port.declarationsToday}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
              >
                {port.declarationsToday} declarations today
              </motion.div>
              <div
                className={`flex items-center justify-end gap-1 text-xs ${port.trend >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {port.trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {port.trend >= 0 ? "+" : ""}
                {port.trend.toFixed(1)}% vs yesterday
              </div>
            </div>
            <div className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              {port.clearanceRate.toFixed(1)}% cleared
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
