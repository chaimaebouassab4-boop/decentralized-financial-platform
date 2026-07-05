"use client"

import { motion } from "framer-motion"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { DeclarationsChart } from "@/components/dashboard/declarations-chart"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { RiskDistribution } from "@/components/dashboard/risk-distribution"
import { LiveBlocks } from "@/components/dashboard/live-blocks"
import { SmartContracts } from "@/components/dashboard/smart-contracts"
import { DeclarationsStatus } from "@/components/dashboard/declarations-status"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Customs Operations Overview</h1>
        <p className="text-muted-foreground">
          Live view of declarations, payments, documents and blockchain traceability.
        </p>
      </motion.div>

      {/* KPI Cards */}
      <StatsCards />

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Charts & Transactions */}
        <div className="space-y-6 lg:col-span-2">
          <DeclarationsChart />
          <RecentTransactions />
          <SmartContracts />
        </div>

        {/* Right Column - Status & Live Data */}
        <div className="space-y-6">
          <DeclarationsStatus />
          <RiskDistribution />
          <LiveBlocks />
        </div>
      </div>
    </div>
  )
}
