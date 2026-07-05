"use client"

import { motion } from "framer-motion"
import {
  TrendingUp,
  TrendingDown,
  FileText,
  FileSearch,
  CheckCircle2,
  Blocks,
  AlertTriangle,
  FileCheck2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    title: "Total Declarations",
    value: "3,247",
    change: "+9.6%",
    trend: "up",
    icon: FileText,
    description: "This year",
  },
  {
    title: "Pending Verifications",
    value: "342",
    change: "-4.1%",
    trend: "down",
    icon: FileSearch,
    description: "Awaiting review",
  },
  {
    title: "Validated Transactions",
    value: "5,642",
    change: "+12.3%",
    trend: "up",
    icon: CheckCircle2,
    description: "Duties & taxes settled",
  },
  {
    title: "Blockchain Records",
    value: "21,642",
    change: "+18.7%",
    trend: "up",
    icon: Blocks,
    description: "Anchored on-chain",
  },
  {
    title: "High Risk Cases",
    value: "244",
    change: "-2.8%",
    trend: "down",
    icon: AlertTriangle,
    description: "Red channel",
  },
  {
    title: "Documents Processed",
    value: "4,218",
    change: "+7.4%",
    trend: "up",
    icon: FileCheck2,
    description: "Hashed & verified",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08 }}
        >
          <Card className="relative h-full overflow-hidden">
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
                  <TrendingDown className="h-3 w-3 text-emerald-500" />
                )}
                <span className={`text-xs font-medium ${stat.trend === "up" ? "text-green-500" : "text-emerald-500"}`}>
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
