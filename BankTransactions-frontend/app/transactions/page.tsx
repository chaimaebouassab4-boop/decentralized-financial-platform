"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Premium Fintech Transaction Interface
// Aesthetic: Luxury dark mode with glass morphism, subtle gradients, and refined typography

const allTransactions = [
  {
    id: "tx_001",
    type: "send",
    amount: "-0.5 ETH",
    amountUsd: "$1,250.00",
    address: "0x8f3c9a2b1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a",
    addressLabel: "0x8f3c...7f8a",
    status: "confirmed",
    timestamp: "2024-01-15T10:30:00Z",
    timeAgo: "2 min ago",
    hash: "0xabc123def456789abc123def456789abc123def456789abc123def456789abcd",
    hashLabel: "0xabc1...abcd",
    gasUsed: "21,000",
    gasFee: "0.002 ETH",
    blockNumber: 18934521,
    network: "Ethereum",
    category: "Transfer",
  },
  {
    id: "tx_002",
    type: "receive",
    amount: "+1.2 ETH",
    amountUsd: "$3,000.00",
    address: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
    addressLabel: "0x1a2b...9a0b",
    status: "confirmed",
    timestamp: "2024-01-15T10:15:00Z",
    timeAgo: "15 min ago",
    hash: "0x123456789abcdef123456789abcdef123456789abcdef123456789abcdef1234",
    hashLabel: "0x1234...1234",
    gasUsed: "21,000",
    gasFee: "0.0018 ETH",
    blockNumber: 18934510,
    network: "Ethereum",
    category: "Deposit",
  },
  {
    id: "tx_003",
    type: "contract",
    amount: "-0.08 ETH",
    amountUsd: "$200.00",
    address: "Uniswap V3 Router",
    addressLabel: "Uniswap V3",
    status: "pending",
    timestamp: "2024-01-15T09:58:00Z",
    timeAgo: "32 min ago",
    hash: "0x789012345678901234567890123456789012345678901234567890123456789a",
    hashLabel: "0x7890...789a",
    gasUsed: "145,000",
    gasFee: "0.012 ETH",
    blockNumber: 18934498,
    network: "Ethereum",
    category: "DeFi",
  },
  {
    id: "tx_004",
    type: "receive",
    amount: "+2.5 ETH",
    amountUsd: "$6,250.00",
    address: "0x9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e",
    addressLabel: "0x9d8e...1d0e",
    status: "confirmed",
    timestamp: "2024-01-14T18:45:00Z",
    timeAgo: "16 hours ago",
    hash: "0xdef456789abc123def456789abc123def456789abc123def456789abc123def4",
    hashLabel: "0xdef4...ef4",
    gasUsed: "21,000",
    gasFee: "0.0015 ETH",
    blockNumber: 18933890,
    network: "Ethereum",
    category: "Deposit",
  },
  {
    id: "tx_005",
    type: "send",
    amount: "-0.25 ETH",
    amountUsd: "$625.00",
    address: "0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c",
    addressLabel: "0x2b3c...0b1c",
    status: "confirmed",
    timestamp: "2024-01-14T12:30:00Z",
    timeAgo: "22 hours ago",
    hash: "0x567890abcdef123456789abcdef123456789abcdef123456789abcdef123456",
    hashLabel: "0x5678...3456",
    gasUsed: "21,000",
    gasFee: "0.0022 ETH",
    blockNumber: 18933200,
    network: "Ethereum",
    category: "Transfer",
  },
]

const stats = [
  {
    label: "Total Sent",
    value: "$16,575",
    subValue: "6.63 ETH",
    change: "-12.5%",
    trend: "down",
    gradient: "from-rose-500 to-orange-500",
    bgGradient: "from-rose-500/10 to-orange-500/10",
  },
  {
    label: "Total Received",
    value: "$9,875",
    subValue: "3.95 ETH",
    change: "+8.3%",
    trend: "up",
    gradient: "from-emerald-400 to-cyan-500",
    bgGradient: "from-emerald-500/10 to-cyan-500/10",
  },
  {
    label: "Gas Spent",
    value: "$125.50",
    subValue: "0.0502 ETH",
    change: "-3.2%",
    trend: "down",
    gradient: "from-violet-500 to-purple-500",
    bgGradient: "from-violet-500/10 to-purple-500/10",
  },
  {
    label: "Net Flow",
    value: "-$6,700",
    subValue: "-2.68 ETH",
    change: "This Month",
    trend: "neutral",
    gradient: "from-blue-500 to-indigo-500",
    bgGradient: "from-blue-500/10 to-indigo-500/10",
  },
]

