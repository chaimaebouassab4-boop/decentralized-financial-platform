// Mock blockchain records: smart contract executions anchoring customs events.

export type ContractAction =
  | "Declaration registered"
  | "Document hash notarized"
  | "Duty payment settled"
  | "Clearance certificate issued"
  | "Risk flag recorded"

export interface BlockchainRecord {
  id: string
  declarationId: string
  contract: string
  action: ContractAction
  txHash: string
  walletAddress: string
  blockNumber: number
  confirmations: number
  timestamp: string
  timeAgo: string
  verified: boolean
}

export const blockchainRecords: BlockchainRecord[] = [
  {
    id: "BC-5521",
    declarationId: "DEC-2026-00184",
    contract: "ClearanceCertificate",
    action: "Clearance certificate issued",
    txHash: "0x8f3c9a2b1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a",
    walletAddress: "0xD0uane0fficer001a2B3c4D5e6F7a8B9c0D1e2F3",
    blockNumber: 19245730,
    confirmations: 240,
    timestamp: "2026-07-02T10:15:00Z",
    timeAgo: "2 hours ago",
    verified: true,
  },
  {
    id: "BC-5520",
    declarationId: "DEC-2026-00184",
    contract: "DutyPayment",
    action: "Duty payment settled",
    txHash: "0xab12cd34ef56ab12cd34ef56ab12cd34ef56ab12cd34ef56ab12cd34ef56ab12",
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD78",
    blockNumber: 19245712,
    confirmations: 258,
    timestamp: "2026-07-02T10:05:00Z",
    timeAgo: "2 hours ago",
    verified: true,
  },
  {
    id: "BC-5519",
    declarationId: "DEC-2026-00184",
    contract: "DocumentNotary",
    action: "Document hash notarized",
    txHash: "0xa3f5b8c2d94e17f60b3a58cd2e91f4a7b6c05d8e9f12a3b4c5d6e7f8091a2b3c",
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD78",
    blockNumber: 19245650,
    confirmations: 320,
    timestamp: "2026-07-02T09:35:00Z",
    timeAgo: "3 hours ago",
    verified: true,
  },
  {
    id: "BC-5518",
    declarationId: "DEC-2026-00184",
    contract: "DeclarationRegistry",
    action: "Declaration registered",
    txHash: "0xb6c05d8e9f12a3b4c5d6e7f8091a2b3ca3f5b8c2d94e17f60b3a58cd2e91f4a7",
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD78",
    blockNumber: 19245590,
    confirmations: 380,
    timestamp: "2026-07-02T09:15:00Z",
    timeAgo: "3 hours ago",
    verified: true,
  },
  {
    id: "BC-5517",
    declarationId: "DEC-2026-00180",
    contract: "RiskRegistry",
    action: "Risk flag recorded",
    txHash: "0xc7d16e9f0a23b4c5d6e7f8a9102b3c4db4c6d9e3f05a28b71c4b69de3f02a5b8",
    walletAddress: "0xD0uane0fficer001a2B3c4D5e6F7a8B9c0D1e2F3",
    blockNumber: 19244980,
    confirmations: 990,
    timestamp: "2026-07-01T10:12:00Z",
    timeAgo: "1 day ago",
    verified: true,
  },
  {
    id: "BC-5516",
    declarationId: "DEC-2026-00181",
    contract: "ClearanceCertificate",
    action: "Clearance certificate issued",
    txHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b",
    walletAddress: "0xD0uane0fficer002b3C4d5E6f7A8b9C0d1E2f3A4",
    blockNumber: 19238950,
    confirmations: 7020,
    timestamp: "2026-07-01T12:20:00Z",
    timeAgo: "1 day ago",
    verified: true,
  },
  {
    id: "BC-5515",
    declarationId: "DEC-2026-00177",
    contract: "DutyPayment",
    action: "Duty payment settled",
    txHash: "0x12cd34ef56ab12cd34ef56ab12cd34ef56ab12cd34ef56ab12cd34ef56ab12cd",
    walletAddress: "0x3fB2a1C4d5E6f7A8b9C0d1E2f3A4b5C6d7E8f9A0",
    blockNumber: 19224156,
    confirmations: 21800,
    timestamp: "2026-06-29T16:45:00Z",
    timeAgo: "3 days ago",
    verified: true,
  },
  {
    id: "BC-5514",
    declarationId: "DEC-2026-00182",
    contract: "DeclarationRegistry",
    action: "Declaration registered",
    txHash: "0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c1a2b3c4d5e6f7a8b9c0d1e2f",
    walletAddress: "0x6dE7f8A9b0C1d2E3f4A5b6C7d8E9f0A1b2C3d4E5",
    blockNumber: 19240110,
    confirmations: 5680,
    timestamp: "2026-07-01T16:45:00Z",
    timeAgo: "1 day ago",
    verified: false,
  },
]

// Smart contracts powering the platform
export interface CustomsContract {
  name: string
  address: string
  purpose: string
  executions: number
  status: "Active" | "Pending audit"
  version: string
}

export const customsContracts: CustomsContract[] = [
  {
    name: "DeclarationRegistry",
    address: "0x1234a5b6C7d8E9f0A1b2C3d4E5f6A7b8C9d0E1f2",
    purpose: "Registers each customs declaration and its lifecycle state",
    executions: 3204,
    status: "Active",
    version: "v2.1.0",
  },
  {
    name: "DocumentNotary",
    address: "0x8765f4E3d2C1b0A9f8E7d6C5b4A3f2E1d0C9b8A7",
    purpose: "Anchors SHA-256 hashes of trade documents for tamper-proof verification",
    executions: 8917,
    status: "Active",
    version: "v1.4.2",
  },
  {
    name: "DutyPayment",
    address: "0xabcdE1f2A3b4C5d6E7f8A9b0C1d2E3f4A5b6C7d8",
    purpose: "Settles duties, taxes and clearance fees with on-chain receipts",
    executions: 5642,
    status: "Active",
    version: "v1.9.0",
  },
  {
    name: "ClearanceCertificate",
    address: "0x9f0aB1c2D3e4F5a6B7c8D9e0F1a2B3c4D5e6F7a8",
    purpose: "Issues final customs clearance certificates as verifiable records",
    executions: 2871,
    status: "Active",
    version: "v1.2.0",
  },
  {
    name: "RiskRegistry",
    address: "0x4d5eC6f7A8b9C0d1E2f3A4b5C6d7E8f9A0b1C2d3",
    purpose: "Records risk flags and inspection outcomes for audit trails",
    executions: 1108,
    status: "Pending audit",
    version: "v0.9.1",
  },
]

// The customs clearance traceability flow displayed on the blockchain page
export const traceabilitySteps = [
  { step: 1, title: "Declaration created", description: "Importer submits the electronic customs declaration" },
  { step: 2, title: "Documents verified", description: "Trade documents are checked and their hashes generated" },
  { step: 3, title: "Smart contract executed", description: "Duties are computed and settled through the DutyPayment contract" },
  { step: 4, title: "Recorded on blockchain", description: "Every event is anchored on-chain with an immutable transaction hash" },
  { step: 5, title: "Clearance validated", description: "Customs issues the final clearance certificate on-chain" },
]

export const networkStats = {
  network: "Ethereum (Sepolia Testnet)",
  chainId: 11155111,
  blockHeight: 19245730,
  recordsAnchored: 21_642,
  avgConfirmationTime: "~12 s",
  activeContracts: 5,
}
