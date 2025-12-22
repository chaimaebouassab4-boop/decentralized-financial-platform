"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

const generateData = (days: number) => {
  const data = []
  let value = 100000
  const now = new Date()

  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    value = value + (Math.random() - 0.45) * 5000
    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: Math.max(value, 80000),
      eth: Math.random() * 2 + 1,
      btc: Math.random() * 0.5 + 0.1,
    })
  }
  return data
}

const timeframes = [
  { label: "24H", days: 1 },
  { label: "7D", days: 7 },
  { label: "1M", days: 30 },
  { label: "3M", days: 90 },
  { label: "1Y", days: 365 },
]

export function PortfolioChart() {
  const [selectedTimeframe, setSelectedTimeframe] = useState(30)
  const [data, setData] = useState<Array<{ date: string; value: number; eth: number; btc: number }>>([])

  // Generate chart data on the client to avoid SSR/client hydration mismatches from Math.random
  useEffect(() => {
    setData(generateData(selectedTimeframe))
  }, [selectedTimeframe])

  const latestValue = data.length ? data[data.length - 1].value : null

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Portfolio Value</CardTitle>
            <CardDescription>Track your total portfolio performance</CardDescription>
          </div>
          <div className="flex gap-1">
            {timeframes.map((tf) => (
              <Button
                key={tf.label}
                variant={selectedTimeframe === tf.days ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedTimeframe(tf.days)}
                className="h-8 px-3"
              >
                {tf.label}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold">
              {latestValue !== null ? `$${latestValue.toLocaleString()}` : "—"}
            </span>
            <span className="text-sm font-medium text-green-500">+12.5% all time</span>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--card-foreground))",
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, "Portfolio Value"]}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
