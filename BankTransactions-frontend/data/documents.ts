// Mock trade documents attached to customs declarations.

export type DocumentType =
  | "Commercial Invoice"
  | "Packing List"
  | "Certificate of Origin"
  | "Bill of Lading"
  | "Customs Declaration Form"

export type DocumentStatus = "Uploaded" | "Verified" | "Rejected"

export interface TradeDocument {
  id: string
  declarationId: string
  type: DocumentType
  fileName: string
  status: DocumentStatus
  sha256: string
  storage: "On-chain reference" | "Off-chain (IPFS)"
  uploadedAt: string
  verifiedAt?: string
}

export const tradeDocuments: TradeDocument[] = [
  {
    id: "DOC-00891",
    declarationId: "DEC-2026-00184",
    type: "Commercial Invoice",
    fileName: "invoice_atlas_electronics_0184.pdf",
    status: "Verified",
    sha256: "a3f5b8c2d94e17f60b3a58cd2e91f4a7b6c05d8e9f12a3b4c5d6e7f8091a2b3c",
    storage: "On-chain reference",
    uploadedAt: "2026-07-02T09:16:00Z",
    verifiedAt: "2026-07-02T09:31:00Z",
  },
  {
    id: "DOC-00890",
    declarationId: "DEC-2026-00184",
    type: "Packing List",
    fileName: "packing_list_0184.pdf",
    status: "Verified",
    sha256: "b4c6d9e3f05a28b71c4b69de3f02a5b8c7d16e9f0a23b4c5d6e7f8a9102b3c4d",
    storage: "On-chain reference",
    uploadedAt: "2026-07-02T09:17:00Z",
    verifiedAt: "2026-07-02T09:32:00Z",
  },
  {
    id: "DOC-00889",
    declarationId: "DEC-2026-00184",
    type: "Certificate of Origin",
    fileName: "certificate_origin_cn_0184.pdf",
    status: "Verified",
    sha256: "c5d7e0f4a16b39c82d5c70ef4a13b6c9d8e27f0a1b34c5d6e7f8a9b0213c4d5e",
    storage: "On-chain reference",
    uploadedAt: "2026-07-02T09:18:00Z",
    verifiedAt: "2026-07-02T09:35:00Z",
  },
  {
    id: "DOC-00888",
    declarationId: "DEC-2026-00184",
    type: "Bill of Lading",
    fileName: "bl_maersk_0184.pdf",
    status: "Verified",
    sha256: "d6e8f1a5b27c40d93e6d81f05b24c7d0e9f38a1b2c45d6e7f8a9b0c1324d5e6f",
    storage: "Off-chain (IPFS)",
    uploadedAt: "2026-07-02T09:19:00Z",
    verifiedAt: "2026-07-02T09:38:00Z",
  },
  {
    id: "DOC-00887",
    declarationId: "DEC-2026-00182",
    type: "Customs Declaration Form",
    fileName: "dum_form_0182.pdf",
    status: "Uploaded",
    sha256: "e7f9a2b6c38d51e04f7e92a16c35d8e1f0a49b2c3d56e7f8a9b0c1d2435e6f7a",
    storage: "Off-chain (IPFS)",
    uploadedAt: "2026-07-01T16:42:00Z",
  },
  {
    id: "DOC-00886",
    declarationId: "DEC-2026-00182",
    type: "Commercial Invoice",
    fileName: "invoice_bursa_tekstil_0182.pdf",
    status: "Uploaded",
    sha256: "f8a0b3c7d49e62f15a8fa3b27d46e9f2a1b50c3d4e67f8a9b0c1d2e3546f7a8b",
    storage: "Off-chain (IPFS)",
    uploadedAt: "2026-07-01T16:44:00Z",
  },
  {
    id: "DOC-00885",
    declarationId: "DEC-2026-00180",
    type: "Certificate of Origin",
    fileName: "certificate_origin_ae_0180.pdf",
    status: "Rejected",
    sha256: "0a1b4c8d5af73a26b90ab4c38e57f0a3b2c61d4e5f78a9b0c1d2e3f4657a8b9c",
    storage: "Off-chain (IPFS)",
    uploadedAt: "2026-07-01T10:02:00Z",
  },
  {
    id: "DOC-00884",
    declarationId: "DEC-2026-00181",
    type: "Bill of Lading",
    fileName: "bl_grimaldi_0181.pdf",
    status: "Verified",
    sha256: "1b2c5d9e6ba84b37ca1bc5d49f68a1b4c3d72e5f6a89b0c1d2e3f4a5768b9c0d",
    storage: "On-chain reference",
    uploadedAt: "2026-07-01T11:27:00Z",
    verifiedAt: "2026-07-01T11:52:00Z",
  },
  {
    id: "DOC-00883",
    declarationId: "DEC-2026-00183",
    type: "Commercial Invoice",
    fileName: "invoice_bayer_0183.pdf",
    status: "Verified",
    sha256: "2c3d6e0f7cb95c48db2cd6e5a079b2c5d4e83f6a7b90c1d2e3f4a5b6879c0d1e",
    storage: "On-chain reference",
    uploadedAt: "2026-07-02T08:04:00Z",
    verifiedAt: "2026-07-02T08:20:00Z",
  },
  {
    id: "DOC-00882",
    declarationId: "DEC-2026-00183",
    type: "Packing List",
    fileName: "packing_list_0183.pdf",
    status: "Verified",
    sha256: "3d4e7f1a8dc06d59ec3de7f6b18ac3d6e5f94a7b8c01d2e3f4a5b6c798a0d1e2f",
    storage: "Off-chain (IPFS)",
    uploadedAt: "2026-07-02T08:05:00Z",
    verifiedAt: "2026-07-02T08:22:00Z",
  },
]

export const documentStats = {
  processed: 4_218,
  verified: 3_876,
  awaitingReview: 268,
  rejected: 74,
}
