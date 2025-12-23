"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Wallet, ArrowRightLeft, FileCode, Activity } from "lucide-react"
import { MotionWrapper } from "@/components/animations/motion-wrapper"
import { Counter } from "@/components/animations/counter"

const steps = [
  {
    icon: Wallet,
    step: 1,
    title: "Connect Wallet",
    description: "Link your MetaMask or compatible Web3 wallet to access the platform securely.",
  },
  {
    icon: ArrowRightLeft,
    step: 2,
    title: "Execute Transactions",
    description: "Send, receive, and manage your digital assets with our intuitive interface.",
  },
  {
    icon: FileCode,
    step: 3,
    title: "Smart Contracts",
    description: "Interact with Ethereum smart contracts for automated, trustless operations.",
  },
  {
    icon: Activity,
    step: 4,
    title: "Real-time Monitoring",
    description: "Track all your transactions and portfolio performance in real-time dashboards.",
  },
]

export function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const progressWidth = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"])

  return (
    <section ref={containerRef} className="border-y border-border bg-secondary/30 py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <MotionWrapper className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">How It Works</h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Get started with FinChain in four simple steps.
          </p>
        </MotionWrapper>

        {/* Progress Bar */}
        <div className="mt-12 hidden lg:block">
          <div className="mx-auto max-w-3xl">
            <div className="h-1 w-full rounded-full bg-border">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary via-purple-500 to-primary"
                style={{ width: progressWidth }}
              />
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <MotionWrapper key={step.title} delay={index * 0.15} direction={index % 2 === 0 ? "up" : "down"}>
              <motion.div className="relative" whileHover={{ y: -5 }}>
                {/* Connector Line (hidden on mobile and last item) */}
                {index < steps.length - 1 && (
                  <div className="absolute top-6 left-[calc(50%+2rem)] hidden h-px w-[calc(100%-4rem)] lg:block">
                    <motion.div
                      className="h-full w-full bg-gradient-to-r from-primary/50 to-transparent"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                    />
                  </div>
                )}

                <div className="flex flex-col items-center text-center">
                  {/* Step Number & Icon */}
                  <motion.div className="relative" whileHover={{ scale: 1.1 }} transition={{ type: "spring" }}>
                    <motion.div
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-primary"
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(34, 211, 238, 0)",
                          "0 0 0 10px rgba(34, 211, 238, 0.1)",
                          "0 0 0 0 rgba(34, 211, 238, 0)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.3 }}
                      >
                        <step.icon className="h-5 w-5" />
                      </motion.div>
                    </motion.div>
                    <motion.span
                      className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground"
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", delay: 0.3 + index * 0.1 }}
                    >
                      <Counter end={step.step} duration={1} />
                    </motion.span>
                  </motion.div>

                  {/* Content */}
                  <h3 className="mt-6 text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
