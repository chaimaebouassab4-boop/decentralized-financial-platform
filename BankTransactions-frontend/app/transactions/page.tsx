"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Search,
  Landmark,
  Receipt,
  FileText,
  AlertCircle,
  Warehouse,
  CheckCircle2,
  Clock,
  XCircle,
  Copy,
  Check,
  ExternalLink,
  Link2,
  Percent,
} from "lucide-react"
import { customsTransactions, transactionStats, type CustomsTransaction, type PaymentType } from "@/data/transactions"
import { formatMAD, shortenHash } from "@/data/declarations"

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

const stats = [
  {
    label: "Duties Collected",
    value: `${(transactionStats.dutiesCollected / 1_000_000).toFixed(1)}M MAD`,
    note: "This year",
    icon: Landmark,
  },
  {
    label: "Import VAT Collected",
    value: `${(transactionStats.vatCollected / 1_000_000).toFixed(1)}M MAD`,
    note: "This year",
    icon: Receipt,
  },
  {
    label: "Pending Payments",
    value: transactionStats.pendingPayments.toString(),
    note: "Awaiting settlement",
    icon: Clock,
  },
  {
    label: "On-chain Settlement",
    value: `${transactionStats.onChainRate}%`,
    note: "Of confirmed payments",
    icon: Percent,
  },
]

function statusBadge(status: CustomsTransaction["status"]) {
  switch (status) {
    case "Confirmed":
      return (
        <Badge className="gap-1 bg-green-500/15 text-green-600 dark:text-green-400 hover:bg-green-500/25 border border-green-500/30">
          <CheckCircle2 className="h-3 w-3" />
          Confirmed
        </Badge>
      )
    case "Pending":
      return (
        <Badge className="gap-1 bg-amber-500/15 text-amber-600 dark:text-amber-400 hover:bg-amber-500/25 border border-amber-500/30">
          <Clock className="h-3 w-3" />
          Pending
        </Badge>
      )
    case "Failed":
      return (
        <Badge className="gap-1 bg-red-500/15 text-red-600 dark:text-red-400 hover:bg-red-500/25 border border-red-500/30">
          <XCircle className="h-3 w-3" />
          Failed
        </Badge>
      )
  }
}

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedTx, setSelectedTx] = useState<CustomsTransaction | null>(null)
  const [copied, setCopied] = useState(false)

  const filtered = customsTransactions.filter((tx) => {
    const q = searchQuery.toLowerCase()
    const matchesSearch =
      tx.id.toLowerCase().includes(q) ||
      tx.declarationId.toLowerCase().includes(q) ||
      tx.payer.toLowerCase().includes(q) ||
      (tx.txHash?.toLowerCase().includes(q) ?? false)
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter
    const matchesType = typeFilter === "all" || tx.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold tracking-tight">Trade Transactions</h1>
          <p className="mt-1 text-muted-foreground">
            Payments of duties, taxes and clearance fees — each confirmed payment carries an on-chain receipt.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <stat.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="mt-3 text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-xs text-muted-foreground/70">{stat.note}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <Card>
            <CardContent className="flex flex-col gap-3 p-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative flex-1 lg:max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by payment ID, declaration, payer, tx hash..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Confirmed">Confirmed</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[170px]">
                    <SelectValue placeholder="Payment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Payment Types</SelectItem>
                    <SelectItem value="Customs Duty">Customs Duty</SelectItem>
                    <SelectItem value="Import VAT">Import VAT</SelectItem>
                    <SelectItem value="Clearance Fee">Clearance Fee</SelectItem>
                    <SelectItem value="Penalty">Penalty</SelectItem>
                    <SelectItem value="Storage Fee">Storage Fee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Transactions List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <Card>
            <CardContent className="p-0">
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div>
                  <h2 className="font-semibold">Payment History</h2>
                  <p className="text-sm text-muted-foreground">{filtered.length} transactions</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                  Real-time
                </div>
              </div>

              <div className="divide-y divide-border/60">
                <AnimatePresence mode="popLayout">
                  {filtered.map((tx, index) => {
                    const Icon = typeIcons[tx.type]
                    return (
                      <motion.div
                        key={tx.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.03 }}
                        onClick={() => setSelectedTx(tx)}
                        className="group flex cursor-pointer flex-col gap-3 px-5 py-4 transition-colors hover:bg-secondary/40 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <div
                            className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${typeColors[tx.type]}`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="font-medium">{tx.type}</p>
                              <Badge variant="outline" className="font-mono text-[10px]">
                                {tx.declarationId}
                              </Badge>
                            </div>
                            <p className="truncate text-sm text-muted-foreground">{tx.payer}</p>
                            <p className="text-xs text-muted-foreground/70">
                              {tx.id} • {tx.timeAgo}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 sm:gap-6">
                          <div className="text-right">
                            <p className="font-semibold">{formatMAD(tx.amount)}</p>
                            {tx.txHash ? (
                              <p className="flex items-center justify-end gap-1 font-mono text-xs text-teal-600 dark:text-teal-400">
                                <Link2 className="h-3 w-3" />
                                {tx.txHash.slice(0, 10)}...
                              </p>
                            ) : (
                              <p className="text-xs text-muted-foreground/70">No on-chain record yet</p>
                            )}
                          </div>
                          {statusBadge(tx.status)}
                        </div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>

              {filtered.length === 0 && (
                <div className="py-16 text-center text-muted-foreground">No transactions match your filters.</div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </main>

      {/* Transaction Detail Dialog */}
      <Dialog open={!!selectedTx} onOpenChange={() => setSelectedTx(null)}>
        <DialogContent className="max-w-lg">
          {selectedTx && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${typeColors[selectedTx.type]}`}
                  >
                    {(() => {
                      const Icon = typeIcons[selectedTx.type]
                      return <Icon className="h-4 w-4" />
                    })()}
                  </div>
                  {selectedTx.type} — {selectedTx.id}
                </DialogTitle>
                <DialogDescription>
                  Customs payment linked to declaration {selectedTx.declarationId}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="rounded-xl bg-secondary/50 p-4 text-center">
                  <p className="text-3xl font-bold">{formatMAD(selectedTx.amount)}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{selectedTx.payer}</p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Status</span>
                    {statusBadge(selectedTx.status)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Declaration</span>
                    <span className="font-mono">{selectedTx.declarationId}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span>{new Date(selectedTx.timestamp).toLocaleString("en-GB")}</span>
                  </div>
                  {selectedTx.blockNumber && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Block</span>
                      <span className="font-mono">#{selectedTx.blockNumber.toLocaleString()}</span>
                    </div>
                  )}
                  {selectedTx.walletAddress && (
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-muted-foreground">Wallet</span>
                      <span className="truncate font-mono text-xs">{selectedTx.walletAddress}</span>
                    </div>
                  )}
                </div>

                {selectedTx.txHash ? (
                  <div className="space-y-2">
                    <span className="text-sm text-muted-foreground">Transaction Hash (on-chain receipt)</span>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 truncate rounded-lg bg-secondary px-3 py-2 font-mono text-xs">
                        {shortenHash(selectedTx.txHash)}
                      </code>
                      <Button variant="outline" size="icon" onClick={() => copyToClipboard(selectedTx.txHash!)}>
                        {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-3 text-sm text-amber-600 dark:text-amber-400">
                    This payment has not been anchored on the blockchain yet.
                  </div>
                )}
              </div>
              {selectedTx.txHash && (
                <DialogFooter>
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => window.open(`https://sepolia.etherscan.io/tx/${selectedTx.txHash}`, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4" />
                    View on Block Explorer
                  </Button>
                </DialogFooter>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
