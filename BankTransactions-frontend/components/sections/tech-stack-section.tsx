"use client"

import { motion } from "framer-motion"
import { StaggerContainer, StaggerItem } from "@/components/animations/motion-wrapper"
import {
  Landmark,
  FileText,
  FileCheck2,
  FileCode2,
  TrendingUp,
  Wallet,
  History,
  Gauge,
  Lock,
  Zap,
  Globe,
  Link2,
  BadgeCheck,
} from "lucide-react"
import { useState } from "react"

const serviceCategories = [
  {
    id: "declarations",
    label: "Declarations & Clearance",
    icon: Landmark,
    color: "#14b8a6",
    services: [
      {
        icon: FileText,
        title: "Electronic Declarations",
        description: "File customs declarations digitally with goods details, HS codes and customs values.",
        action: "Open Declarations"
      },
      {
        icon: FileCheck2,
        title: "Document Verification",
        description: "Upload invoices, certificates and bills of lading — each hashed and verified automatically.",
        action: "Verify Documents"
      },
      {
        icon: BadgeCheck,
        title: "Clearance Tracking",
        description: "Follow every declaration from submission to final clearance certificate in real time.",
        action: "Track Clearance"
      },
    ]
  },
  {
    id: "blockchain",
    label: "Blockchain & Smart Contracts",
    icon: Link2,
    color: "#3b82f6",
    services: [
      {
        icon: Wallet,
        title: "Wallet Connection",
        description: "Connect MetaMask to sign customs operations and settle duties on the blockchain.",
        action: "Connect Wallet"
      },
      {
        icon: FileCode2,
        title: "Smart Contract Execution",
        description: "DeclarationRegistry, DocumentNotary and DutyPayment contracts automate the clearance chain.",
        action: "View Contracts"
      },
      {
        icon: History,
        title: "On-chain Traceability",
        description: "Every customs event is anchored with a transaction hash, block number and timestamp.",
        action: "Explore Records"
      },
    ]
  },
  {
    id: "risk",
    label: "Risk & Analytics",
    icon: TrendingUp,
    color: "#f59e0b",
    services: [
      {
        icon: Gauge,
        title: "Risk Scoring",
        description: "Automated 0–100 risk score per declaration with green, orange and red channel routing.",
        action: "Analyze Risk"
      },
      {
        icon: TrendingUp,
        title: "Operational Dashboards",
        description: "Monitor declaration volumes, duty collection and clearance times in live dashboards.",
        action: "Open Dashboard"
      },
      {
        icon: History,
        title: "Audit & Reporting",
        description: "Complete immutable history of operations for inspections and compliance reporting.",
        action: "View Reports"
      },
    ]
  },
]

const platformHighlights = [
  { icon: Lock, label: "Role-based Secure Access" },
  { icon: Zap, label: "Real-time Processing" },
  { icon: Globe, label: "Cloud-native Microservices" },
]

// Keep the same export name for backward compatibility
export function TechStackSection() {
  const [activeCategory, setActiveCategory] = useState("declarations")
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
            Every Customs Operation in One Place
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            From electronic declarations to blockchain-anchored clearance — manage the full customs lifecycle seamlessly.
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