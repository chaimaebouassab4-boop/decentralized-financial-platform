"use client"

import { motion } from "framer-motion"
import { FileText, CheckCircle2, AlertCircle, Clock, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const contracts = [
  {
    name: "FinChainToken",
    address: "0x1234...5678",
    status: "deployed",
    network: "Ethereum",
    version: "v2.1.0",
    lastActivity: "2 hours ago",
  },
  {
    name: "StakingPool",
    address: "0x8765...4321",
    status: "deployed",
    network: "Ethereum",
    version: "v1.3.0",
    lastActivity: "5 hours ago",
  },
  {
    name: "Governance",
    address: "0xabcd...efgh",
    status: "pending",
    network: "Goerli",
    version: "v1.0.0",
    lastActivity: "Deploying...",
  },
  {
    name: "Treasury",
    address: "0xijkl...mnop",
    status: "error",
    network: "Ethereum",
    version: "v1.2.0",
    lastActivity: "Failed 1 hour ago",
  },
]

export function SmartContracts() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "deployed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500 animate-spin" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "deployed":
        return <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30">Deployed</Badge>
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30">Pending</Badge>
      case "error":
        return <Badge className="bg-red-500/20 text-red-500 hover:bg-red-500/30">Error</Badge>
      default:
        return null
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Smart Contracts</CardTitle>
            <CardDescription>Manage your deployed contracts</CardDescription>
          </div>
          <Button size="sm">Deploy New</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {contracts.map((contract, index) => (
              <motion.div
                key={contract.address}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-secondary/50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{contract.name}</p>
                      {getStatusIcon(contract.status)}
                    </div>
                    <p className="text-xs text-muted-foreground font-mono">{contract.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm">{contract.network}</p>
                    <p className="text-xs text-muted-foreground">{contract.lastActivity}</p>
                  </div>
                  {getStatusBadge(contract.status)}
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
