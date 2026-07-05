"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { FileCode2, CheckCircle2, Clock, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { customsContracts } from "@/data/blockchain"

export function SmartContracts() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Customs Smart Contracts</CardTitle>
            <CardDescription>Contracts automating the clearance chain</CardDescription>
          </div>
          <Link href="/blockchain">
            <Button variant="outline" size="sm">
              Blockchain Explorer
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {customsContracts.map((contract, index) => (
              <motion.div
                key={contract.address}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-secondary/50"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <FileCode2 className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{contract.name}</p>
                      {contract.status === "Active" ? (
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-500" />
                      ) : (
                        <Clock className="h-4 w-4 flex-shrink-0 text-yellow-500" />
                      )}
                    </div>
                    <p className="truncate text-xs text-muted-foreground">{contract.purpose}</p>
                    <p className="truncate font-mono text-xs text-muted-foreground/70">{contract.address}</p>
                  </div>
                </div>
                <div className="flex flex-shrink-0 items-center gap-3">
                  <div className="hidden text-right sm:block">
                    <p className="text-sm font-medium">{contract.executions.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">executions • {contract.version}</p>
                  </div>
                  <Badge
                    className={
                      contract.status === "Active"
                        ? "bg-green-500/20 text-green-600 dark:text-green-400 hover:bg-green-500/30"
                        : "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500/30"
                    }
                  >
                    {contract.status}
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8" title="View contract">
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