// Icons as inline SVGs for the artifact
const Icons = {
  ArrowUpRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7,7 17,7 17,17"/>
    </svg>
  ),
  ArrowDownLeft: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="17" y1="7" x2="7" y2="17"/><polyline points="17,17 7,17 7,7"/>
    </svg>
  ),
  FileText: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/>
    </svg>
  ),
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  Send: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9"/>
    </svg>
  ),
  Download: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  Copy: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  ),
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20,6 9,17 4,12"/>
    </svg>
  ),
  Clock: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
    </svg>
  ),
  ExternalLink: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  ),
  X: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Sparkles: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z"/>
    </svg>
  ),
  Zap: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/>
    </svg>
  ),
  Shield: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Wallet: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>
    </svg>
  ),
  TrendUp: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/><polyline points="17,6 23,6 23,12"/>
    </svg>
  ),
  TrendDown: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23,18 13.5,8.5 8.5,13.5 1,6"/><polyline points="17,18 23,18 23,12"/>
    </svg>
  ),
}

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedTx, setSelectedTx] = useState(null)
  const [sendDialogOpen, setSendDialogOpen] = useState(false)
  const [receiveDialogOpen, setReceiveDialogOpen] = useState(false)
  const [copiedAddress, setCopiedAddress] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredTransactions = allTransactions.filter((tx) => {
    const matchesSearch = tx.addressLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.hashLabel.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopiedAddress(true)
    setTimeout(() => setCopiedAddress(false), 2000)
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case "send": return <Icons.ArrowUpRight />
      case "receive": return <Icons.ArrowDownLeft />
      case "contract": return <Icons.FileText />
      default: return <Icons.ArrowUpRight />
    }
  }

  const getTypeColors = (type) => {
    switch (type) {
      case "send": return { bg: "bg-gradient-to-br from-rose-500/20 to-orange-500/20", text: "text-rose-400", border: "border-rose-500/30" }
      case "receive": return { bg: "bg-gradient-to-br from-emerald-500/20 to-cyan-500/20", text: "text-emerald-400", border: "border-emerald-500/30" }
      case "contract": return { bg: "bg-gradient-to-br from-violet-500/20 to-purple-500/20", text: "text-violet-400", border: "border-violet-500/30" }
      default: return { bg: "bg-white/5", text: "text-white", border: "border-white/10" }
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/3 rounded-full blur-[150px]" />
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : -20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 mb-4"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <Icons.Sparkles />
                </div>
                <span className="text-sm font-medium text-cyan-400 tracking-wider uppercase">Vault Dashboard</span>
              </motion.div>
              <h1 className="text-5xl lg:text-6xl font-light tracking-tight mb-3">
                <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                  Transactions
                </span>
              </h1>
              <p className="text-lg text-white/40 font-light">Track every movement across your portfolio</p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setReceiveDialogOpen(true)}
                className="group relative px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center gap-2"
              >
                <Icons.Download />
                <span className="font-medium">Receive</span>
              </button>
              
              <button
                onClick={() => setSendDialogOpen(true)}
                className="group relative px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-cyan-500/25"
              >
                <Icons.Send />
                <span className="font-medium">Send</span>
                <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          </div>
        </motion.header>

        {/* Stats Grid */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: mounted ? 1 : 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative p-6 rounded-3xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] backdrop-blur-xl transition-all duration-500">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-sm text-white/40 font-medium">{stat.label}</span>
                  <div className={`flex items-center gap-1 text-xs font-medium ${
                    stat.trend === 'up' ? 'text-emerald-400' : 
                    stat.trend === 'down' ? 'text-rose-400' : 
                    'text-white/40'
                  }`}>
                    {stat.trend === 'up' && <Icons.TrendUp />}
                    {stat.trend === 'down' && <Icons.TrendDown />}
                    {stat.change}
                  </div>
                </div>
                <div className={`text-3xl font-light bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>
                  {stat.value}
                </div>
                <div className="text-sm text-white/30 font-mono">{stat.subValue}</div>
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* Search & Filters */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-8"
        >
          <div className="p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl">
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="relative flex-1">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                  <Icons.Search />
                </div>
                <input
                  type="text"
                  placeholder="Search by address, hash, or amount..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder:text-white/30 focus:outline-none text-sm"
                />
              </div>
              <div className="flex gap-2 px-2">
                {['all', 'confirmed', 'pending', 'failed'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-5 py-3 rounded-xl text-sm font-medium capitalize transition-all duration-300 ${
                      statusFilter === status 
                        ? 'bg-white/10 text-white' 
                        : 'text-white/40 hover:text-white/60 hover:bg-white/5'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Transactions List */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: mounted ? 1 : 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl overflow-hidden">
            {/* List Header */}
            <div className="px-6 py-5 border-b border-white/[0.06] flex items-center justify-between">
              <div>
                <h2 className="text-xl font-medium text-white">Recent Activity</h2>
                <p className="text-sm text-white/40 mt-1">{filteredTransactions.length} transactions</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/40">
                <Icons.Clock />
                <span>Real-time</span>
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              </div>
            </div>

            {/* Transactions */}
            <div className="divide-y divide-white/[0.04]">
              <AnimatePresence mode="popLayout">
                {filteredTransactions.map((tx, index) => {
                  const colors = getTypeColors(tx.type)
                  return (
                    <motion.div
                      key={tx.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                      onClick={() => setSelectedTx(tx)}
                      className="group px-6 py-5 hover:bg-white/[0.02] cursor-pointer transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-5">
                          {/* Icon */}
                          <div className={`w-14 h-14 rounded-2xl ${colors.bg} ${colors.text} flex items-center justify-center border ${colors.border} transition-transform duration-300 group-hover:scale-105`}>
                            {getTypeIcon(tx.type)}
                          </div>
                          
                          {/* Details */}
                          <div>
                            <div className="flex items-center gap-3 mb-1.5">
                              <span className="font-medium text-white">
                                {tx.type === "receive" ? "Received from" :
                                 tx.type === "contract" ? "Contract Interaction" :
                                 "Sent to"}
                              </span>
                              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text} border ${colors.border}`}>
                                {tx.category}
                              </span>
                            </div>
                            <div className="font-mono text-sm text-white/40">{tx.addressLabel}</div>
                            <div className="text-xs text-white/25 mt-1 flex items-center gap-2">
                              <Icons.Clock />
                              {tx.timeAgo}
                            </div>
                          </div>
                        </div>
                        
                        {/* Amount & Status */}
                        <div className="flex items-center gap-8">
                          <div className="text-right">
                            <div className={`text-xl font-light ${tx.type === "receive" ? "text-emerald-400" : "text-white"}`}>
                              {tx.amount}
                            </div>
                            <div className="text-sm text-white/30">{tx.amountUsd}</div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                              tx.status === "confirmed" 
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                                : tx.status === "pending"
                                ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                            }`}>
                              {tx.status === "pending" && (
                                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
                              )}
                              {tx.status === "confirmed" && <Icons.Check />}
                              <span className="capitalize">{tx.status}</span>
                            </div>
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                window.open(`https://etherscan.io/tx/${tx.hash}`, "_blank")
                              }}
                              className="p-2 rounded-xl text-white/20 hover:text-white/60 hover:bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-300"
                            >
                              <Icons.ExternalLink />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>

            {/* Empty State */}
            {filteredTransactions.length === 0 && (
              <div className="px-6 py-16 text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <Icons.Search />
                </div>
                <p className="text-white/40">No transactions found</p>
                <p className="text-sm text-white/20 mt-1">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </motion.section>
      </main>

      {/* Transaction Detail Modal */}
      <AnimatePresence>
        {selectedTx && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedTx(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg rounded-3xl bg-[#12121a] border border-white/10 overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-white/[0.06]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl ${getTypeColors(selectedTx.type).bg} ${getTypeColors(selectedTx.type).text} flex items-center justify-center border ${getTypeColors(selectedTx.type).border}`}>
                      {getTypeIcon(selectedTx.type)}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Transaction Details</h3>
                      <p className="text-sm text-white/40">{selectedTx.network}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedTx(null)}
                    className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Icons.X />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Amount Display */}
                <div className="text-center py-4">
                  <div className={`text-4xl font-light ${selectedTx.type === "receive" ? "text-emerald-400" : "text-white"}`}>
                    {selectedTx.amount}
                  </div>
                  <div className="text-lg text-white/40 mt-1">{selectedTx.amountUsd}</div>
                </div>

                {/* Details Grid */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
                    <span className="text-white/40">Status</span>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                      selectedTx.status === "confirmed" 
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}>
                      {selectedTx.status === "confirmed" && <Icons.Check />}
                      <span className="capitalize">{selectedTx.status}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
                    <span className="text-white/40">Block</span>
                    <span className="font-mono text-white">#{selectedTx.blockNumber.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
                    <span className="text-white/40">Gas Fee</span>
                    <span className="font-mono text-white">{selectedTx.gasFee}</span>
                  </div>

                  {/* Transaction Hash */}
                  <div className="pt-2">
                    <span className="text-sm text-white/40 block mb-2">Transaction Hash</span>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 px-4 py-3 rounded-xl bg-white/5 font-mono text-sm text-white/60 truncate">
                        {selectedTx.hash}
                      </code>
                      <button
                        onClick={() => copyToClipboard(selectedTx.hash)}
                        className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                      >
                        {copiedAddress ? <Icons.Check /> : <Icons.Copy />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <button
                  onClick={() => window.open(`https://etherscan.io/tx/${selectedTx.hash}`, "_blank")}
                  className="w-full py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-medium flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <Icons.ExternalLink />
                  View on Etherscan
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Send Modal */}
      <AnimatePresence>
        {sendDialogOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSendDialogOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg rounded-3xl bg-[#12121a] border border-white/10 overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-white/[0.06]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
                      <Icons.Send />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Send Funds</h3>
                      <p className="text-sm text-white/40">Transfer to another wallet</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSendDialogOpen(false)}
                    className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Icons.X />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <label className="text-sm text-white/60 block mb-2">Recipient Address</label>
                  <input
                    type="text"
                    placeholder="0x..."
                    className="w-full px-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-cyan-500/50 text-white placeholder:text-white/30 font-mono text-sm focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-sm text-white/60 block mb-2">Amount</label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full px-4 py-4 pr-20 rounded-2xl bg-white/5 border border-white/10 focus:border-cyan-500/50 text-white placeholder:text-white/30 text-lg focus:outline-none transition-colors"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 font-medium">ETH</span>
                  </div>
                  <p className="text-xs text-white/30 mt-2">Available: 12.5 ETH (~$31,250.00)</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40 flex items-center gap-2">
                      <Icons.Zap />
                      Network Fee
                    </span>
                    <span className="text-white/60">~0.002 ETH ($5.00)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40 flex items-center gap-2">
                      <Icons.Clock />
                      Est. Time
                    </span>
                    <span className="text-white/60">~15 seconds</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setSendDialogOpen(false)}
                    className="flex-1 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all duration-300">
                    <Icons.Wallet />
                    Connect Wallet
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Receive Modal */}
      <AnimatePresence>
        {receiveDialogOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setReceiveDialogOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg rounded-3xl bg-[#12121a] border border-white/10 overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-white/[0.06]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                      <Icons.Download />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Receive Funds</h3>
                      <p className="text-sm text-white/40">Share your wallet address</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setReceiveDialogOpen(false)}
                    className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Icons.X />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* QR Code Placeholder */}
                <div className="flex justify-center">
                  <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-violet-500/10 flex items-center justify-center border border-white/10">
                      <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-2 bg-white rounded-xl flex items-center justify-center">
                          <svg viewBox="0 0 100 100" className="w-24 h-24">
                            <rect x="10" y="10" width="20" height="20" fill="#0a0a0f"/>
                            <rect x="35" y="10" width="10" height="10" fill="#0a0a0f"/>
                            <rect x="70" y="10" width="20" height="20" fill="#0a0a0f"/>
                            <rect x="10" y="35" width="10" height="10" fill="#0a0a0f"/>
                            <rect x="45" y="35" width="10" height="10" fill="#0a0a0f"/>
                            <rect x="10" y="70" width="20" height="20" fill="#0a0a0f"/>
                            <rect x="35" y="55" width="10" height="10" fill="#0a0a0f"/>
                            <rect x="55" y="45" width="10" height="10" fill="#0a0a0f"/>
                            <rect x="70" y="55" width="10" height="10" fill="#0a0a0f"/>
                            <rect x="55" y="70" width="10" height="10" fill="#0a0a0f"/>
                            <rect x="80" y="70" width="10" height="20" fill="#0a0a0f"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="text-sm text-white/60 block mb-2">Your Ethereum Address</label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 px-4 py-4 rounded-2xl bg-white/5 border border-white/10 font-mono text-sm text-white/60 truncate">
                      0x742d35Cc6634C0532925a3b844Bc9e7595f2bD78
                    </code>
                    <button
                      onClick={() => copyToClipboard("0x742d35Cc6634C0532925a3b844Bc9e7595f2bD78")}
                      className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/40 hover:text-white transition-all duration-300"
                    >
                      {copiedAddress ? <Icons.Check /> : <Icons.Copy />}
                    </button>
                  </div>
                </div>

                {/* Warning */}
                <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex gap-3">
                  <Icons.Shield />
                  <p className="text-sm text-amber-400/80">
                    Only send Ethereum (ETH) and ERC-20 tokens to this address. Sending other assets may result in permanent loss.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        code, .font-mono {
          font-family: 'JetBrains Mono', monospace;
        }
        
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        input[type=number] {
          -moz-appearance: textfield;
        }
        
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  )
}