"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Gauge, AlertTriangle, CheckCircle2, ShieldQuestion } from "lucide-react"
import { riskAssessments, riskDistribution, type RiskAssessment } from "@/data/risk"
import type { RiskLevel } from "@/data/declarations"

const levelStyles: Record<RiskLevel, { badge: string; ring: string; text: string }> = {
  Low: {
    badge: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    ring: "#14b8a6",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  Medium: {
    badge: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    ring: "#f59e0b",
    text: "text-amber-600 dark:text-amber-400",
  },
  High: {
    badge: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30",
    ring: "#ef4444",
    text: "text-red-600 dark:text-red-400",
  },
}

/** Circular gauge for the 0-100 risk score */
function ScoreGauge({ score, level }: { score: number; level: RiskLevel }) {
  const radius = 34
  const circumference = 2 * Math.PI * radius
  const progress = (score / 100) * circumference

  return (
    <div className="relative h-20 w-20 flex-shrink-0">
      <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
        <circle cx="40" cy="40" r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth="7" />
        <motion.circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke={levelStyles[level].ring}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-xl font-bold ${levelStyles[level].text}`}>{score}</span>
        <span className="text-[9px] uppercase tracking-wide text-muted-foreground">/ 100</span>
      </div>
    </div>
  )
}

function AssessmentCard({ assessment, index }: { assessment: RiskAssessment; index: number }) {
  const [expanded, setExpanded] = useState(index === 0)
  const styles = levelStyles[assessment.level]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.07 }}
    >
      <Card className="transition-all hover:border-primary/30">
        <CardHeader
          className="flex cursor-pointer flex-row items-center justify-between gap-4 pb-3"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-center gap-4 min-w-0">
            <ScoreGauge score={assessment.score} level={assessment.level} />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <CardTitle className="text-base font-mono">{assessment.declarationId}</CardTitle>
                <Badge variant="outline" className={styles.badge}>
                  {assessment.level} Risk
                </Badge>
              </div>
              <CardDescription className="mt-1">
                {assessment.importer} — {assessment.goodsCategory}
              </CardDescription>
              <p className={`mt-1 text-xs font-medium ${styles.text}`}>{assessment.recommendation}</p>
            </div>
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {expanded ? "Hide factors ▲" : "View factors ▼"}
          </span>
        </CardHeader>

        {expanded && (
          <CardContent className="border-t border-border/60 pt-4">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Risk Factors Breakdown
            </p>
            <div className="space-y-3">
              {assessment.factors.map((factor) => (
                <div key={factor.label} className="flex items-start gap-3">
                  {factor.triggered ? (
                    <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
                  ) : (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-foreground">{factor.label}</span>
                      <span className="text-xs font-mono text-muted-foreground">+{factor.weight} pts</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{factor.detail}</p>
                    <Progress value={(factor.weight / 30) * 100} className="mt-1.5 h-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </motion.div>
  )
}

export default function RiskAnalysisPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold tracking-tight">Risk Analysis</h1>
          <p className="mt-1 text-muted-foreground">
            Automated 0–100 risk scoring routes each declaration to the green, orange or red channel.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Distribution sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-primary" />
                  <CardTitle>Risk Distribution</CardTitle>
                </div>
                <CardDescription>All active declarations by risk level</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {riskDistribution.map((item) => (
                  <div key={item.level}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 font-medium">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        {item.level} Risk
                      </span>
                      <span className="text-muted-foreground">
                        {item.count.toLocaleString()} ({item.percentage}%)
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-secondary">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}

                <div className="rounded-lg border border-border bg-secondary/40 p-4">
                  <div className="flex items-start gap-3">
                    <ShieldQuestion className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <div className="text-xs leading-relaxed text-muted-foreground">
                      <p className="mb-1 font-medium text-foreground">How scoring works</p>
                      The engine combines five weighted factors: missing documents, suspicious
                      values, country risk, product category risk and importer history. Scores
                      ≥ 70 trigger physical inspection; 40–69 require a document check.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Assessments list */}
          <div className="space-y-4 lg:col-span-2">
            {riskAssessments.map((assessment, i) => (
              <AssessmentCard key={assessment.declarationId} assessment={assessment} index={i} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
