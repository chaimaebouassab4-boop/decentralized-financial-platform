"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Check, X } from "lucide-react"

const comparisons = [
  { feature: "Transaction Speed", traditional: "3-5 business days", defi: "< 1 second", defiWins: true },
  { feature: "Operating Hours", traditional: "9am-5pm weekdays", defi: "24/7/365", defiWins: true },
  { feature: "Global Access", traditional: "Limited", defi: "Worldwide", defiWins: true },
  { feature: "Fees", traditional: "2-5% + hidden fees", defi: "0.1-0.3%", defiWins: true },
  { feature: "Transparency", traditional: "Opaque", defi: "Fully transparent", defiWins: true },
  { feature: "Custody", traditional: "Third-party", defi: "Self-custody", defiWins: true },
  { feature: "KYC Required", traditional: "Always", defi: "Optional", defiWins: true },
  { feature: "Intermediaries", traditional: "Multiple", defi: "None", defiWins: true },
]

export function ComparisonTable() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div ref={ref} className="overflow-hidden rounded-xl border border-border bg-card">
      {/* Header */}
      <div className="grid grid-cols-3 border-b border-border bg-secondary/30 px-4 py-4 text-sm font-medium">
        <div className="text-muted-foreground">Feature</div>
        <div className="text-center text-muted-foreground">Traditional Finance</div>
        <div className="text-center text-primary">DeFi (FinChain)</div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-border">
        {comparisons.map((row, i) => (
          <motion.div
            key={row.feature}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="grid grid-cols-3 px-4 py-4 text-sm transition-colors hover:bg-secondary/20"
          >
            <div className="font-medium text-foreground">{row.feature}</div>
            <div className="flex items-center justify-center gap-2 text-center text-muted-foreground">
              <X className="h-4 w-4 text-red-500" />
              {row.traditional}
            </div>
            <div className="flex items-center justify-center gap-2 text-center text-foreground">
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.3, delay: i * 0.08 + 0.3, type: "spring" }}
              >
                <Check className="h-4 w-4 text-green-500" />
              </motion.div>
              {row.defi}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
