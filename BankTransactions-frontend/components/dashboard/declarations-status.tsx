"use client"

import { motion } from "framer-motion"
import { FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { declarationStatusSummary } from "@/data/declarations"

export function DeclarationsStatus() {
  const total = declarationStatusSummary.reduce((sum, item) => sum + item.count, 0)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <CardTitle>Declarations by Status</CardTitle>
        </div>
        <CardDescription>{total.toLocaleString()} declarations this year</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {declarationStatusSummary.map((item, index) => (
            <motion.div
              key={item.status}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-lg border border-border p-3 text-center"
            >
              <div className="mb-1 flex items-center justify-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-muted-foreground">{item.status}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{item.count.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{Math.round((item.count / total) * 100)}% of total</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 rounded-lg bg-secondary/50 p-3">
          <p className="text-center text-xs text-muted-foreground">
            On-chain rate:{" "}
            <span className="font-medium text-foreground">
              {Math.round(
                ((declarationStatusSummary.find((s) => s.status === "On-chain")?.count ?? 0) / total) * 100,
              )}
              %
            </span>
            {" • "}
            Rejection rate:{" "}
            <span className="font-medium text-foreground">
              {(((declarationStatusSummary.find((s) => s.status === "Rejected")?.count ?? 0) / total) * 100).toFixed(1)}
              %
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
