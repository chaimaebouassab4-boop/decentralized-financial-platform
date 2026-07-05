"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Blocks,
  Boxes,
  FileCode2,
  Link2,
  ShieldCheck,
  ShieldQuestion,
  Clock,
  Copy,
  Check,
  Wallet,
  ArrowRight,
  Hash,
  CheckCircle2,
  Layers,
} from "lucide-react"
import {
  blockchainRecords,
  customsContracts,
  traceabilitySteps,
  networkStats,
} from "@/data/blockchain"
import { shortenHash } from "@/data/declarations"

const stats = [
  { label: "Network", value: "Sepolia", note: networkStats.network, icon: Boxes },
  { label: "Block Height", value: networkStats.blockHeight.toLocaleString(), note: `Avg confirmation ${networkStats.avgConfirmationTime}`, icon: Layers },
  { label: "Records Anchored", value: networkStats.recordsAnchored.toLocaleString(), note: "Customs events on-chain", icon: Link2 },
  { label: "Active Contracts", value: networkStats.activeContracts.toString(), note: "Customs smart contracts", icon: FileCode2 },
]

export default function BlockchainPage() {
  const [copiedHash, setCopiedHash] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"records" | "contracts">("records")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedHash(text)
    setTimeout(() => setCopiedHash(null), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Blockchain Traceability</h1>
              <p className="mt-1 text-muted-foreground">
                Every customs event is anchored on-chain with an immutable hash, timestamp and block confirmation.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 w-fit">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                {networkStats.network} — Synced
              </span>
            </div>
          </div>
        </motion.div>

        {/* Network Stats */}
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="h-full">
                <CardContent className="p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <p className="mt-3 text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="truncate text-xs text-muted-foreground/70">{stat.note}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Traceability Flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-10"
        >
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Customs Clearance Flow</CardTitle>
              <CardDescription>
                The complete lifecycle of a declaration, secured step by step on the blockchain
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                {traceabilitySteps.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="relative"
                  >
                    {index < traceabilitySteps.length - 1 && (
                      <div className="absolute top-5 left-[calc(50%+1.75rem)] hidden w-[calc(100%-3.5rem)] lg:flex items-center">
                        <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-primary/10" />
                        <ArrowRight className="h-3.5 w-3.5 -ml-1 text-primary/50" />
                      </div>
                    )}
                    <div className="flex flex-col items-center text-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/10 text-sm font-bold text-primary">
                        {step.step}
                      </div>
                      <h3 className="mt-3 text-sm font-semibold text-foreground">{step.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-10"
        >
          <div className="mb-4 flex w-fit gap-1 rounded-xl border border-border bg-secondary/40 p-1">
            <button
              onClick={() => setActiveTab("records")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeTab === "records"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Blocks className="h-4 w-4" />
              On-chain Records
            </button>
            <button
              onClick={() => setActiveTab("contracts")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeTab === "contracts"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <FileCode2 className="h-4 w-4" />
              Smart Contracts
            </button>
          </div>

          {activeTab === "records" ? (
            <Card>
              <CardHeader>
                <CardTitle>Latest On-chain Customs Records</CardTitle>
                <CardDescription>
                  Smart contract executions with transaction hash, wallet, timestamp and confirmations
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border/60">
                  {blockchainRecords.map((record, index) => (
                    <motion.div
                      key={record.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-secondary/40 lg:flex-row lg:items-center lg:justify-between"
                    >
                      <div className="flex items-start gap-4 min-w-0">
                        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Blocks className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-medium">{record.action}</p>
                            <Badge variant="outline" className="font-mono text-[10px]">
                              {record.declarationId}
                            </Badge>
                            <Badge variant="outline" className="text-[10px] text-primary border-primary/30">
                              {record.contract}
                            </Badge>
                          </div>
                          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                            <Hash className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate font-mono">{shortenHash(record.txHash)}</span>
                            <button
                              onClick={() => copyToClipboard(record.txHash)}
                              className="text-muted-foreground/60 transition-colors hover:text-foreground"
                              title="Copy transaction hash"
                            >
                              {copiedHash === record.txHash ? (
                                <Check className="h-3 w-3 text-emerald-500" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </button>
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground/70">
                            <span className="flex items-center gap-1">
                              <Wallet className="h-3 w-3" />
                              <span className="font-mono">{record.walletAddress.slice(0, 10)}...</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <Layers className="h-3 w-3" />
                              Block #{record.blockNumber.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {record.timeAgo}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-shrink-0 items-center gap-3 pl-[3.75rem] lg:pl-0">
                        {record.verified ? (
                          <Badge className="gap-1 border border-emerald-500/30 bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/25 dark:text-emerald-400">
                            <ShieldCheck className="h-3 w-3" />
                            Verified • {record.confirmations.toLocaleString()} conf.
                          </Badge>
                        ) : (
                          <Badge className="gap-1 border border-amber-500/30 bg-amber-500/15 text-amber-600 hover:bg-amber-500/25 dark:text-amber-400">
                            <ShieldQuestion className="h-3 w-3" />
                            Awaiting confirmation
                          </Badge>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Customs Smart Contracts</CardTitle>
                <CardDescription>
                  Solidity contracts automating registration, notarization, payment and clearance
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border/60">
                  {customsContracts.map((contract, index) => (
                    <motion.div
                      key={contract.address}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-secondary/40 lg:flex-row lg:items-center lg:justify-between"
                    >
                      <div className="flex items-start gap-4 min-w-0">
                        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                          <FileCode2 className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-semibold">{contract.name}</p>
                            <Badge variant="outline" className="text-[10px]">
                              {contract.version}
                            </Badge>
                            {contract.status === "Active" ? (
                              <Badge className="gap-1 border border-emerald-500/30 bg-emerald-500/15 text-[10px] text-emerald-600 hover:bg-emerald-500/25 dark:text-emerald-400">
                                <CheckCircle2 className="h-3 w-3" />
                                Active
                              </Badge>
                            ) : (
                              <Badge className="gap-1 border border-amber-500/30 bg-amber-500/15 text-[10px] text-amber-600 hover:bg-amber-500/25 dark:text-amber-400">
                                <Clock className="h-3 w-3" />
                                Pending audit
                              </Badge>
                            )}
                          </div>
                          <p className="mt-0.5 text-sm text-muted-foreground">{contract.purpose}</p>
                          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground/70">
                            <span className="truncate font-mono">{contract.address}</span>
                            <button
                              onClick={() => copyToClipboard(contract.address)}
                              className="text-muted-foreground/60 transition-colors hover:text-foreground"
                              title="Copy contract address"
                            >
                              {copiedHash === contract.address ? (
                                <Check className="h-3 w-3 text-emerald-500" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-shrink-0 items-center gap-4 pl-[3.75rem] lg:pl-0">
                        <div className="text-right">
                          <p className="text-sm font-semibold">{contract.executions.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">executions</p>
                        </div>
                        <Button variant="outline" size="sm" className="gap-1.5">
                          View
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
