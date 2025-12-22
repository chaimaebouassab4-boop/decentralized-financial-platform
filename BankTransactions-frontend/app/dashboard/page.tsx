"use client"

import { motion } from "framer-motion"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { PortfolioChart } from "@/components/dashboard/portfolio-chart"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { WalletAssets } from "@/components/dashboard/wallet-assets"
import { LiveBlocks } from "@/components/dashboard/live-blocks"
import { SmartContracts } from "@/components/dashboard/smart-contracts"
import { GasTracker } from "@/components/dashboard/gas-tracker"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here&apos;s what&apos;s happening with your portfolio.</p>
      </motion.div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Charts & Transactions */}
        <div className="space-y-6 lg:col-span-2">
          <PortfolioChart />
          <RecentTransactions />
          <SmartContracts />
        </div>

        {/* Right Column - Wallet & Live Data */}
        <div className="space-y-6">
          <WalletAssets />
          <GasTracker />
          <LiveBlocks />
        </div>
      </div>
    </div>
  )
}
