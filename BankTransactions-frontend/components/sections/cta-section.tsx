"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, Sparkles } from "lucide-react"
import { MotionWrapper } from "@/components/animations/motion-wrapper"

export function CtaSection() {
  return (
    <section className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 sm:p-12 lg:p-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#22d3ee08_1px,transparent_1px),linear-gradient(to_bottom,#22d3ee08_1px,transparent_1px)] bg-[size:2rem_2rem]" />

            {/* Animated gradient orbs */}
            <motion.div
              className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-primary/20 blur-[80px]"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 20, 0],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
            />
            <motion.div
              className="absolute -right-20 -bottom-20 h-60 w-60 rounded-full bg-purple-500/20 blur-[80px]"
              animate={{
                scale: [1.2, 1, 1.2],
                x: [0, -20, 0],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>

          <div className="mx-auto max-w-2xl text-center relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.2 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-4 py-1.5"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary">Start Building Today</span>
            </motion.div>

            <MotionWrapper delay={0.1}>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
                Ready to Get Started?
              </h2>
            </MotionWrapper>

            <MotionWrapper delay={0.2}>
              <p className="mt-4 text-lg text-muted-foreground text-pretty">
                Join thousands of users already experiencing the future of decentralized finance. Launch the platform or
                explore our documentation.
              </p>
            </MotionWrapper>

            {/* CTA Buttons */}
            <MotionWrapper delay={0.3}>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/dashboard">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" className="gap-2 w-full sm:w-auto group">
                      Launch Platform
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.span>
                    </Button>
                  </motion.div>
                </Link>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 w-full sm:w-auto bg-transparent backdrop-blur-sm"
                  >
                    <FileText className="h-4 w-4" />
                    View Documentation
                  </Button>
                </motion.div>
              </div>
            </MotionWrapper>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
