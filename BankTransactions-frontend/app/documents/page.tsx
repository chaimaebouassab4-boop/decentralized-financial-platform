"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Upload,
  FileText,
  FileCheck2,
  FileX2,
  Hash,
  Link2,
  Database,
  CheckCircle2,
  Circle,
} from "lucide-react"
import { tradeDocuments, documentStats, type TradeDocument } from "@/data/documents"

const statusStyles: Record<TradeDocument["status"], string> = {
  Uploaded: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
  Verified: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  Rejected: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30",
}

const summary = [
  { label: "Documents Processed", value: documentStats.processed.toLocaleString(), icon: FileText },
  { label: "Verified", value: documentStats.verified.toLocaleString(), icon: FileCheck2 },
  { label: "Awaiting Review", value: documentStats.awaitingReview.toLocaleString(), icon: Search },
  { label: "Rejected", value: documentStats.rejected.toLocaleString(), icon: FileX2 },
]

/** Pipeline: Uploaded -> Hash generated -> Verified -> Stored */
function DocumentPipeline({ doc }: { doc: TradeDocument }) {
  const steps = [
    { label: "Uploaded", done: true },
    { label: "Hash generated", done: true },
    { label: "Verified", done: doc.status === "Verified" },
    { label: doc.storage === "On-chain reference" ? "Anchored on-chain" : "Stored off-chain", done: doc.status === "Verified" },
  ]

  return (
    <div className="flex items-center gap-1.5">
      {steps.map((step, i) => (
        <div key={step.label} className="flex items-center gap-1.5">
          <div className="flex items-center gap-1">
            {step.done ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <Circle className="h-3.5 w-3.5 text-muted-foreground/40" />
            )}
            <span className={`text-[11px] ${step.done ? "text-foreground" : "text-muted-foreground/60"}`}>
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && <span className="h-px w-3 bg-border" />}
        </div>
      ))}
    </div>
  )
}

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  const filtered = tradeDocuments.filter((doc) => {
    const q = searchQuery.toLowerCase()
    const matchesSearch =
      doc.fileName.toLowerCase().includes(q) ||
      doc.declarationId.toLowerCase().includes(q) ||
      doc.type.toLowerCase().includes(q)
    const matchesType = typeFilter === "all" || doc.type === typeFilter
    return matchesSearch && matchesType
  })

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Document Verification</h1>
            <p className="mt-1 text-muted-foreground">
              Trade documents hashed with SHA-256 and anchored for tamper-proof authenticity.
            </p>
          </div>
          <Button className="gap-2 w-fit">
            <Upload className="h-4 w-4" />
            Upload Document
          </Button>
        </motion.div>

        {/* Summary Cards */}
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {summary.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{item.value}</p>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <Card>
            <CardContent className="flex flex-col gap-3 p-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative flex-1 lg:max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by file name, declaration ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Document Types</SelectItem>
                  <SelectItem value="Commercial Invoice">Commercial Invoice</SelectItem>
                  <SelectItem value="Packing List">Packing List</SelectItem>
                  <SelectItem value="Certificate of Origin">Certificate of Origin</SelectItem>
                  <SelectItem value="Bill of Lading">Bill of Lading</SelectItem>
                  <SelectItem value="Customs Declaration Form">Customs Declaration Form</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </motion.div>

        {/* Document Cards */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {filtered.map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.05 }}
            >
              <Card className="h-full transition-all hover:border-primary/30 hover:shadow-md">
                <CardHeader className="flex flex-row items-start justify-between gap-3 pb-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground">{doc.type}</p>
                      <p className="truncate text-xs text-muted-foreground font-mono">{doc.fileName}</p>
                      <p className="text-xs text-muted-foreground">
                        {doc.declarationId} • {doc.id}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className={statusStyles[doc.status]}>
                    {doc.status}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <DocumentPipeline doc={doc} />

                  <div className="rounded-lg bg-secondary/50 p-3 space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <Hash className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
                      <span className="truncate font-mono text-muted-foreground">{doc.sha256}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      {doc.storage === "On-chain reference" ? (
                        <Link2 className="h-3.5 w-3.5 flex-shrink-0 text-teal-500" />
                      ) : (
                        <Database className="h-3.5 w-3.5 flex-shrink-0 text-blue-500" />
                      )}
                      <span className="font-medium text-foreground">{doc.storage}</span>
                      <span className="ml-auto text-muted-foreground">
                        {new Date(doc.uploadedAt).toLocaleDateString("en-GB")}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-muted-foreground">No documents match your filters.</div>
        )}
      </main>
      <Footer />
    </div>
  )
}
