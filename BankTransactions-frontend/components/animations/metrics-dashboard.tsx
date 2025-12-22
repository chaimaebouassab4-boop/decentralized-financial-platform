"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Counter } from "./counter"
import { Activity, Users, DollarSign, FileCode } from "lucide-react"

const metrics = [
  {
    icon: Activity,
    label: "Total Transactions",
    value: 1234567,
    suffix: "",
    prefix: "",
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
  },
  {
    icon: Users,
    label: "Active Users",
    value: 45678,
    suffix: "",
    prefix: "",
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
  },
  {
    icon: DollarSign,
    label: "Total Volume",
    value: 12.5,
    suffix: "M",
    prefix: "$",
    color: "text-green-400",
    bgColor: "bg-green-400/10",
  },
  {
    icon: FileCode,
    label: "Smart Contracts",
    value: 3456,
    suffix: "",
    prefix: "",
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
  },
]

export function MetricsDashboard() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <div ref={ref} className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {metrics.map((metric, i) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50"
        >
          {/* Background glow */}
          <div
            className={`absolute -right-4 -top-4 h-24 w-24 rounded-full ${metric.bgColor} opacity-0 blur-2xl transition-opacity group-hover:opacity-100`}
          />

          <div className="relative">
            <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${metric.bgColor}`}>
              <metric.icon className={`h-5 w-5 ${metric.color}`} />
            </div>

            <div className="text-2xl font-bold text-foreground lg:text-3xl">
              {inView && (
                <Counter
                  end={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  duration={2.5}
                  decimals={metric.suffix === "M" ? 1 : 0}
                />
              )}
            </div>

            <div className="mt-1 text-sm text-muted-foreground">{metric.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
