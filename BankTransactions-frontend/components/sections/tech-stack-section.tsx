"use client"

import { motion } from "framer-motion"
import { StaggerContainer, StaggerItem } from "@/components/animations/motion-wrapper"
import { 
  Send, 
  ArrowLeftRight, 
  Landmark, 
  Coins,
  FileCode2,
  TrendingUp,
  Wallet,
  History,
  PieChart,
  Lock,
  Zap,
  Globe
} from "lucide-react"
import { useState } from "react"

const serviceCategories = [
  {
    id: "traditional",
    label: "Traditional Banking",
    icon: Landmark,
    color: "#10b981",
    services: [
      {
        icon: Send,
        title: "Bank Transfers",
        description: "Send money instantly between accounts with real-time confirmation and tracking.",
        action: "Transfer Now"
      },
      {
        icon: ArrowLeftRight,
        title: "Payment Processing",
        description: "Process payments securely with multiple payment methods and currencies.",
        action: "Make Payment"
      },
      {
        icon: History,
        title: "Transaction History",
        description: "Complete audit trail of all your financial activities with export options.",
        action: "View History"
      },
    ]
  },
  {
    id: "blockchain",
    label: "Blockchain & Web3",
    icon: Coins,
    color: "#8b5cf6",
    services: [
      {
        icon: Wallet,
        title: "Wallet Connection",
        description: "Connect MetaMask to interact with Ethereum and manage your crypto assets.",
        action: "Connect Wallet"
      },
      {
        icon: FileCode2,
        title: "Smart Contracts",
        description: "Execute Solidity contracts for staking, token swaps, and automated payments.",
        action: "Execute Contract"
      },
      {
        icon: Coins,
        title: "Token Staking",
        description: "Stake your tokens and earn rewards through our verified smart contracts.",
        action: "Start Staking"
      },
    ]
  },
  {
    id: "analytics",
    label: "Analytics & Insights",
    icon: TrendingUp,
    color: "#06b6d4",
    services: [
      {
        icon: PieChart,
        title: "Portfolio Overview",
        description: "Unified view of your traditional and crypto assets in real-time dashboards.",
        action: "View Portfolio"
      },
      {
        icon: TrendingUp,
        title: "Financial Trends",
        description: "AI-powered insights on spending patterns and investment opportunities.",
        action: "See Insights"
      },
      {
        icon: History,
        title: "Blockchain Explorer",
        description: "Track your on-chain transactions with detailed analytics and gas insights.",
        action: "Explore Chain"
      },
    ]
  },
]

const platformHighlights = [
  { icon: Lock, label: "OAuth2 & JWT Security" },
  { icon: Zap, label: "Real-time Processing" },
  { icon: Globe, label: "AWS Cloud Native" },
]

// Keep the same export name for backward compatibility
export function TechStackSection() {
  const [activeCategory, setActiveCategory] = useState("traditional")
  const activeData = serviceCategories.find(c => c.id === activeCategory)!

  return (
    <section className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-transparent to-secondary/30" />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${activeData.color}08 0%, transparent 70%)`,
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary mb-4"
          >
            <Zap className="w-3.5 h-3.5" />
            Platform Services
          </motion.span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
            Everything You Need in One Platform
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            From traditional banking to blockchain transactions—manage all your financial operations seamlessly.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {serviceCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                activeCategory === category.id
                  ? "text-white shadow-lg"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
              style={{
                backgroundColor: activeCategory === category.id ? category.color : undefined,
                boxShadow: activeCategory === category.id ? `0 8px 30px ${category.color}40` : undefined,
              }}
            >
              <category.icon className="w-5 h-5" />
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Services Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid gap-6 md:grid-cols-3"
        >
          {activeData.services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative bg-card rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all overflow-hidden"
            >
              {/* Hover gradient */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `linear-gradient(135deg, ${activeData.color}05 0%, transparent 50%)`,
                }}
              />

              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                style={{ 
                  backgroundColor: `${activeData.color}15`,
                  color: activeData.color 
                }}
              >
                <service.icon className="w-7 h-7" />
              </motion.div>

              {/* Content */}
              <h3 className="relative text-lg font-semibold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="relative text-sm text-muted-foreground leading-relaxed mb-4">
                {service.description}
              </p>

              {/* Action Link */}
              <motion.button
                whileHover={{ x: 5 }}
                className="relative inline-flex items-center gap-2 text-sm font-medium transition-colors"
                style={{ color: activeData.color }}
              >
                {service.action}
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>

              {/* Corner decoration */}
              <div 
                className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-5 group-hover:opacity-10 transition-opacity"
                style={{ backgroundColor: activeData.color }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Platform Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 flex flex-wrap justify-center gap-6"
        >
          {platformHighlights.map((highlight, i) => (
            <motion.div
              key={highlight.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-card/50 border border-border backdrop-blur-sm"
            >
              <highlight.icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">{highlight.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mx-auto mt-16 h-px w-1/3 bg-gradient-to-r from-transparent via-border to-transparent"
        />
      </div>
    </section>
  )
}