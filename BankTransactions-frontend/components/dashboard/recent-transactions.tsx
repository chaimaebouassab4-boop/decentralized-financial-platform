"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Landmark, Receipt, FileText, AlertCircle, Warehouse, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { customsTransactions, type PaymentType } from "@/data/transactions"
import { formatMAD } from "@/data/declarations"

const typeIcons: Record<PaymentType, typeof Landmark> = {
  "Customs Duty": Landmark,
  "Import VAT": Receipt,
  "Clearance Fee": FileText,
  Penalty: AlertCircle,
  "Storage Fee": Warehouse,
}

const typeColors: Record<PaymentType, string> = {
  "Customs Duty": "bg-teal-500/15 text-teal-600 dark:text-teal-400",
  "Import VAT": "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  "Clearance Fee": "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400",
  Penalty: "bg-red-500/15 text-red-600 dark:text-red-400",
  "Storage Fee": "bg-amber-500/15 text-amber-600 dark:text-amber-400",
}

export function RecentTransactions() {
  const recent = customsTransactions.slice(0, 5)

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Customs Payments</CardTitle>
            <CardDescription>Latest duties, taxes and clearance fees</CardDescription>
          </div>
          <Link href="/transactions">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recent.map((tx, index) => {
              const Icon = typeIcons[tx.type]
              return (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-secondary/50"
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${typeColors[tx.type]}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {tx.type}{" "}
                        <span className="font-mono text-xs text-muted-foreground">{tx.declarationId}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {tx.payer} • {tx.timeAgo}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-foreground">{formatMAD(tx.amount)}</p>
                      {tx.txHash && (
                        <p className="font-mono text-xs text-muted-foreground">
                          {tx.txHash.slice(0, 10)}...
                        </p>
                      )}
                    </div>
                    <Badge
                      variant={tx.status === "Confirmed" ? "default" : "secondary"}
                      className={
                        tx.status === "Confirmed"
                          ? "bg-green-500/20 text-green-600 dark:text-green-400 hover:bg-green-500/30"
                          : tx.status === "Failed"
                            ? "bg-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-500/30"
                            : ""
                      }
                    >
                      {tx.status}
                    </Badge>
                    {tx.txHash && (
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="View on block explorer">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
