"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, ArrowDownLeft, FileText, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const transactions = [
  {
    id: "1",
    type: "send",
    amount: "-0.5 ETH",
    usdValue: "$1,250.00",
    to: "0x8f3c...4d2a",
    status: "confirmed",
    time: "2 min ago",
    hash: "0xabc...def",
  },
  {
    id: "2",
    type: "receive",
    amount: "+1.2 ETH",
    usdValue: "$3,000.00",
    from: "0x1a2b...9c8d",
    status: "confirmed",
    time: "15 min ago",
    hash: "0x123...456",
  },
  {
    id: "3",
    type: "contract",
    amount: "-0.08 ETH",
    usdValue: "$200.00",
    to: "Uniswap V3",
    status: "pending",
    time: "32 min ago",
    hash: "0x789...012",
  },
  {
    id: "4",
    type: "send",
    amount: "-2.0 ETH",
    usdValue: "$5,000.00",
    to: "0x4e5f...6g7h",
    status: "confirmed",
    time: "1 hour ago",
    hash: "0xdef...abc",
  },
  {
    id: "5",
    type: "receive",
    amount: "+0.75 ETH",
    usdValue: "$1,875.00",
    from: "0x9i0j...1k2l",
    status: "confirmed",
    time: "2 hours ago",
    hash: "0x456...789",
  },
]

export function RecentTransactions() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest blockchain activity</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((tx, index) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-secondary/50"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      tx.type === "receive"
                        ? "bg-green-500/20 text-green-500"
                        : tx.type === "contract"
                          ? "bg-purple-500/20 text-purple-500"
                          : "bg-red-500/20 text-red-500"
                    }`}
                  >
                    {tx.type === "receive" ? (
                      <ArrowDownLeft className="h-5 w-5" />
                    ) : tx.type === "contract" ? (
                      <FileText className="h-5 w-5" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {tx.type === "receive" ? "Received from" : tx.type === "contract" ? "Contract" : "Sent to"}{" "}
                      <span className="font-mono text-muted-foreground">{tx.type === "receive" ? tx.from : tx.to}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{tx.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p
                      className={`text-sm font-semibold ${
                        tx.type === "receive" ? "text-green-500" : "text-foreground"
                      }`}
                    >
                      {tx.amount}
                    </p>
                    <p className="text-xs text-muted-foreground">{tx.usdValue}</p>
                  </div>
                  <Badge
                    variant={tx.status === "confirmed" ? "default" : "secondary"}
                    className={tx.status === "confirmed" ? "bg-green-500/20 text-green-500 hover:bg-green-500/30" : ""}
                  >
                    {tx.status}
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
