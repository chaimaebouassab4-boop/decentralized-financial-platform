// Mock customs payment transactions (duties, taxes, clearance fees).

export type PaymentType = "Customs Duty" | "Import VAT" | "Clearance Fee" | "Penalty" | "Storage Fee"
export type PaymentStatus = "Confirmed" | "Pending" | "Failed"

export interface CustomsTransaction {
  id: string
  declarationId: string
  type: PaymentType
  payer: string
  amount: number // in MAD
  status: PaymentStatus
  timestamp: string
  timeAgo: string
  txHash?: string // present when confirmed on blockchain
  blockNumber?: number
  walletAddress?: string
}

export const customsTransactions: CustomsTransaction[] = [
  {
    id: "PAY-2026-01042",
    declarationId: "DEC-2026-00184",
    type: "Customs Duty",
    payer: "Atlas Electronics SARL",
    amount: 460_625,
    status: "Confirmed",
    timestamp: "2026-07-02T10:05:00Z",
    timeAgo: "2 hours ago",
    txHash: "0xab12cd34ef56ab12cd34ef56ab12cd34ef56ab12cd34ef56ab12cd34ef56ab12",
    blockNumber: 19245712,
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD78",
  },
  {
    id: "PAY-2026-01041",
    declarationId: "DEC-2026-00184",
    type: "Import VAT",
    payer: "Atlas Electronics SARL",
    amount: 368_500,
    status: "Confirmed",
    timestamp: "2026-07-02T10:02:00Z",
    timeAgo: "2 hours ago",
    txHash: "0xcd34ef56ab12cd34ef56ab12cd34ef56ab12cd34ef56ab12cd34ef56ab12cd34",
    blockNumber: 19245710,
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD78",
  },
  {
    id: "PAY-2026-01040",
    declarationId: "DEC-2026-00183",
    type: "Clearance Fee",
    payer: "Maroc Pharma Distribution",
    amount: 12_800,
    status: "Pending",
    timestamp: "2026-07-02T09:40:00Z",
    timeAgo: "3 hours ago",
  },
  {
    id: "PAY-2026-01039",
    declarationId: "DEC-2026-00181",
    type: "Customs Duty",
    payer: "Rif Auto Parts",
    amount: 228_188,
    status: "Confirmed",
    timestamp: "2026-07-01T12:10:00Z",
    timeAgo: "1 day ago",
    txHash: "0xef56ab12cd34ef56ab12cd34ef56ab12cd34ef56ab12cd34ef56ab12cd34ef56",
    blockNumber: 19238904,
    walletAddress: "0x9aE4f21b0Cc2e3D45a7B8c9D0e1F2a3B4c5D6e7F",
  },
  {
    id: "PAY-2026-01038",
    declarationId: "DEC-2026-00181",
    type: "Import VAT",
    payer: "Rif Auto Parts",
    amount: 182_550,
    status: "Confirmed",
    timestamp: "2026-07-01T12:08:00Z",
    timeAgo: "1 day ago",
    txHash: "0x56ab12cd34ef56ab12cd34ef56ab12cd34ef56ab12cd34ef56ab12cd34ef56ab",
    blockNumber: 19238902,
    walletAddress: "0x9aE4f21b0Cc2e3D45a7B8c9D0e1F2a3B4c5D6e7F",
  },
  {
    id: "PAY-2026-01037",
    declarationId: "DEC-2026-00178",
    type: "Penalty",
    payer: "Medina Luxury Goods",
    amount: 63_770,
    status: "Failed",
    timestamp: "2026-06-30T15:22:00Z",
    timeAgo: "2 days ago",
  },
  {
    id: "PAY-2026-01036",
    declarationId: "DEC-2026-00177",
    type: "Customs Duty",
    payer: "BTP Materiaux Nord",
    amount: 972_500,
    status: "Confirmed",
    timestamp: "2026-06-29T16:45:00Z",
    timeAgo: "3 days ago",
    txHash: "0x12cd34ef56ab12cd34ef56ab12cd34ef56ab12cd34ef56ab12cd34ef56ab12cd",
    blockNumber: 19224156,
    walletAddress: "0x3fB2a1C4d5E6f7A8b9C0d1E2f3A4b5C6d7E8f9A0",
  },
  {
    id: "PAY-2026-01035",
    declarationId: "DEC-2026-00176",
    type: "Storage Fee",
    payer: "Casa Chemicals SA",
    amount: 8_400,
    status: "Pending",
    timestamp: "2026-06-29T09:30:00Z",
    timeAgo: "3 days ago",
  },
  {
    id: "PAY-2026-01034",
    declarationId: "DEC-2026-00175",
    type: "Import VAT",
    payer: "Oriental Foods Import",
    amount: 145_120,
    status: "Confirmed",
    timestamp: "2026-06-28T14:12:00Z",
    timeAgo: "4 days ago",
    txHash: "0x34ef56ab12cd34ef56ab12cd34ef56ab12cd34ef56ab12cd34ef56ab12cd34ef",
    blockNumber: 19217430,
    walletAddress: "0x5cD6e7F8a9B0c1D2e3F4a5B6c7D8e9F0a1B2c3D4",
  },
  {
    id: "PAY-2026-01033",
    declarationId: "DEC-2026-00179",
    type: "Clearance Fee",
    payer: "Agro Souss Export",
    amount: 9_600,
    status: "Confirmed",
    timestamp: "2026-06-30T15:00:00Z",
    timeAgo: "2 days ago",
    txHash: "0x90ab12cd34ef56ab12cd34ef56ab12cd34ef56ab12cd34ef56ab12cd34ef56ab",
    blockNumber: 19230012,
    walletAddress: "0x8bC9d0E1f2A3b4C5d6E7f8A9b0C1d2E3f4A5b6C7",
  },
]

export const transactionStats = {
  dutiesCollected: 28_400_000,
  vatCollected: 19_750_000,
  pendingPayments: 14,
  onChainRate: 87, // % of confirmed payments anchored on blockchain
}
