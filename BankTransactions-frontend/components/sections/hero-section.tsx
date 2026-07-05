"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Wallet,
  FileCheck2,
  FileCode2,
  Link2,
  Gauge,
  Activity,
  FileText,
  Blocks,
  ShieldCheck,
  Timer,
} from "lucide-react"
import { BlockchainVisualization } from "@/components/animations/blockchain-visualization"
import { Counter } from "@/components/animations/counter"
import { MotionWrapper } from "@/components/animations/motion-wrapper"
import { Logo } from "@/components/layout/logo"
import { useWallet } from "@/hooks/use-wallet"

// Animated Network Background Component (Canvas overlay for extra dynamism)
function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let particles: Array<{
      x: number
      y: number
      radius: number
      vx: number
      vy: number
      opacity: number
    }> = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      particles = []
      const particleCount = Math.min(35, Math.floor(window.innerWidth / 40))

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 0.5,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.3 + 0.1,
        })
      }
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(20, 184, 166, ${0.04 * (1 - distance / 120)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

      // Draw particles
      particles.forEach(particle => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(20, 184, 166, ${particle.opacity})`
        ctx.fill()

        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1
      })

      animationFrameId = requestAnimationFrame(drawParticles)
    }

    resizeCanvas()
    createParticles()
    drawParticles()

    const handleResize = () => {
      resizeCanvas()
      createParticles()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[1]"
      style={{ opacity: 0.5 }}
    />
  )
}

// Floating Gradient Orbs (adds subtle motion to the static SVG)
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
      {/* Primary teal orb - top left */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.08) 0%, transparent 70%)',
          top: '-10%',
          left: '-5%',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, 20, 0],
          y: [0, 15, 0],
          scale: [1, 1.03, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Cyan orb - top right */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.06) 0%, transparent 70%)',
          top: '15%',
          right: '-5%',
          filter: 'blur(50px)',
        }}
        animate={{
          x: [0, -15, 0],
          y: [0, 20, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Bottom center orb */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 350,
          height: 350,
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.05) 0%, transparent 70%)',
          bottom: '0%',
          left: '35%',
          filter: 'blur(50px)',
        }}
        animate={{
          x: [0, 25, 0],
          y: [0, -15, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
    </div>
  )
}

const featureBadges = [
  { icon: Link2, label: "Blockchain Traceability" },
  { icon: FileCode2, label: "Smart Contracts" },
  { icon: FileCheck2, label: "Document Verification" },
  { icon: Gauge, label: "Risk Scoring" },
  { icon: Activity, label: "Real-time Monitoring" },
]

const heroStats = [
  { value: 3.2, suffix: "K+", prefix: "", label: "Declarations Processed", icon: FileText, decimals: 1 },
  { value: 21, suffix: "K+", prefix: "", label: "On-chain Records", icon: Blocks, decimals: 0 },
  { value: 98.7, suffix: "%", prefix: "", label: "Verification Accuracy", icon: ShieldCheck, decimals: 1 },
  { value: 4, suffix: "h", prefix: "<", label: "Avg. Clearance Time", icon: Timer, decimals: 0 },
]

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const { isConnected, isConnecting, shortAddress, connect } = useWallet()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-32">
      {/* ========== BACKGROUND SYSTEM ========== */}
      <div className="absolute inset-0 -z-10">
        {/* SVG Background Image - The main visual */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('/customs-hero-background.svg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Fallback gradient (shows while SVG loads or if it fails) */}
        <div
          className="absolute inset-0 -z-[1]"
          style={{
            background: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(170, 60%, 98%) 50%, hsl(var(--background)) 100%)'
          }}
        />

        {/* Animated canvas overlay for dynamic particles */}
        <NetworkBackground />

        {/* Floating gradient orbs for subtle motion */}
        <FloatingOrbs />

        {/* Top fade for navbar blend */}
        <div
          className="absolute top-0 left-0 right-0 h-32 z-[3]"
          style={{
            background: 'linear-gradient(to bottom, hsl(var(--background)) 0%, transparent 100%)'
          }}
        />

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48 z-[3]"
          style={{
            background: 'linear-gradient(to top, hsl(var(--background)) 0%, transparent 100%)'
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Logo */}
          <MotionWrapper delay={0}>
            <div className="mb-8 flex justify-center">
              <Logo size="lg" showText={true} />
            </div>
          </MotionWrapper>

          {/* Badge */}
          <MotionWrapper delay={0.05}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/90 backdrop-blur-md px-5 py-2 shadow-sm">
              <motion.span
                className="h-2 w-2 rounded-full bg-emerald-500"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-medium text-foreground">
                Blockchain-powered Customs Digitalization
              </span>
            </div>
          </MotionWrapper>

          {/* Headline */}
          <MotionWrapper delay={0.1}>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              <span className="text-gradient">Digital Customs Operations</span>
              <br />
              <span className="text-foreground">Unified in One Platform</span>
            </h1>
          </MotionWrapper>

          {/* Subtitle */}
          <MotionWrapper delay={0.2}>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed sm:text-xl text-pretty max-w-2xl mx-auto">
              Manage customs declarations, verify documents, track transactions, and secure
              international trade flows using blockchain-based traceability.
            </p>
          </MotionWrapper>

          {/* Feature badges */}
          <MotionWrapper delay={0.25}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {featureBadges.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 10 }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-background/90 backdrop-blur-sm border border-border/60 text-sm font-medium text-muted-foreground shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-3 h-3 text-primary" />
                  </div>
                  {item.label}
                </motion.div>
              ))}
            </div>
          </MotionWrapper>

          {/* CTA Buttons */}
          <MotionWrapper delay={0.3}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  onClick={connect}
                  disabled={isConnecting}
                  className="gap-2 w-full sm:w-auto relative overflow-hidden group bg-gradient-to-r from-primary to-teal-600 hover:from-primary/90 hover:to-teal-600/90 shadow-lg shadow-primary/25 px-8"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    {isConnected ? `Connected — ${shortAddress}` : isConnecting ? "Connecting..." : "Connect Wallet"}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </Button>
              </motion.div>
              <Link href="/dashboard">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 w-full sm:w-auto bg-background/90 backdrop-blur-sm group border-border/60 hover:border-primary/40 hover:bg-background px-8"
                  >
                    Open Dashboard
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </Link>
            </div>
          </MotionWrapper>

          {/* Blockchain Visualization */}
          <MotionWrapper delay={0.4} className="mt-16">
            <BlockchainVisualization />
          </MotionWrapper>

          {/* Stats with counter animation */}
          <div className="mt-20 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {heroStats.map((stat, i) => (
              <MotionWrapper key={stat.label} delay={0.5 + i * 0.1} className="text-center">
                <motion.div
                  className="relative p-5 rounded-2xl bg-background/80 backdrop-blur-sm border border-border/50 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300"
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-teal-500/10 flex items-center justify-center mx-auto mb-3 border border-primary/10">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>

                  <motion.div className="text-2xl font-bold text-foreground sm:text-3xl">
                    <Counter
                      end={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                    />
                  </motion.div>
                  <div className="mt-1.5 text-xs text-muted-foreground font-medium tracking-wide uppercase">{stat.label}</div>
                </motion.div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
