// Mock customs declarations — replace with API calls when the backend is available.

export type DeclarationStatus = "Pending" | "Verified" | "Rejected" | "On-chain"
export type RiskLevel = "Low" | "Medium" | "High"

export interface Declaration {
  id: string
  importer: string
  exporter: string
  goodsCategory: string
  hsCode: string
  originCountry: string
  destinationPort: string
  customsValue: number // in MAD
  currency: string
  status: DeclarationStatus
  riskLevel: RiskLevel
  riskScore: number // 0 - 100
  submittedAt: string
  txHash?: string
}

export const declarations: Declaration[] = [
  {
    id: "DEC-2026-00184",
    importer: "Atlas Electronics SARL",
    exporter: "Shenzhen TechSource Co.",
    goodsCategory: "Electronics — Smartphones",
    hsCode: "8517.13",
    originCountry: "China",
    destinationPort: "Tanger Med",
    customsValue: 1_842_500,
    currency: "MAD",
    status: "On-chain",
    riskLevel: "Low",
    riskScore: 18,
    submittedAt: "2026-07-02T09:14:00Z",
    txHash: "0x8f3c9a2b1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a",
  },
  {
    id: "DEC-2026-00183",
    importer: "Maroc Pharma Distribution",
    exporter: "Bayer AG",
    goodsCategory: "Pharmaceuticals",
    hsCode: "3004.90",
    originCountry: "Germany",
    destinationPort: "Casablanca",
    customsValue: 3_260_000,
    currency: "MAD",
    status: "Verified",
    riskLevel: "Low",
    riskScore: 12,
    submittedAt: "2026-07-02T08:02:00Z",
  },
  {
    id: "DEC-2026-00182",
    importer: "Sahara Textile Import",
    exporter: "Bursa Tekstil A.S.",
    goodsCategory: "Textiles — Cotton fabric",
    hsCode: "5208.52",
    originCountry: "Turkey",
    destinationPort: "Tanger Med",
    customsValue: 486_300,
    currency: "MAD",
    status: "Pending",
    riskLevel: "Medium",
    riskScore: 54,
    submittedAt: "2026-07-01T16:40:00Z",
  },
  {
    id: "DEC-2026-00181",
    importer: "Rif Auto Parts",
    exporter: "Valencia Motors SL",
    goodsCategory: "Automotive spare parts",
    hsCode: "8708.29",
    originCountry: "Spain",
    destinationPort: "Nador West Med",
    customsValue: 912_750,
    currency: "MAD",
    status: "On-chain",
    riskLevel: "Low",
    riskScore: 22,
    submittedAt: "2026-07-01T11:25:00Z",
    txHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b",
  },
  {
    id: "DEC-2026-00180",
    importer: "Global Trade Maroc",
    exporter: "Unknown Trading FZE",
    goodsCategory: "Electronics — Components",
    hsCode: "8542.31",
    originCountry: "United Arab Emirates",
    destinationPort: "Casablanca",
    customsValue: 2_150_000,
    currency: "MAD",
    status: "Pending",
    riskLevel: "High",
    riskScore: 82,
    submittedAt: "2026-07-01T09:55:00Z",
  },
  {
    id: "DEC-2026-00179",
    importer: "Agro Souss Export",
    exporter: "Agro Souss Export",
    goodsCategory: "Agricultural — Citrus fruits",
    hsCode: "0805.10",
    originCountry: "Morocco",
    destinationPort: "Agadir",
    customsValue: 640_000,
    currency: "MAD",
    status: "Verified",
    riskLevel: "Low",
    riskScore: 9,
    submittedAt: "2026-06-30T14:18:00Z",
  },
  {
    id: "DEC-2026-00178",
    importer: "Medina Luxury Goods",
    exporter: "Milano Fashion SRL",
    goodsCategory: "Leather goods & accessories",
    hsCode: "4202.21",
    originCountry: "Italy",
    destinationPort: "Casablanca",
    customsValue: 1_275_400,
    currency: "MAD",
    status: "Rejected",
    riskLevel: "High",
    riskScore: 76,
    submittedAt: "2026-06-30T10:47:00Z",
  },
  {
    id: "DEC-2026-00177",
    importer: "BTP Materiaux Nord",
    exporter: "Lisboa Construção Lda",
    goodsCategory: "Construction materials — Steel",
    hsCode: "7214.20",
    originCountry: "Portugal",
    destinationPort: "Tanger Med",
    customsValue: 3_890_000,
    currency: "MAD",
    status: "On-chain",
    riskLevel: "Low",
    riskScore: 15,
    submittedAt: "2026-06-29T15:30:00Z",
    txHash: "0x7e2b3c1f4d5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c",
  },
  {
    id: "DEC-2026-00176",
    importer: "Casa Chemicals SA",
    exporter: "Mumbai Chem Industries",
    goodsCategory: "Industrial chemicals",
    hsCode: "2915.21",
    originCountry: "India",
    destinationPort: "Jorf Lasfar",
    customsValue: 1_560_800,
    currency: "MAD",
    status: "Pending",
    riskLevel: "Medium",
    riskScore: 48,
    submittedAt: "2026-06-29T08:12:00Z",
  },
  {
    id: "DEC-2026-00175",
    importer: "Oriental Foods Import",
    exporter: "Bangkok Rice Export",
    goodsCategory: "Foodstuffs — Rice",
    hsCode: "1006.30",
    originCountry: "Thailand",
    destinationPort: "Casablanca",
    customsValue: 725_600,
    currency: "MAD",
    status: "Verified",
    riskLevel: "Low",
    riskScore: 20,
    submittedAt: "2026-06-28T13:05:00Z",
  },
]

export const declarationStatusSummary = [
  { status: "Pending", count: 342, color: "#f59e0b" },
  { status: "Verified", count: 861, color: "#0ea5e9" },
  { status: "On-chain", count: 1904, color: "#14b8a6" },
  { status: "Rejected", count: 97, color: "#ef4444" },
]

// Monthly volumes used by dashboard charts
export const monthlyActivity = [
  { month: "Jan", declarations: 412, cleared: 385, dutiesMAD: 18.2 },
  { month: "Feb", declarations: 468, cleared: 431, dutiesMAD: 21.4 },
  { month: "Mar", declarations: 524, cleared: 489, dutiesMAD: 24.9 },
  { month: "Apr", declarations: 497, cleared: 470, dutiesMAD: 23.1 },
  { month: "May", declarations: 583, cleared: 548, dutiesMAD: 27.8 },
  { month: "Jun", declarations: 642, cleared: 601, dutiesMAD: 31.5 },
]

export function formatMAD(value: number): string {
  return `${value.toLocaleString("fr-MA")} MAD`
}

export function shortenHash(hash: string): string {
  return `${hash.slice(0, 10)}...${hash.slice(-8)}`
}
