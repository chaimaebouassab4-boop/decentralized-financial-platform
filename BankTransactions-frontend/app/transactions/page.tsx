"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  ArrowUpRight,
  ArrowDownLeft,
  FileText,
  ExternalLink,
  Search,
  Send,
  Download,
  Copy,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowLeftRight,
  Wallet,
  TrendingUp,
  TrendingDown,
  RefreshCw,
} from "lucide-react"

// Transaction data
const allTransactions = [
  {
    id: "tx_001",
    type: "send" as const,
    amount: "-0.5 ETH",
    amountUsd: "$1,250.00",
    address: "0x8f3c9a2b1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a",
    addressLabel: "0x8f3c...7f8a",
    status: "confirmed" as const,
    timestamp: "2024-01-15T10:30:00Z",
    timeAgo: "2 min ago",
    hash: "0xabc123def456789abc123def456789abc123def456789abc123def456789abcd",
    hashLabel: "0xabc1...abcd",
    gasUsed: "21,000",
    gasFee: "0.002 ETH",
    blockNumber: 18934521,
    network: "Ethereum",
    category: "blockchain",
  },
  {
    id: "tx_002",
    type: "receive" as const,
    amount: "+1.2 ETH",
    amountUsd: "$3,000.00",
    address: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
    addressLabel: "0x1a2b...9a0b",
    status: "confirmed" as const,
    timestamp: "2024-01-15T10:15:00Z",
    timeAgo: "15 min ago",
    hash: "0x123456789abcdef123456789abcdef123456789abcdef123456789abcdef1234",
    hashLabel: "0x1234...1234",
    gasUsed: "21,000",
    gasFee: "0.0018 ETH",
    blockNumber: 18934510,
    network: "Ethereum",
    category: "blockchain",
  },
  {
    id: "tx_003",
    type: "contract" as const,
    amount: "-0.08 ETH",
    amountUsd: "$200.00",
    address: "Uniswap V3 Router",
    addressLabel: "Uniswap V3",
    status: "pending" as const,
    timestamp: "2024-01-15T09:58:00Z",
    timeAgo: "32 min ago",
    hash: "0x789012345678901234567890123456789012345678901234567890123456789a",
    hashLabel: "0x7890...789a",
    gasUsed: "145,000",
    gasFee: "0.012 ETH",
    blockNumber: 18934498,
    network: "Ethereum",
    category: "defi",
  },
  {
    id: "tx_004",
    type: "send" as const,
    amount: "-2.0 ETH",
    amountUsd: "$5,000.00",
    address: "0x4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f",
    addressLabel: "0x4e5f...2e3f",
    status: "confirmed" as const,
    timestamp: "2024-01-15T09:30:00Z",
    timeAgo: "1 hour ago",
    hash: "0xdef456789abcdef456789abcdef456789abcdef456789abcdef456789abcdef4",
    hashLabel: "0xdef4...def4",
    gasUsed: "21,000",
    gasFee: "0.0022 ETH",
    blockNumber: 18934480,
    network: "Ethereum",
    category: "blockchain",
  },
  {
    id: "tx_005",
    type: "receive" as const,
    amount: "+0.75 ETH",
    amountUsd: "$1,875.00",
    address: "0x9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b",
    addressLabel: "0x9i0j...7a8b",
    status: "confirmed" as const,
    timestamp: "2024-01-15T08:30:00Z",
    timeAgo: "2 hours ago",
    hash: "0x456789abcdef456789abcdef456789abcdef456789abcdef456789abcdef4567",
    hashLabel: "0x4567...4567",
    gasUsed: "21,000",
    gasFee: "0.0019 ETH",
    blockNumber: 18934420,
    network: "Ethereum",
    category: "blockchain",
  },
  {
    id: "tx_006",
    type: "contract" as const,
    amount: "-500 USDC",
    amountUsd: "$500.00",
    address: "Aave V3 Lending Pool",
    addressLabel: "Aave V3",
    status: "confirmed" as const,
    timestamp: "2024-01-15T07:45:00Z",
    timeAgo: "3 hours ago",
    hash: "0xaaa111bbb222ccc333ddd444eee555fff666777888999000aaabbbcccdddeeef",
    hashLabel: "0xaaa1...eeef",
    gasUsed: "180,000",
    gasFee: "0.015 ETH",
    blockNumber: 18934380,
    network: "Ethereum",
    category: "defi",
  },
  {
    id: "tx_007",
    type: "send" as const,
    amount: "-1,000 USDT",
    amountUsd: "$1,000.00",
    address: "0xbank123456789abcdef123456789abcdef12345678",
    addressLabel: "Bank Transfer",
    status: "confirmed" as const,
    timestamp: "2024-01-14T18:00:00Z",
    timeAgo: "1 day ago",
    hash: "0xfiat123456789abcdef123456789abcdef123456789abcdef123456789abcdef",
    hashLabel: "0xfiat...cdef",
    gasUsed: "65,000",
    gasFee: "0.005 ETH",
    blockNumber: 18933200,
    network: "Ethereum",
    category: "traditional",
  },
  {
    id: "tx_008",
    type: "receive" as const,
    amount: "+5,000 USDC",
    amountUsd: "$5,000.00",
    address: "Wire Transfer - Chase Bank",
    addressLabel: "Chase Bank",
    status: "confirmed" as const,
    timestamp: "2024-01-14T14:30:00Z",
    timeAgo: "1 day ago",
    hash: "0xwire987654321fedcba987654321fedcba987654321fedcba987654321fedcba",
    hashLabel: "0xwire...dcba",
    gasUsed: "0",
    gasFee: "$25.00",
    blockNumber: 0,
    network: "Traditional",
    category: "traditional",
  },
  {
    id: "tx_009",
    type: "contract" as const,
    amount: "-0.15 ETH",
    amountUsd: "$375.00",
    address: "OpenSea NFT Marketplace",
    addressLabel: "OpenSea",
    status: "failed" as const,
    timestamp: "2024-01-14T12:00:00Z",
    timeAgo: "1 day ago",
    hash: "0xnft555666777888999aaabbbcccdddeeefff000111222333444555666777888999",
    hashLabel: "0xnft5...8999",
    gasUsed: "0",
    gasFee: "0.003 ETH",
    blockNumber: 18932800,
    network: "Ethereum",
    category: "nft",
  },
  {
    id: "tx_010",
    type: "send" as const,
    amount: "-3.5 ETH",
    amountUsd: "$8,750.00",
    address: "0xexchange123456789abcdef123456789abcdef1234",
    addressLabel: "Coinbase",
    status: "confirmed" as const,
    timestamp: "2024-01-13T20:00:00Z",
    timeAgo: "2 days ago",
    hash: "0xexch123456789abcdef123456789abcdef123456789abcdef123456789abcdef",
    hashLabel: "0xexch...cdef",
    gasUsed: "21,000",
    gasFee: "0.002 ETH",
    blockNumber: 18931500,
    network: "Ethereum",
    category: "exchange",
  },
]

