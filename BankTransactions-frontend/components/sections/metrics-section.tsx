"use client"

import { motion } from "framer-motion"
import { FileText, Timer, ShieldCheck, Link2, Check, X } from "lucide-react"
import { MotionWrapper } from "@/components/animations/motion-wrapper"
import { Counter } from "@/components/animations/counter"

const metrics = [
  { icon: FileText, value: 3247, suffix: "", label: "Declarations processed", note: "since launch", decimals: 0 },
  { icon: Timer, value: 68, suffix: "%", label: "Faster clearance", note: "vs paper-based process", decimals: 0 },
  { icon: ShieldCheck, value: 98.7, suffix: "%", label: "Document verification accuracy", note: "hash-based checks", decimals: 1 },
  { icon: Link2, value: 21642, suffix: "", label: "Records anchored on-chain", note: "immutable audit trail", decimals: 0 },
]

const comparison = [
  { criteria: "Declaration processing", legacy: "3 – 7 days, paper forms", platform: "Same day, fully digital" },
  { criteria: "Document authenticity", legacy: "Manual stamps, forgeable", platform: "SHA-256 hash verified on-chain" },
  { criteria: "Payment of duties", legacy: "Bank counter, slow reconciliation", platform: "Instant settlement with on-chain receipt" },
  { criteria: "Traceability", legacy: "Fragmented archives", platform: "Complete immutable blockchain history" },
  { criteria: "Risk targeting", legacy: "Manual, experience-based", platform: "Automated 0–100 scoring engine" },
  { criteria: "Fraud exposure", legacy: "High — falsified documents", platform: "Low — tamper-proof records" },
]

export function MetricsSection() {
  return (
    <section className="border-y border-border bg-secondary/30 py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <MotionWrapper className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Measurable Impact on Customs Operations
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Key performance indicators from the digitalized customs clearance process.
          </p>
        </MotionWrapper>

        {/* KPI Cards */}
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {metrics.map((metric, i) => (
            <MotionWrapper key={metric.label} delay={i * 0.1}>
              <motion.div
                className="h-full rounded-2xl border border-border bg-card p-6 text-center shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300"
                whileHover={{ y: -4 }}
              >
                <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <metric.icon className="h-5 w-5" />
                </div>
                <div className="text-2xl font-bold text-foreground sm:text-3xl">
                  <Counter end={metric.value} suffix={metric.suffix} decimals={metric.decimals} />
                </div>
                <p className="mt-1.5 text-sm font-medium text-foreground">{metric.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{metric.note}</p>
              </motion.div>
            </MotionWrapper>
          ))}
        </div>

        {/* Comparison Table */}
        <MotionWrapper delay={0.3} className="mt-16">
          <h3 className="mb-6 text-center text-xl font-semibold text-foreground">
            Paper-based Customs vs. DouaneChain
          </h3>
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="px-5 py-4 text-left font-semibold text-foreground">Criteria</th>
                    <th className="px-5 py-4 text-left font-semibold text-muted-foreground">Traditional Process</th>
                    <th className="px-5 py-4 text-left font-semibold text-primary">DouaneChain Platform</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <motion.tr
                      key={row.criteria}
                      className="border-b border-border/50 last:border-0"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <td className="px-5 py-4 font-medium text-foreground">{row.criteria}</td>
                      <td className="px-5 py-4 text-muted-foreground">
                        <span className="flex items-start gap-2">
                          <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500/70" />
                          {row.legacy}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-foreground">
                        <span className="flex items-start gap-2">
                          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                          {row.platform}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  )
}
