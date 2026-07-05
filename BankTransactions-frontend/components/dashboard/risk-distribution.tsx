"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Gauge, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { riskDistribution } from "@/data/risk"

export function RiskDistribution() {
  const total = riskDistribution.reduce((sum, item) => sum + item.count, 0)

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Gauge className="h-5 w-5 text-primary" />
            <CardTitle>Risk Level Distribution</CardTitle>
          </div>
          <CardDescription>Automated scoring across {total.toLocaleString()} active declarations</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Stacked bar */}
          <div className="mb-6 flex h-3 w-full overflow-hidden rounded-full bg-secondary">
            {riskDistribution.map((item) => (
              <motion.div
                key={item.level}
                initial={{ width: 0 }}
                animate={{ width: `${item.percentage}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ backgroundColor: item.color }}
              />
            ))}
          </div>

          <div className="space-y-4">
            {riskDistribution.map((item, index) => (
              <motion.div
                key={item.level}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.level} Risk</p>
                    <p className="text-xs text-muted-foreground">
                      {item.level === "Low"
                        ? "Green channel — automatic release"
                        : item.level === "Medium"
                          ? "Orange channel — document check"
                          : "Red channel — physical inspection"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{item.count.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{item.percentage}%</p>
                </div>
              </motion.div>
            ))}
          </div>

          <Link
            href="/risk-analysis"
            className="mt-5 flex items-center justify-center gap-1.5 rounded-lg border border-border py-2 text-sm font-medium text-primary transition-colors hover:bg-secondary/50"
          >
            Open Risk Analysis
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  )
}
