"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Wallet, ArrowLeftRight, Blocks, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    title: "Total Balance",
    value: "$124,582.00",
    change: "+12.5%",
    trend: "up",
    icon: Wallet,
    description: "Across all wallets",
  },
  {
    title: "Transactions",
    value: "2,847",
    change: "+8.2%",
    trend: "up",
    icon: ArrowLeftRight,
    description: "This month",
  },
  {
    title: "Gas Spent",
    value: "1.24 ETH",
    change: "-3.1%",
    trend: "down",
    icon: DollarSign,
    description: "Last 30 days",
  },
  {
    title: "Blocks Verified",
    value: "12,456",
    change: "+24.8%",
    trend: "up",
    icon: Blocks,
    description: "Total verified",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 mt-1">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span className={`text-xs font-medium ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-muted-foreground">{stat.description}</span>
              </div>
            </CardContent>
            {/* Decorative gradient */}
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
