"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Fuel, TrendingDown, TrendingUp, Minus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function GasTracker() {
  const [gasPrice, setGasPrice] = useState({
    slow: 25,
    standard: 32,
    fast: 45,
    instant: 58,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setGasPrice({
        slow: Math.floor(Math.random() * 10) + 20,
        standard: Math.floor(Math.random() * 15) + 28,
        fast: Math.floor(Math.random() * 20) + 40,
        instant: Math.floor(Math.random() * 25) + 55,
      })
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const gasTiers = [
    { label: "Slow", value: gasPrice.slow, time: "~10 min", trend: "down" },
    { label: "Standard", value: gasPrice.standard, time: "~3 min", trend: "stable" },
    { label: "Fast", value: gasPrice.fast, time: "~30 sec", trend: "up" },
    { label: "Instant", value: gasPrice.instant, time: "~15 sec", trend: "up" },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-red-500" />
      case "down":
        return <TrendingDown className="h-3 w-3 text-green-500" />
      default:
        return <Minus className="h-3 w-3 text-muted-foreground" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Fuel className="h-5 w-5 text-primary" />
          <CardTitle>Gas Tracker</CardTitle>
        </div>
        <CardDescription>Current Ethereum gas prices (Gwei)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {gasTiers.map((tier, index) => (
            <motion.div
              key={tier.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-lg border border-border p-3 text-center"
            >
              <div className="flex items-center justify-center gap-1 mb-1">
                <span className="text-xs text-muted-foreground">{tier.label}</span>
                {getTrendIcon(tier.trend)}
              </div>
              <motion.p
                key={tier.value}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-2xl font-bold text-foreground"
              >
                {tier.value}
              </motion.p>
              <p className="text-xs text-muted-foreground">{tier.time}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 rounded-lg bg-secondary/50 p-3">
          <p className="text-xs text-muted-foreground text-center">
            Base Fee: <span className="font-medium text-foreground">{Math.floor(gasPrice.standard * 0.8)} Gwei</span>
            {" • "}
            Priority Fee:{" "}
            <span className="font-medium text-foreground">{Math.floor(gasPrice.standard * 0.2)} Gwei</span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
