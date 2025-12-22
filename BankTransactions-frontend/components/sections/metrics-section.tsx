"use client"
import { MetricsDashboard } from "@/components/animations/metrics-dashboard"
import { ComparisonTable } from "@/components/animations/comparison-table"
import { MotionWrapper } from "@/components/animations/motion-wrapper"

export function MetricsSection() {
  return (
    <section className="border-y border-border bg-secondary/30 py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <MotionWrapper className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Platform Metrics
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Real-time statistics and performance metrics from our platform.
          </p>
        </MotionWrapper>

        {/* Metrics Dashboard */}
        <div className="mt-12">
          <MetricsDashboard />
        </div>

        {/* Comparison Table */}
        <MotionWrapper delay={0.3} className="mt-16">
          <h3 className="mb-6 text-center text-xl font-semibold text-foreground">Traditional Finance vs DeFi</h3>
          <ComparisonTable />
        </MotionWrapper>
      </div>
    </section>
  )
}
