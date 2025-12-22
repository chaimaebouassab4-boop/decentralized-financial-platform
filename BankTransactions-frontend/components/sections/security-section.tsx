"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Lock, Eye, Server } from "lucide-react"
import { MotionWrapper, StaggerContainer, StaggerItem } from "@/components/animations/motion-wrapper"

const securityFeatures = [
  {
    icon: Lock,
    title: "Secure Authentication",
    description: "Multi-factor authentication and secure wallet connections protect your account.",
  },
  {
    icon: Eye,
    title: "Blockchain Transparency",
    description: "Every transaction is recorded on the blockchain for complete auditability.",
  },
  {
    icon: Server,
    title: "Cloud Security",
    description: "Enterprise-grade AWS security with encryption at rest and in transit.",
  },
]

const securityChecklist = [
  "End-to-end encryption for all data",
  "Smart contract audits by leading firms",
  "24/7 monitoring and threat detection",
  "Regulatory compliance (SOC 2, GDPR)",
]

export function SecuritySection() {
  return (
    <section className="border-y border-border bg-secondary/30 py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content */}
          <MotionWrapper direction="left">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Security & Trust
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-pretty">
              Your security is our top priority. We implement industry-leading security measures to protect your assets
              and data at every level.
            </p>

            {/* Security Checklist */}
            <ul className="mt-8 space-y-4">
              {securityChecklist.map((item, i) => (
                <motion.li
                  key={item}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", delay: i * 0.1 + 0.2 }}
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  </motion.div>
                  <span className="text-muted-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>
          </MotionWrapper>

          {/* Security Cards */}
          <StaggerContainer staggerDelay={0.15} className="space-y-4">
            {securityFeatures.map((feature, i) => (
              <StaggerItem key={feature.title}>
                <motion.div
                  className="flex gap-4 rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50 hover:bg-secondary/50"
                  whileHover={{ x: 10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="h-5 w-5" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}
