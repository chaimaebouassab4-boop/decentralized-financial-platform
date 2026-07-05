"use client"

import { motion } from "framer-motion"
import { Blocks, Clock, Hash, ShieldCheck, ShieldQuestion } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { blockchainRecords } from "@/data/blockchain"

/**
 * Recent blockchain activity: latest customs events anchored on-chain.
 * (Kept as LiveBlocks for backward compatibility with existing imports.)
 */
export function LiveBlocks() {
  const records = blockchainRecords.slice(0, 4)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Blockchain Activity</CardTitle>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
        </div>
        <CardDescription>Latest customs events anchored on-chain</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {records.map((record, index) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className={`rounded-lg border p-3 transition-colors ${
                index === 0 ? "border-primary/50 bg-primary/5" : "border-border"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Blocks className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold">{record.action}</span>
                  {index === 0 && (
                    <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-[10px] font-medium text-green-600 dark:text-green-400">
                      NEW
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {record.timeAgo}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1 overflow-hidden">
                  <Hash className="h-3 w-3 flex-shrink-0 text-muted-foreground" />
                  <span className="truncate font-mono text-muted-foreground">
                    {record.txHash.slice(0, 14)}...
                  </span>
                </div>
                <div className="flex items-center justify-end gap-1">
                  {record.verified ? (
                    <>
                      <ShieldCheck className="h-3 w-3 text-emerald-500" />
                      <span className="font-medium text-emerald-600 dark:text-emerald-400">
                        {record.confirmations.toLocaleString()} confirmations
                      </span>
                    </>
                  ) : (
                    <>
                      <ShieldQuestion className="h-3 w-3 text-amber-500" />
                      <span className="font-medium text-amber-600 dark:text-amber-400">Awaiting confirmation</span>
                    </>
                  )}
                </div>
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">
                {record.declarationId} • Block #{record.blockNumber.toLocaleString()} • {record.contract}
              </p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
