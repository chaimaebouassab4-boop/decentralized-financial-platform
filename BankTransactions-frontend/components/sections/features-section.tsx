"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  FileText,
  FileCheck2,
  Landmark,
  Link2,
  Gauge,
  Activity,
  ShieldCheck,
  FileCode2,
} from "lucide-react"
import { StaggerContainer, StaggerItem } from "@/components/animations/motion-wrapper"

const features = [
  {
    icon: FileText,
    title: "Digital Declarations",
    description:
      "Submit and track electronic customs declarations with structured data, HS codes, and full lifecycle status from filing to clearance.",
    gradient: "from-teal-500 to-cyan-500",
    stats: "Paperless",
  },
  {
    icon: FileCheck2,
    title: "Document Verification",
    description:
      "Invoices, certificates of origin and bills of lading are hashed, verified, and anchored on-chain for tamper-proof authenticity.",
    gradient: "from-blue-500 to-indigo-500",
    stats: "SHA-256",
  },
  {
    icon: Landmark,
    title: "Duties & Tax Payments",
    description:
      "Settle customs duties, import VAT and clearance fees through secure transactions with verifiable on-chain receipts.",
    gradient: "from-emerald-500 to-teal-500",
    stats: "On-chain receipts",
  },
  {
    icon: Link2,
    title: "Blockchain Traceability",
    description:
      "Every customs event — declaration, verification, payment, clearance — is recorded immutably with a transaction hash and timestamp.",
    gradient: "from-cyan-500 to-blue-500",
    stats: "Immutable",
  },
]

const additionalFeatures = [
  {
    icon: Gauge,
    title: "Risk Scoring Engine",
    description: "Automated 0–100 scoring with green, orange and red channel routing",
  },
  {
    icon: FileCode2,
    title: "Smart Contract Automation",
    description: "Solidity contracts register declarations, notarize documents and issue certificates",
  },
  {
    icon: Activity,
    title: "Real-time Monitoring",
    description: "Live dashboards for declarations, payments and blockchain activity",
  },
  {
    icon: ShieldCheck,
    title: "Secure Access",
    description: "Role-based access for customs officers, importers and brokers",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary mb-4"
          >
            <Landmark className="w-3.5 h-3.5" />
            Customs Modules
          </motion.span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
            A Complete Digital Customs Solution
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty max-w-xl mx-auto">
            Digital customs declarations, secure trade transactions, blockchain traceability, and
            smart contract verification unified in one platform.
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <StaggerContainer staggerDelay={0.12} className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <motion.div
                whileHover={{
                  y: -8,
                  transition: { type: "spring", stiffness: 400, damping: 25 }
                }}
                className="h-full"
              >
                <Card className="group relative h-full overflow-hidden border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-[0.03]`}
                  />

                  {/* Top accent line */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <CardHeader className="pb-2">
                    <motion.div
                      className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}
                    >
                      <feature.icon className="h-7 w-7" />
                    </motion.div>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-foreground">{feature.title}</CardTitle>
                    </div>
                    <span className={`inline-flex items-center rounded-md bg-gradient-to-r ${feature.gradient} bg-clip-text text-xs font-semibold text-transparent`}>
                      {feature.stats}
                    </span>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>

                  {/* Corner decoration */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 opacity-5 group-hover:opacity-10 transition-opacity">
                    <feature.icon className="w-full h-full" />
                  </div>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Additional Features - Compact Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {additionalFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-start gap-3 p-4 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/20 transition-all"
            >
              <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10 text-primary">
                <feature.icon className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">{feature.title}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative connecting element */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="hidden lg:block mx-auto mt-16 h-px w-1/2 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
        />
      </div>
    </section>
  )
}
