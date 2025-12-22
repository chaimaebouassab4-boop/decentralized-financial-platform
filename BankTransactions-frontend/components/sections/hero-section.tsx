"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Wallet } from "lucide-react"
import { TypingText } from "@/components/animations/typing-text"
import { FloatingShapes } from "@/components/animations/floating-shapes"
import { BlockchainVisualization } from "@/components/animations/blockchain-visualization"
import { Counter } from "@/components/animations/counter"
import { MotionWrapper } from "@/components/animations/motion-wrapper"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-32">
      {/* Floating Shapes Background */}
      <FloatingShapes />

      {/* Grid Effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#22d3ee08_1px,transparent_1px),linear-gradient(to_bottom,#22d3ee08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-96 w-96 rounded-full bg-primary/20 blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-96 w-96 rounded-full bg-purple-500/20 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <MotionWrapper delay={0}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-muted-foreground">Web3 Enabled Platform</span>
            </div>
          </MotionWrapper>

          {/* Headline with typing effect */}
          <MotionWrapper delay={0.1}>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              The Future of{" "}
              <span className="text-gradient">
                <TypingText
                  texts={["Decentralized", "Transparent", "Secure", "Trustless"]}
                  speed={80}
                  pauseDuration={2500}
                />
              </span>
              <br />
              Finance
            </h1>
          </MotionWrapper>

          {/* Subtitle */}
          <MotionWrapper delay={0.2}>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed sm:text-xl text-pretty">
              Experience secure, transparent financial services powered by blockchain technology, microservices
              architecture, and enterprise-grade cloud infrastructure.
            </p>
          </MotionWrapper>

          {/* CTA Buttons with ripple effect */}
          <MotionWrapper delay={0.3}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="gap-2 w-full sm:w-auto relative overflow-hidden group">
                  <span className="relative z-10 flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    Connect Wallet
                  </span>
                  <motion.span
                    className="absolute inset-0 bg-white/20"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 2, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                </Button>
              </motion.div>
              <Link href="/dashboard">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 w-full sm:w-auto bg-transparent backdrop-blur-sm group"
                  >
                    Explore Dashboard
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </Link>
            </div>
          </MotionWrapper>

          {/* Blockchain Visualization */}
          <MotionWrapper delay={0.4} className="mt-12">
            <BlockchainVisualization />
          </MotionWrapper>

          {/* Stats with counter animation */}
          <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              { value: 2.5, suffix: "B+", prefix: "$", label: "Total Volume" },
              { value: 150, suffix: "K+", prefix: "", label: "Active Users" },
              { value: 99.9, suffix: "%", prefix: "", label: "Uptime" },
              { value: 1, suffix: "s", prefix: "<", label: "Transaction Time" },
            ].map((stat, i) => (
              <MotionWrapper key={stat.label} delay={0.5 + i * 0.1} className="text-center">
                <motion.div className="text-2xl font-bold text-foreground sm:text-3xl" whileHover={{ scale: 1.1 }}>
                  <Counter
                    end={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.value % 1 !== 0 ? 1 : 0}
                  />
                </motion.div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
