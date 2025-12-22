"use client"
import { WalletPreview } from "@/components/animations/wallet-preview"
import { CodePreview } from "@/components/animations/code-preview"
import { MotionWrapper } from "@/components/animations/motion-wrapper"

export function InteractiveSection() {
  return (
    <section className="py-20 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <MotionWrapper className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Experience the Platform
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Interactive previews of our wallet interface and smart contract deployment.
          </p>
        </MotionWrapper>

        {/* Interactive Previews */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2 items-start">
          <MotionWrapper delay={0.2} direction="left">
            <WalletPreview />
          </MotionWrapper>
          <MotionWrapper delay={0.4} direction="right">
            <CodePreview />
          </MotionWrapper>
        </div>
      </div>
    </section>
  )
}
