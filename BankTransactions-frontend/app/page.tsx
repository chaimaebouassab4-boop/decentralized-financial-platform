import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { CryptoTicker } from "@/components/animations/crypto-ticker"
import { FeaturesSection } from "@/components/sections/features-section"
import { HowItWorksSection } from "@/components/sections/how-it-works-section"
import { TechStackSection } from "@/components/sections/tech-stack-section"
import { SecuritySection } from "@/components/sections/security-section"
import { InteractiveSection } from "@/components/sections/interactive-section"
import { MetricsSection } from "@/components/sections/metrics-section"
import { CtaSection } from "@/components/sections/cta-section"
import { ParticlesBackground } from "@/components/animations/particles-background"
import { ScrollProgress } from "@/components/animations/scroll-progress"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background relative">
      <ParticlesBackground />
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSection />
        <CryptoTicker />
        <FeaturesSection />
        <HowItWorksSection />
        <InteractiveSection />
        <TechStackSection />
        <MetricsSection />
        <SecuritySection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
