// Mock risk scoring data for customs declarations.

import type { RiskLevel } from "./declarations"

export interface RiskFactor {
  label: string
  weight: number // contribution to the score (0 - 100)
  triggered: boolean
  detail: string
}

export interface RiskAssessment {
  declarationId: string
  importer: string
  goodsCategory: string
  score: number // 0 - 100
  level: RiskLevel
  recommendation: "Green channel — release" | "Orange channel — document check" | "Red channel — physical inspection"
  factors: RiskFactor[]
}

export function riskLevelFromScore(score: number): RiskLevel {
  if (score >= 70) return "High"
  if (score >= 40) return "Medium"
  return "Low"
}

export const riskAssessments: RiskAssessment[] = [
  {
    declarationId: "DEC-2026-00180",
    importer: "Global Trade Maroc",
    goodsCategory: "Electronics — Components",
    score: 82,
    level: "High",
    recommendation: "Red channel — physical inspection",
    factors: [
      { label: "Missing document", weight: 25, triggered: true, detail: "Certificate of origin rejected during verification" },
      { label: "Suspicious declared value", weight: 22, triggered: true, detail: "Value 34% below reference price for HS 8542.31" },
      { label: "Country risk", weight: 15, triggered: true, detail: "Transit through a high-risk free zone" },
      { label: "Product category risk", weight: 12, triggered: true, detail: "Electronic components — frequent under-invoicing" },
      { label: "Importer history", weight: 8, triggered: true, detail: "First import operation, no compliance record" },
    ],
  },
  {
    declarationId: "DEC-2026-00178",
    importer: "Medina Luxury Goods",
    goodsCategory: "Leather goods & accessories",
    score: 76,
    level: "High",
    recommendation: "Red channel — physical inspection",
    factors: [
      { label: "Missing document", weight: 0, triggered: false, detail: "All documents provided" },
      { label: "Suspicious declared value", weight: 30, triggered: true, detail: "Luxury goods declared 45% below brand catalogue price" },
      { label: "Country risk", weight: 6, triggered: false, detail: "Italy — low-risk origin" },
      { label: "Product category risk", weight: 20, triggered: true, detail: "High counterfeiting rate for this category" },
      { label: "Importer history", weight: 20, triggered: true, detail: "Two prior infractions in the last 12 months" },
    ],
  },
  {
    declarationId: "DEC-2026-00182",
    importer: "Sahara Textile Import",
    goodsCategory: "Textiles — Cotton fabric",
    score: 54,
    level: "Medium",
    recommendation: "Orange channel — document check",
    factors: [
      { label: "Missing document", weight: 18, triggered: true, detail: "Customs declaration form pending verification" },
      { label: "Suspicious declared value", weight: 10, triggered: true, detail: "Value slightly below sector average" },
      { label: "Country risk", weight: 8, triggered: false, detail: "Turkey — standard trade partner" },
      { label: "Product category risk", weight: 10, triggered: true, detail: "Textiles subject to quota monitoring" },
      { label: "Importer history", weight: 8, triggered: false, detail: "Compliant record over 3 years" },
    ],
  },
  {
    declarationId: "DEC-2026-00176",
    importer: "Casa Chemicals SA",
    goodsCategory: "Industrial chemicals",
    score: 48,
    level: "Medium",
    recommendation: "Orange channel — document check",
    factors: [
      { label: "Missing document", weight: 0, triggered: false, detail: "All documents provided" },
      { label: "Suspicious declared value", weight: 8, triggered: false, detail: "Value consistent with reference prices" },
      { label: "Country risk", weight: 12, triggered: true, detail: "Origin requires additional sanitary control" },
      { label: "Product category risk", weight: 24, triggered: true, detail: "Dual-use chemicals — licence verification required" },
      { label: "Importer history", weight: 4, triggered: false, detail: "One minor delay in prior declarations" },
    ],
  },
  {
    declarationId: "DEC-2026-00184",
    importer: "Atlas Electronics SARL",
    goodsCategory: "Electronics — Smartphones",
    score: 18,
    level: "Low",
    recommendation: "Green channel — release",
    factors: [
      { label: "Missing document", weight: 0, triggered: false, detail: "All documents verified and notarized on-chain" },
      { label: "Suspicious declared value", weight: 6, triggered: false, detail: "Value within 5% of reference price" },
      { label: "Country risk", weight: 6, triggered: false, detail: "Established trade lane" },
      { label: "Product category risk", weight: 6, triggered: true, detail: "Standard monitoring for electronics" },
      { label: "Importer history", weight: 0, triggered: false, detail: "AEO-certified importer, 5 years compliant" },
    ],
  },
  {
    declarationId: "DEC-2026-00183",
    importer: "Maroc Pharma Distribution",
    goodsCategory: "Pharmaceuticals",
    score: 12,
    level: "Low",
    recommendation: "Green channel — release",
    factors: [
      { label: "Missing document", weight: 0, triggered: false, detail: "All documents verified" },
      { label: "Suspicious declared value", weight: 0, triggered: false, detail: "Contract prices on file" },
      { label: "Country risk", weight: 4, triggered: false, detail: "Germany — low-risk origin" },
      { label: "Product category risk", weight: 8, triggered: true, detail: "Pharma requires health authority visa" },
      { label: "Importer history", weight: 0, triggered: false, detail: "Long-standing compliant operator" },
    ],
  },
]

export const riskDistribution = [
  { level: "Low" as RiskLevel, count: 2148, percentage: 67, color: "#14b8a6" },
  { level: "Medium" as RiskLevel, count: 812, percentage: 25, color: "#f59e0b" },
  { level: "High" as RiskLevel, count: 244, percentage: 8, color: "#ef4444" },
]