// Stats data
const stats = [
  {
    label: "Total Sent",
    value: "$16,575.00",
    change: "-12.5%",
    trend: "down",
    icon: ArrowUpRight,
  },
  {
    label: "Total Received",
    value: "$9,875.00",
    change: "+8.3%",
    trend: "up",
    icon: ArrowDownLeft,
  },
  {
    label: "Pending",
    value: "1",
    change: "~$200",
    trend: "neutral",
    icon: Clock,
  },
  {
    label: "This Month",
    value: "10",
    change: "+3 from last month",
    trend: "up",
    icon: ArrowLeftRight,
  },
]

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedTx, setSelectedTx] = useState<(typeof allTransactions)[0] | null>(null)
  const [sendDialogOpen, setSendDialogOpen] = useState(false)
  const [receiveDialogOpen, setReceiveDialogOpen] = useState(false)
  const [copiedAddress, setCopiedAddress] = useState(false)

  // Filter transactions
  const filteredTransactions = allTransactions.filter((tx) => {
    const matchesSearch =
      tx.addressLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.hashLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.amount.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter
    const matchesType = typeFilter === "all" || tx.type === typeFilter
    const matchesCategory = categoryFilter === "all" || tx.category === categoryFilter
    return matchesSearch && matchesStatus && matchesType && matchesCategory
  })

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedAddress(true)
    setTimeout(() => setCopiedAddress(false), 2000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "send":
        return <ArrowUpRight className="h-5 w-5" />
      case "receive":
        return <ArrowDownLeft className="h-5 w-5" />
      case "contract":
        return <FileText className="h-5 w-5" />
      default:
        return <ArrowLeftRight className="h-5 w-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "send":
        return "bg-red-500/20 text-red-500"
      case "receive":
        return "bg-green-500/20 text-green-500"
      case "contract":
        return "bg-purple-500/20 text-purple-500"
      default:
        return "bg-blue-500/20 text-blue-500"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Transactions</h1>
              <p className="text-muted-foreground">Manage and track all your financial activity</p>
            </div>
            <div className="flex gap-3">
              {/* Receive Dialog */}
              <Dialog open={receiveDialogOpen} onOpenChange={setReceiveDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Download className="h-4 w-4" />
                    Receive
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Receive Funds</DialogTitle>
                    <DialogDescription>Share your wallet address to receive cryptocurrency</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="flex items-center justify-center">
                      <div className="rounded-xl bg-white p-4">
                        <div className="h-40 w-40 bg-[url('/qr-code-ethereum-wallet.jpg')] bg-cover bg-center" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Your Ethereum Address</Label>
                      <div className="flex gap-2">
                        <Input
                          readOnly
                          value="0x742d35Cc6634C0532925a3b844Bc9e7595f2bD78"
                          className="font-mono text-sm"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => copyToClipboard("0x742d35Cc6634C0532925a3b844Bc9e7595f2bD78")}
                        >
                          {copiedAddress ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-3">
                      <p className="text-sm text-yellow-600 dark:text-yellow-400">
                        Only send Ethereum (ETH) and ERC-20 tokens to this address. Sending other assets may result in
                        permanent loss.
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Send Dialog */}
              <Dialog open={sendDialogOpen} onOpenChange={setSendDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-primary hover:bg-primary/90">
                    <Send className="h-4 w-4" />
                    Send
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Send Funds</DialogTitle>
                    <DialogDescription>Transfer cryptocurrency to another wallet</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Recipient Address</Label>
                      <Input placeholder="0x..." className="font-mono" />
                    </div>
                    <div className="space-y-2">
                      <Label>Asset</Label>
                      <Select defaultValue="eth">
                        <SelectTrigger>
                          <SelectValue placeholder="Select asset" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                          <SelectItem value="usdc">USD Coin (USDC)</SelectItem>
                          <SelectItem value="usdt">Tether (USDT)</SelectItem>
                          <SelectItem value="dai">Dai (DAI)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Amount</Label>
                      <div className="relative">
                        <Input type="number" placeholder="0.00" className="pr-16" />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                          ETH
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Available: 12.5 ETH (~$31,250.00)</p>
                    </div>
                    <div className="rounded-lg border border-border bg-secondary/50 p-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Network Fee</span>
                        <span>~0.002 ETH ($5.00)</span>
                      </div>
                      <div className="mt-1 flex justify-between text-sm">
                        <span className="text-muted-foreground">Estimated Time</span>
                        <span>~15 seconds</span>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setSendDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button className="gap-2">
                      <Wallet className="h-4 w-4" />
                      Connect Wallet to Send
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        stat.trend === "up"
                          ? "bg-green-500/20 text-green-500"
                          : stat.trend === "down"
                            ? "bg-red-500/20 text-red-500"
                            : "bg-yellow-500/20 text-yellow-500"
                      }`}
                    >
                      <stat.icon className="h-5 w-5" />
                    </div>
                    <div
                      className={`flex items-center gap-1 text-xs ${
                        stat.trend === "up"
                          ? "text-green-500"
                          : stat.trend === "down"
                            ? "text-red-500"
                            : "text-muted-foreground"
                      }`}
                    >
                      {stat.trend === "up" && <TrendingUp className="h-3 w-3" />}
                      {stat.trend === "down" && <TrendingDown className="h-3 w-3" />}
                      {stat.change}
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="relative flex-1 lg:max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by address, hash, or amount..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex flex-wrap gap-3">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="send">Sent</SelectItem>
                      <SelectItem value="receive">Received</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="blockchain">Blockchain</SelectItem>
                      <SelectItem value="traditional">Traditional</SelectItem>
                      <SelectItem value="defi">DeFi</SelectItem>
                      <SelectItem value="nft">NFT</SelectItem>
                      <SelectItem value="exchange">Exchange</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Transactions List */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>{filteredTransactions.length} transactions found</CardDescription>
                </div>
                <Tabs defaultValue="all" className="w-auto">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="crypto">Crypto</TabsTrigger>
                    <TabsTrigger value="fiat">Fiat</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <AnimatePresence>
                  {filteredTransactions.map((tx, index) => (
                    <motion.div
                      key={tx.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.03 }}
                      onClick={() => setSelectedTx(tx)}
                      className="group flex cursor-pointer items-center justify-between rounded-lg border border-border p-4 transition-all hover:border-primary/50 hover:bg-secondary/50"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-full ${getTypeColor(tx.type)}`}
                        >
                          {getTypeIcon(tx.type)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">
                              {tx.type === "receive"
                                ? "Received from"
                                : tx.type === "contract"
                                  ? "Smart Contract"
                                  : "Sent to"}
                            </p>
                            <Badge variant="outline" className="text-xs">
                              {tx.category}
                            </Badge>
                          </div>
                          <p className="font-mono text-sm text-muted-foreground">{tx.addressLabel}</p>
                          <p className="text-xs text-muted-foreground">{tx.timeAgo}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p
                            className={`font-semibold ${tx.type === "receive" ? "text-green-500" : "text-foreground"}`}
                          >
                            {tx.amount}
                          </p>
                          <p className="text-sm text-muted-foreground">{tx.amountUsd}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(tx.status)}
                          <Badge
                            variant={
                              tx.status === "confirmed"
                                ? "default"
                                : tx.status === "pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className={
                              tx.status === "confirmed"
                                ? "bg-green-500/20 text-green-600 dark:text-green-400 hover:bg-green-500/30"
                                : ""
                            }
                          >
                            {tx.status}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 transition-opacity group-hover:opacity-100"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(`https://etherscan.io/tx/${tx.hash}`, "_blank")
                          }}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {filteredTransactions.length === 0 && (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground">No transactions found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Transaction Detail Dialog */}
        <Dialog open={!!selectedTx} onOpenChange={() => setSelectedTx(null)}>
          <DialogContent className="max-w-lg">
            {selectedTx && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${getTypeColor(selectedTx.type)}`}
                    >
                      {getTypeIcon(selectedTx.type)}
                    </div>
                    Transaction Details
                  </DialogTitle>
                  <DialogDescription>
                    {selectedTx.type === "receive"
                      ? "Incoming"
                      : selectedTx.type === "contract"
                        ? "Contract Interaction"
                        : "Outgoing"}{" "}
                    transaction
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Amount</span>
                    <span className={`text-xl font-bold ${selectedTx.type === "receive" ? "text-green-500" : ""}`}>
                      {selectedTx.amount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">USD Value</span>
                    <span>{selectedTx.amountUsd}</span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Status</span>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(selectedTx.status)}
                        <Badge
                          variant={
                            selectedTx.status === "confirmed"
                              ? "default"
                              : selectedTx.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                          className={
                            selectedTx.status === "confirmed"
                              ? "bg-green-500/20 text-green-600 dark:text-green-400"
                              : ""
                          }
                        >
                          {selectedTx.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Network</span>
                      <span>{selectedTx.network}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Block</span>
                      <span className="font-mono">#{selectedTx.blockNumber.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Gas Used</span>
                      <span>{selectedTx.gasUsed}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Gas Fee</span>
                      <span>{selectedTx.gasFee}</span>
                    </div>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="space-y-2">
                    <span className="text-sm text-muted-foreground">Transaction Hash</span>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 rounded bg-secondary px-3 py-2 font-mono text-xs">
                        {selectedTx.hashLabel}
                      </code>
                      <Button variant="outline" size="icon" onClick={() => copyToClipboard(selectedTx.hash)}>
                        {copiedAddress ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm text-muted-foreground">
                      {selectedTx.type === "receive" ? "From Address" : "To Address"}
                    </span>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 rounded bg-secondary px-3 py-2 font-mono text-xs">
                        {selectedTx.addressLabel}
                      </code>
                      <Button variant="outline" size="icon" onClick={() => copyToClipboard(selectedTx.address)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    className="gap-2 bg-transparent"
                    onClick={() => window.open(`https://etherscan.io/tx/${selectedTx.hash}`, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4" />
                    View on Etherscan
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  )
}
