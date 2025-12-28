"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Premium Blockchain Explorer Interface
// Aesthetic: Cyberpunk-inspired dark theme with neon accents and glass morphism

const generateBlocks = (startHeight) => {
  const blocks = []
  for (let i = 0; i < 8; i++) {
    blocks.push({
      number: startHeight - i,
      hash: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 10)}`,
      fullHash: `0x${Array(64).fill(0).map(() => Math.random().toString(16)[2]).join('')}`,
      timestamp: new Date(Date.now() - i * 12000),
      transactions: Math.floor(Math.random() * 200) + 50,
      gasUsed: Math.floor(Math.random() * 15000000) + 10000000,
      gasLimit: 30000000,
      miner: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
      size: Math.floor(Math.random() * 50000) + 30000,
      reward: (2 + Math.random() * 0.5).toFixed(4),
    })
  }
  return blocks
}

const smartContracts = [
  {
    address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    name: "Uniswap V2 Router",
    type: "DEX",
    balance: "0.0 ETH",
    transactions: 15420345,
    verified: true,
    logo: "🦄",
  },
  {
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    name: "Wrapped Ether",
    type: "Token",
    balance: "3,245,123 ETH",
    transactions: 89234567,
    verified: true,
    logo: "Ξ",
  },
  {
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    name: "USD Coin",
    type: "Stablecoin",
    balance: "0.0 ETH",
    transactions: 45678901,
    verified: true,
    logo: "$",
  },
  {
    address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    name: "Uniswap Token",
    type: "Governance",
    balance: "0.0 ETH",
    transactions: 12345678,
    verified: true,
    logo: "🗳",
  },
]

// Icons
const Icons = {
  Blocks: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="7" height="7" rx="1"/><rect x="15" y="2" width="7" height="7" rx="1"/><rect x="2" y="15" width="7" height="7" rx="1"/><rect x="15" y="15" width="7" height="7" rx="1"/>
    </svg>
  ),
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  Zap: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/>
    </svg>
  ),
  Activity: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
    </svg>
  ),
  Clock: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
    </svg>
  ),
  Hash: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>
    </svg>
  ),
  Database: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  ),
  Copy: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  ),
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20,6 9,17 4,12"/>
    </svg>
  ),
  ExternalLink: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  ),
  Server: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
    </svg>
  ),
  Shield: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Globe: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  Code: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/>
    </svg>
  ),
  Wallet: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>
    </svg>
  ),
  Cpu: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
    </svg>
  ),
  TrendUp: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/><polyline points="17,6 23,6 23,12"/>
    </svg>
  ),
  Cube: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27,6.96 12,12.01 20.73,6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  ),
}

export default function BlockchainExplorer() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("blocks")
  const [blocks, setBlocks] = useState([])
  const [copiedHash, setCopiedHash] = useState(null)
  const [mounted, setMounted] = useState(false)
  const [networkStats, setNetworkStats] = useState({
    blockHeight: 18542367,
    gasPrice: 32,
    tps: 15.4,
    pendingTx: 124532,
    difficulty: "12.4 PH",
    hashRate: "1.1 EH/s",
  })

  useEffect(() => {
    setMounted(true)
    setBlocks(generateBlocks(networkStats.blockHeight))

    const interval = setInterval(() => {
      setNetworkStats((prev) => {
        const newHeight = prev.blockHeight + 1
        setBlocks(generateBlocks(newHeight))
        return {
          ...prev,
          blockHeight: newHeight,
          gasPrice: Math.max(20, prev.gasPrice + Math.floor(Math.random() * 10) - 5),
          tps: Math.max(10, prev.tps + (Math.random() * 2 - 1)),
          pendingTx: Math.max(100000, prev.pendingTx + Math.floor(Math.random() * 1000) - 500),
        }
      })
    }, 12000)

    return () => clearInterval(interval)
  }, [])

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopiedHash(text)
    setTimeout(() => setCopiedHash(null), 2000)
  }

  const formatTimeAgo = (date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    return `${Math.floor(seconds / 3600)}h ago`
  }

  const tabs = [
    { id: "blocks", label: "Latest Blocks", icon: Icons.Blocks },
    { id: "contracts", label: "Smart Contracts", icon: Icons.Code },
    { id: "network", label: "Network Info", icon: Icons.Globe },
  ]

  const stats = [
    { 
      label: "Block Height", 
      value: networkStats.blockHeight.toLocaleString(), 
      icon: Icons.Blocks,
      gradient: "from-cyan-500 to-blue-600",
      bgGradient: "from-cyan-500/10 to-blue-600/10",
    },
    { 
      label: "Gas Price", 
      value: `${networkStats.gasPrice} Gwei`, 
      icon: Icons.Zap,
      gradient: "from-amber-500 to-orange-600",
      bgGradient: "from-amber-500/10 to-orange-600/10",
    },
    { 
      label: "TPS", 
      value: networkStats.tps.toFixed(1), 
      icon: Icons.TrendUp,
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-500/10 to-teal-600/10",
    },
    { 
      label: "Pending Txns", 
      value: networkStats.pendingTx.toLocaleString(), 
      icon: Icons.Clock,
      gradient: "from-violet-500 to-purple-600",
      bgGradient: "from-violet-500/10 to-purple-600/10",
    },
  ]

  return (
    <div className="min-h-screen bg-[#06060a] text-white overflow-x-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Main gradient orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-violet-500/8 rounded-full blur-[150px]" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
        
        {/* Animated grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
        
        {/* Scanline effect */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
          }}
        />
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : -20 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 mb-4"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                    <Icons.Cube />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#06060a] flex items-center justify-center">
                    <span className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" />
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-cyan-400 tracking-wider uppercase">Explorer</span>
                  <div className="flex items-center gap-2 text-xs text-white/40">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                    Mainnet Synced
                  </div>
                </div>
              </motion.div>
              <h1 className="text-5xl lg:text-6xl font-light tracking-tight mb-3">
                <span className="bg-gradient-to-r from-white via-white to-white/50 bg-clip-text text-transparent">
                  Blockchain
                </span>
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent ml-3">
                  Explorer
                </span>
              </h1>
              <p className="text-lg text-white/40 font-light">Explore blocks, transactions, and smart contracts</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-sm text-emerald-400 font-medium">Ethereum Mainnet</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <Icons.Activity />
                <span className="text-sm text-white/60 font-mono">#{networkStats.blockHeight.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Search Bar */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-10"
        >
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/50 to-violet-500/50 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
            <div className="relative p-1.5 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30">
                    <Icons.Search />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by Address / Txn Hash / Block / Token..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-14 pr-4 py-5 bg-transparent text-white placeholder:text-white/30 focus:outline-none text-base"
                  />
                </div>
                <button className="px-8 py-4 mr-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium transition-all duration-300 shadow-lg shadow-cyan-500/20">
                  Search
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Network Stats */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: mounted ? 1 : 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl hover:border-white/[0.12] transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.bgGradient} flex items-center justify-center`}>
                    <div className={`bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`}>
                      <stat.icon />
                    </div>
                  </div>
                </div>
                <div className={`text-2xl font-light bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>
                  {stat.value}
                </div>
                <div className="text-sm text-white/40">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* Tabs */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6 p-1.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'text-white/40 hover:text-white/60 hover:bg-white/5'
                }`}
              >
                <tab.icon />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {/* Blocks Tab */}
            {activeTab === "blocks" && (
              <motion.div
                key="blocks"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl overflow-hidden">
                  <div className="p-6 border-b border-white/[0.06] flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-medium text-white">Latest Blocks</h2>
                      <p className="text-sm text-white/40 mt-1">Most recently mined blocks on the network</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/40">
                      <Icons.Clock />
                      <span>~12s block time</span>
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse ml-2" />
                    </div>
                  </div>

                  <div className="divide-y divide-white/[0.04]">
                    {blocks.map((block, index) => (
                      <motion.div
                        key={block.number}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="group p-5 hover:bg-white/[0.02] transition-all duration-300"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                                <Icons.Cube />
                              </div>
                              {index === 0 && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <span className="font-mono font-semibold text-cyan-400 hover:underline cursor-pointer">
                                  #{block.number.toLocaleString()}
                                </span>
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  index === 0 
                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                    : 'bg-white/5 text-white/40 border border-white/10'
                                }`}>
                                  {formatTimeAgo(block.timestamp)}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-white/40">
                                <span className="font-mono">{block.hash}</span>
                                <button 
                                  onClick={() => copyToClipboard(block.fullHash)}
                                  className="hover:text-white/60 transition-colors"
                                >
                                  {copiedHash === block.fullHash ? (
                                    <span className="text-emerald-400"><Icons.Check /></span>
                                  ) : (
                                    <Icons.Copy />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-6">
                            <div className="flex items-center gap-2 text-sm">
                              <Icons.Hash />
                              <span className="text-white/60">{block.transactions} txns</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Icons.Zap />
                              <div className="flex items-center gap-2">
                                <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                                    style={{ width: `${(block.gasUsed / block.gasLimit) * 100}%` }}
                                  />
                                </div>
                                <span className="text-white/40">{((block.gasUsed / block.gasLimit) * 100).toFixed(0)}%</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Icons.Database />
                              <span className="text-white/60">{(block.size / 1000).toFixed(1)} KB</span>
                            </div>
                            <button className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-sm text-white/60 hover:text-white flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                              View <Icons.ExternalLink />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Contracts Tab */}
            {activeTab === "contracts" && (
              <motion.div
                key="contracts"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl overflow-hidden">
                  <div className="p-6 border-b border-white/[0.06] flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-medium text-white">Smart Contracts</h2>
                      <p className="text-sm text-white/40 mt-1">Popular verified contracts on Ethereum</p>
                    </div>
                    <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-sm font-medium flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all duration-300">
                      <Icons.Code />
                      Deploy Contract
                    </button>
                  </div>

                  <div className="divide-y divide-white/[0.04]">
                    {smartContracts.map((contract, index) => (
                      <motion.div
                        key={contract.address}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group p-5 hover:bg-white/[0.02] transition-all duration-300"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30 flex items-center justify-center text-2xl">
                              {contract.logo}
                            </div>
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <span className="font-semibold text-white">{contract.name}</span>
                                {contract.verified && (
                                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                                    <Icons.Check />
                                    Verified
                                  </span>
                                )}
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/5 text-white/40 border border-white/10">
                                  {contract.type}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-white/40">
                                <span className="font-mono">{contract.address}</span>
                                <button 
                                  onClick={() => copyToClipboard(contract.address)}
                                  className="hover:text-white/60 transition-colors"
                                >
                                  {copiedHash === contract.address ? (
                                    <span className="text-emerald-400"><Icons.Check /></span>
                                  ) : (
                                    <Icons.Copy />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-8">
                            <div className="text-center">
                              <p className="text-xs text-white/40 mb-1">Balance</p>
                              <p className="font-medium text-white">{contract.balance}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-white/40 mb-1">Transactions</p>
                              <p className="font-medium text-white">{contract.transactions.toLocaleString()}</p>
                            </div>
                            <button className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-sm text-white/60 hover:text-white flex items-center gap-2 transition-all duration-300">
                              <Icons.ExternalLink />
                              Etherscan
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Network Tab */}
            {activeTab === "network" && (
              <motion.div
                key="network"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid lg:grid-cols-2 gap-6"
              >
                {/* Network Status */}
                <div className="rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl overflow-hidden">
                  <div className="p-6 border-b border-white/[0.06] flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                      <Icons.Server />
                    </div>
                    <h3 className="text-lg font-medium text-white">Network Status</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    {[
                      { label: "Network", value: "Ethereum Mainnet", highlight: true },
                      { label: "Chain ID", value: "1", mono: true },
                      { label: "Block Time", value: "~12 seconds" },
                      { label: "Difficulty", value: networkStats.difficulty },
                      { label: "Hash Rate", value: networkStats.hashRate },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between py-2">
                        <span className="text-white/40">{item.label}</span>
                        <span className={`font-medium ${
                          item.highlight ? 'text-emerald-400' : 
                          item.mono ? 'font-mono text-white' : 
                          'text-white'
                        }`}>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security */}
                <div className="rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl overflow-hidden">
                  <div className="p-6 border-b border-white/[0.06] flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <Icons.Shield />
                    </div>
                    <h3 className="text-lg font-medium text-white">Security</h3>
                  </div>
                  <div className="p-6 space-y-5">
                    {[
                      { label: "Network Security", value: 98, status: "Excellent", color: "emerald" },
                      { label: "Decentralization", value: 92, status: "High", color: "cyan" },
                      { label: "Node Distribution", value: 87, status: "Global", color: "violet" },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-white/40">{item.label}</span>
                          <span className={`text-sm font-medium text-${item.color}-400`}>{item.status}</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.value}%` }}
                            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                            className={`h-full rounded-full ${
                              item.color === 'emerald' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' :
                              item.color === 'cyan' ? 'bg-gradient-to-r from-cyan-500 to-blue-500' :
                              'bg-gradient-to-r from-violet-500 to-purple-500'
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                    
                    <div className="mt-6 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                        <Icons.Cpu />
                      </div>
                      <div>
                        <span className="text-sm text-white/40">Active Validators</span>
                        <span className="text-white font-medium ml-2">945,234</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="lg:col-span-2 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl overflow-hidden">
                  <div className="p-6 border-b border-white/[0.06] flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400">
                      <Icons.Zap />
                    </div>
                    <h3 className="text-lg font-medium text-white">Quick Actions</h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { icon: Icons.Wallet, label: "Connect Wallet", gradient: "from-cyan-500 to-blue-600" },
                        { icon: Icons.Code, label: "Deploy Contract", gradient: "from-violet-500 to-purple-600" },
                        { icon: Icons.Activity, label: "Track Transaction", gradient: "from-amber-500 to-orange-600" },
                        { icon: Icons.Shield, label: "Verify Contract", gradient: "from-emerald-500 to-teal-600" },
                      ].map((action) => (
                        <button
                          key={action.label}
                          className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 flex flex-col items-center gap-3"
                        >
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} bg-opacity-10 flex items-center justify-center text-white/80 group-hover:scale-110 transition-transform duration-300`}>
                            <action.icon />
                          </div>
                          <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                            {action.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      </main>

      {/* Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        code, .font-mono {
          font-family: 'JetBrains Mono', monospace;
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