"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Blocks,
  FileCode2,
  Activity,
  Clock,
  Hash,
  Database,
  Cpu,
  Zap,
  TrendingUp,
  ArrowUpRight,
  Copy,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
  Wallet,
  Server,
  Shield,
  Globe,
} from "lucide-react"

interface Block {
  number: number
  hash: string
  timestamp: Date
  transactions: number
  gasUsed: number
  gasLimit: number
  miner: string
  size: number
}

interface SmartContract {
  address: string
  name: string
  type: string
  balance: string
  transactions: number
  verified: boolean
  createdAt: Date
}

function BlockchainContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [blocks, setBlocks] = useState<Block[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [copiedHash, setCopiedHash] = useState<string | null>(null)
  const [networkStats, setNetworkStats] = useState({
    blockHeight: 18542367,
    gasPrice: 32,
    tps: 15.4,
    pendingTx: 124532,
    difficulty: "12.4 PH",
    hashRate: "1.1 EH/s",
  })

  // Generate mock blocks
  useEffect(() => {
    const generateBlocks = () => {
      const newBlocks: Block[] = []
      for (let i = 0; i < 10; i++) {
        newBlocks.push({
          number: networkStats.blockHeight - i,
          hash: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 10)}`,
          timestamp: new Date(Date.now() - i * 12000),
          transactions: Math.floor(Math.random() * 200) + 50,
          gasUsed: Math.floor(Math.random() * 15000000) + 10000000,
          gasLimit: 30000000,
          miner: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
          size: Math.floor(Math.random() * 50000) + 30000,
        })
      }
      setBlocks(newBlocks)
    }
    generateBlocks()

    // Update blocks every 12 seconds
    const interval = setInterval(() => {
      setNetworkStats((prev) => ({
        ...prev,
        blockHeight: prev.blockHeight + 1,
        gasPrice: Math.max(20, prev.gasPrice + Math.floor(Math.random() * 10) - 5),
        tps: Math.max(10, prev.tps + (Math.random() * 2 - 1)),
        pendingTx: Math.max(100000, prev.pendingTx + Math.floor(Math.random() * 1000) - 500),
      }))
      generateBlocks()
    }, 12000)

    return () => clearInterval(interval)
  }, [])

  const smartContracts: SmartContract[] = [
    {
      address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      name: "Uniswap V2 Router",
      type: "DEX",
      balance: "0.0 ETH",
      transactions: 15420345,
      verified: true,
      createdAt: new Date("2020-05-05"),
    },
    {
      address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      name: "Wrapped Ether (WETH)",
      type: "Token",
      balance: "3,245,123 ETH",
      transactions: 89234567,
      verified: true,
      createdAt: new Date("2017-12-12"),
    },
    {
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      name: "USD Coin (USDC)",
      type: "Stablecoin",
      balance: "0.0 ETH",
      transactions: 45678901,
      verified: true,
      createdAt: new Date("2018-09-10"),
    },
    {
      address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
      name: "Uniswap Token (UNI)",
      type: "Governance",
      balance: "0.0 ETH",
      transactions: 12345678,
      verified: true,
      createdAt: new Date("2020-09-16"),
    },
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedHash(text)
    setTimeout(() => setCopiedHash(null), 2000)
  }

  const handleSearch = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
  }

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    return `${Math.floor(seconds / 3600)}h ago`
  }

  return (
    <main className="container mx-auto px-4 py-8 pt-24">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Blockchain Explorer</h1>
            <p className="mt-1 text-muted-foreground">Explore blocks, transactions, and smart contracts on Ethereum</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="gap-1 border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              Mainnet
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Activity className="h-3 w-3" />
              Block #{networkStats.blockHeight.toLocaleString()}
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by Address / Txn Hash / Block / Token"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch} disabled={isLoading}>
                {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : "Search"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Network Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Blocks className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Block Height</p>
                <p className="text-xl font-bold text-foreground">{networkStats.blockHeight.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                <Zap className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Gas Price</p>
                <p className="text-xl font-bold text-foreground">{networkStats.gasPrice} Gwei</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">TPS</p>
                <p className="text-xl font-bold text-foreground">{networkStats.tps.toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <Clock className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Txns</p>
                <p className="text-xl font-bold text-foreground">{networkStats.pendingTx.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content Tabs */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Tabs defaultValue="blocks" className="space-y-6">
          <TabsList className="bg-secondary/50">
            <TabsTrigger value="blocks" className="gap-2">
              <Blocks className="h-4 w-4" />
              Latest Blocks
            </TabsTrigger>
            <TabsTrigger value="contracts" className="gap-2">
              <FileCode2 className="h-4 w-4" />
              Smart Contracts
            </TabsTrigger>
            <TabsTrigger value="network" className="gap-2">
              <Globe className="h-4 w-4" />
              Network Info
            </TabsTrigger>
          </TabsList>

          {/* Blocks Tab */}
          <TabsContent value="blocks">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Latest Blocks</CardTitle>
                    <CardDescription>Most recently mined blocks on the network</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <RefreshCw className="h-4 w-4" />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {blocks.map((block, index) => (
                      <motion.div
                        key={block.number}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex flex-col gap-4 rounded-lg border border-border/50 bg-secondary/30 p-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                            <Blocks className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <Link href="#" className="font-mono font-semibold text-primary hover:underline">
                                #{block.number.toLocaleString()}
                              </Link>
                              <Badge variant="outline" className="text-xs">
                                {formatTimeAgo(block.timestamp)}
                              </Badge>
                            </div>
                            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                              <span className="font-mono">{block.hash}</span>
                              <button onClick={() => copyToClipboard(block.hash)} className="hover:text-foreground">
                                {copiedHash === block.hash ? (
                                  <CheckCircle2 className="h-3 w-3 text-green-500" />
                                ) : (
                                  <Copy className="h-3 w-3" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Hash className="h-4 w-4 text-muted-foreground" />
                            <span>{block.transactions} txns</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Zap className="h-4 w-4 text-muted-foreground" />
                            <span>{((block.gasUsed / block.gasLimit) * 100).toFixed(1)}% gas</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Database className="h-4 w-4 text-muted-foreground" />
                            <span>{(block.size / 1000).toFixed(1)} KB</span>
                          </div>
                          <Button variant="ghost" size="sm" className="gap-1">
                            View <ArrowUpRight className="h-3 w-3" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Smart Contracts Tab */}
          <TabsContent value="contracts">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Smart Contracts</CardTitle>
                    <CardDescription>Popular verified contracts on Ethereum</CardDescription>
                  </div>
                  <Button className="gap-2">
                    <FileCode2 className="h-4 w-4" />
                    Deploy Contract
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {smartContracts.map((contract, index) => (
                    <motion.div
                      key={contract.address}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="rounded-lg border border-border/50 bg-secondary/30 p-4"
                    >
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-teal-500">
                            <FileCode2 className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-foreground">{contract.name}</h3>
                              {contract.verified && (
                                <Badge className="gap-1 bg-green-500/10 text-green-600 dark:text-green-400">
                                  <CheckCircle2 className="h-3 w-3" />
                                  Verified
                                </Badge>
                              )}
                              <Badge variant="outline">{contract.type}</Badge>
                            </div>
                            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                              <span className="font-mono">{contract.address}</span>
                              <button
                                onClick={() => copyToClipboard(contract.address)}
                                className="hover:text-foreground"
                              >
                                {copiedHash === contract.address ? (
                                  <CheckCircle2 className="h-3 w-3 text-green-500" />
                                ) : (
                                  <Copy className="h-3 w-3" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <div className="text-center">
                            <p className="text-muted-foreground">Balance</p>
                            <p className="font-semibold text-foreground">{contract.balance}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-muted-foreground">Transactions</p>
                            <p className="font-semibold text-foreground">{contract.transactions.toLocaleString()}</p>
                          </div>
                          <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                            <ExternalLink className="h-3 w-3" />
                            Etherscan
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Network Info Tab */}
          <TabsContent value="network">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5" />
                    Network Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Network</span>
                    <Badge className="bg-green-500/10 text-green-600 dark:text-green-400">Ethereum Mainnet</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Chain ID</span>
                    <span className="font-mono font-semibold">1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Block Time</span>
                    <span className="font-semibold">~12 seconds</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Difficulty</span>
                    <span className="font-semibold">{networkStats.difficulty}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Hash Rate</span>
                    <span className="font-semibold">{networkStats.hashRate}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Network Security</span>
                      <span className="text-sm font-semibold text-green-500">Excellent</span>
                    </div>
                    <Progress value={98} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Decentralization</span>
                      <span className="text-sm font-semibold text-green-500">High</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Node Distribution</span>
                      <span className="text-sm font-semibold text-primary">Global</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  <div className="mt-4 rounded-lg bg-secondary/50 p-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Cpu className="h-4 w-4 text-primary" />
                      <span className="font-medium">Active Validators:</span>
                      <span className="text-muted-foreground">945,234</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/50 backdrop-blur-sm lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Button variant="outline" className="h-auto flex-col gap-2 py-6 bg-transparent">
                      <Wallet className="h-6 w-6 text-primary" />
                      <span>Connect Wallet</span>
                    </Button>
                    <Button variant="outline" className="h-auto flex-col gap-2 py-6 bg-transparent">
                      <FileCode2 className="h-6 w-6 text-primary" />
                      <span>Deploy Contract</span>
                    </Button>
                    <Button variant="outline" className="h-auto flex-col gap-2 py-6 bg-transparent">
                      <Activity className="h-6 w-6 text-primary" />
                      <span>Track Transaction</span>
                    </Button>
                    <Button variant="outline" className="h-auto flex-col gap-2 py-6 bg-transparent">
                      <Shield className="h-6 w-6 text-primary" />
                      <span>Verify Contract</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </main>
  )
}

export default function BlockchainPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Suspense fallback={null}>
        <BlockchainContent />
      </Suspense>
      <Footer />
    </div>
  )
}
