"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Wallet, 
  ArrowLeftRight, 
  FileCode2, 
  BarChart3, 
  Shield, 
  Globe,
  Zap,
  Lock
} from "lucide-react"
import { StaggerContainer, StaggerItem } from "@/components/animations/motion-wrapper"

const features = [
  {
    icon: ArrowLeftRight,
    title: "Traditional Transactions",
    description:
      "Manage payments, transfers, and wire transactions through our secure banking microservices with real-time processing.",
    gradient: "from-emerald-500 to-teal-500",
    stats: "Real-time",
  },
  {
    icon: Wallet,
    title: "Web3 Wallet Integration",
    description:
      "Connect your MetaMask wallet to interact with Ethereum blockchain and execute decentralized transactions seamlessly.",
    gradient: "from-orange-500 to-amber-500",
    stats: "MetaMask",
  },
  {
    icon: FileCode2,
    title: "Smart Contracts",
    description:
      "Execute Solidity smart contracts for automated payments, token staking, and secure decentralized financial operations.",
    gradient: "from-violet-500 to-purple-500",
    stats: "Solidity",
  },
  {
    icon: BarChart3,
    title: "Financial Analytics",
    description:
      "Visualize transaction flows, crypto movements, and financial trends with interactive real-time dashboards.",
    gradient: "from-cyan-500 to-blue-500",
    stats: "Live Data",
  },
]

const additionalFeatures = [
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "OAuth2 & JWT authentication with end-to-end encryption",
  },
  {
    icon: Globe,
    title: "Microservices Architecture",
    description: "Scalable FastAPI services with Kafka messaging",
  },
  {
    icon: Zap,
    title: "AWS Cloud Native",
    description: "Deployed on EKS with automated CI/CD pipelines",
  },
  {
    icon: Lock,
    title: "Blockchain Security",
    description: "Immutable transactions on Ethereum network",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary mb-4"
          >
            <Zap className="w-3.5 h-3.5" />
            Platform Capabilities
          </motion.span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
            Complete FinTech & Web3 Solution
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty max-w-xl mx-auto">
            Bridging traditional finance with blockchain technology for secure, transparent, and efficient financial operations.
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <StaggerContainer staggerDelay={0.12} className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <StaggerItem key={feature.title}>
              <motion.div
                whileHover={{
                  y: -8,
                  transition: { type: "spring", stiffness: 400, damping: 25 }
                }}
                className="h-full"
              >
                <Card className="group relative h-full overflow-hidden border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-[0.03]`}
                  />

                  {/* Top accent line */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <CardHeader className="pb-2">
                    <motion.div
                      className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}
                      style={{
                        boxShadow: `0 4px 20px rgba(0,0,0,0.1)`
                      }}
                    >
                      <feature.icon className="h-7 w-7" />
                    </motion.div>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-foreground">{feature.title}</CardTitle>
                    </div>
                    <span className={`inline-flex items-center rounded-md bg-gradient-to-r ${feature.gradient} bg-clip-text text-xs font-semibold text-transparent`}>
                      {feature.stats}
                    </span>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>

                  {/* Corner decoration */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 opacity-5 group-hover:opacity-10 transition-opacity">
                    <feature.icon className="w-full h-full" />
                  </div>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Additional Features - Compact Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {additionalFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-start gap-3 p-4 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/20 transition-all"
            >
              <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10 text-primary">
                <feature.icon className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">{feature.title}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative connecting element */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="hidden lg:block mx-auto mt-16 h-px w-1/2 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
        />
      </div>
    </section>
  )
}