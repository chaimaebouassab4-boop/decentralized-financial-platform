"use client"

import { motion } from "framer-motion"
import { StaggerContainer, StaggerItem } from "@/components/animations/motion-wrapper"
import { useEffect, useState } from "react"

const technologies = [
  { name: "React", category: "Frontend", color: "#61DAFB" },
  { name: "TypeScript", category: "Language", color: "#3178C6" },
  { name: "FastAPI", category: "Backend", color: "#009688" },
  { name: "Ethereum", category: "Blockchain", color: "#627EEA" },
  { name: "Solidity", category: "Smart Contracts", color: "#AA6746" },
  { name: "Docker", category: "Containerization", color: "#2496ED" },
  { name: "Kubernetes", category: "Orchestration", color: "#326CE5" },
  { name: "AWS", category: "Cloud", color: "#FF9900" },
]

export function TechStackSection() {
  return (
    <section className="py-20 sm:py-32 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 -z-10">
        <ClientParticles count={20} />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Technology Stack
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Built with cutting-edge technologies for performance, security, and scalability.
          </p>
        </motion.div>

        {/* Tech Grid */}
        <StaggerContainer staggerDelay={0.1} className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {technologies.map((tech, i) => (
            <StaggerItem key={tech.name}>
              <motion.div
                className="group relative flex flex-col items-center rounded-lg border border-border bg-card p-6 text-center transition-all"
                whileHover={{
                  scale: 1.05,
                  borderColor: tech.color,
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-lg opacity-0 transition-opacity group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at center, ${tech.color}20 0%, transparent 70%)`,
                  }}
                />

                {/* Icon */}
                <motion.div
                  className="relative flex h-12 w-12 items-center justify-center rounded-lg bg-secondary font-mono text-sm font-bold"
                  style={{ color: tech.color }}
                  whileHover={{
                    rotateY: 180,
                    transition: { duration: 0.6 },
                  }}
                >
                  <motion.span style={{ backfaceVisibility: "hidden" }}>
                    {tech.name.slice(0, 2).toUpperCase()}
                  </motion.span>
                </motion.div>

                <h3 className="mt-4 font-semibold text-foreground relative z-10">{tech.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground relative z-10">{tech.category}</p>

                {/* Animated underline */}
                <motion.div
                  className="absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2"
                  style={{ backgroundColor: tech.color }}
                  initial={{ width: 0 }}
                  whileHover={{ width: "50%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function ClientParticles({ count }: { count: number }) {
  const [particles, setParticles] = useState<{ left: string; top: string; duration: number; delay: number; id: string }[]>([])

  useEffect(() => {
    const list = Array.from({ length: count }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
      id: `p-${Date.now()}-${i}`,
    }))
    setParticles(list)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute h-1 w-1 rounded-full bg-primary/30"
          style={{ left: p.left, top: p.top }}
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: p.duration, repeat: Number.POSITIVE_INFINITY, delay: p.delay }}
        />
      ))}
    </>
  )
}
