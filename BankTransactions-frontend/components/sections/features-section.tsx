"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Blocks, Cloud, Network, Shield } from "lucide-react"
import { StaggerContainer, StaggerItem } from "@/components/animations/motion-wrapper"

const features = [
  {
    icon: Blocks,
    title: "Blockchain Transactions",
    description:
      "Execute secure, immutable transactions on the Ethereum network with full transparency and traceability.",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: Network,
    title: "Microservices Architecture",
    description:
      "Built on a scalable microservices foundation ensuring high availability and independent service deployment.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps (AWS)",
    description: "Deployed on AWS with automated CI/CD pipelines, containerization, and infrastructure as code.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description:
      "Enterprise-grade security with encryption, secure authentication, and regulatory compliance standards.",
    gradient: "from-orange-500 to-red-500",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Platform Features
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            A comprehensive suite of tools and technologies powering your financial operations.
          </p>
        </motion.div>

        {/* Features Grid */}
        <StaggerContainer staggerDelay={0.15} className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <StaggerItem key={feature.title}>
              <motion.div
                whileHover={{
                  y: -8,
                  rotateY: 5,
                  rotateX: 5,
                }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Card className="group relative h-full overflow-hidden border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity group-hover:opacity-5`}
                  />

                  <CardHeader>
                    <motion.div
                      className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <feature.icon className="h-6 w-6" />
                    </motion.div>
                    <CardTitle className="text-lg text-foreground">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>

                  {/* Animated border */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-purple-500"
                    initial={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Animated connecting lines (desktop only) */}
        <div className="hidden lg:block relative -mt-48 pointer-events-none">
          <svg className="absolute inset-0 w-full h-24" style={{ top: "-100px" }}>
            <motion.path
              d="M 200 50 Q 400 0, 600 50 Q 800 100, 1000 50"
              fill="none"
              stroke="rgba(34, 211, 238, 0.1)"
              strokeWidth="1"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
