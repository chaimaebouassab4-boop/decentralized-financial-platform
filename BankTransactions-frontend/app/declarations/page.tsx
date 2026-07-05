"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search, FileText, FilePlus2, Link2, ShieldAlert, Clock } from "lucide-react"
import { declarations, formatMAD, type Declaration } from "@/data/declarations"

const statusStyles: Record<Declaration["status"], string> = {
  Pending: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
  Verified: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
  Rejected: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30",
  "On-chain": "bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30",
}

const riskStyles: Record<Declaration["riskLevel"], string> = {
  Low: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  Medium: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
  High: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30",
}

const summary = [
  { label: "Total Declarations", value: declarations.length.toString(), icon: FileText },
  { label: "Pending Review", value: declarations.filter((d) => d.status === "Pending").length.toString(), icon: Clock },
  { label: "Anchored On-chain", value: declarations.filter((d) => d.status === "On-chain").length.toString(), icon: Link2 },
  { label: "High Risk", value: declarations.filter((d) => d.riskLevel === "High").length.toString(), icon: ShieldAlert },
]

export default function DeclarationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [riskFilter, setRiskFilter] = useState("all")

  const filtered = declarations.filter((d) => {
    const q = searchQuery.toLowerCase()
    const matchesSearch =
      d.id.toLowerCase().includes(q) ||
      d.importer.toLowerCase().includes(q) ||
      d.exporter.toLowerCase().includes(q) ||
      d.goodsCategory.toLowerCase().includes(q) ||
      d.originCountry.toLowerCase().includes(q)
    const matchesStatus = statusFilter === "all" || d.status === statusFilter
    const matchesRisk = riskFilter === "all" || d.riskLevel === riskFilter
    return matchesSearch && matchesStatus && matchesRisk
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
            <h1 className="text-3xl font-bold tracking-tight">Customs Declarations</h1>
            <p className="mt-1 text-muted-foreground">
              Electronic declarations with real-time status and blockchain anchoring.
            </p>
          </div>
          <Button className="gap-2 w-fit">
            <FilePlus2 className="h-4 w-4" />
            New Declaration
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
                  placeholder="Search by ID, importer, goods, country..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Verified">Verified</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                    <SelectItem value="On-chain">On-chain</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={riskFilter} onValueChange={setRiskFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Risk" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Risk Levels</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Declarations Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Declaration</TableHead>
                      <TableHead>Importer / Exporter</TableHead>
                      <TableHead>Goods</TableHead>
                      <TableHead>Origin</TableHead>
                      <TableHead className="text-right">Customs Value</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Risk</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((d) => (
                      <TableRow key={d.id} className="hover:bg-secondary/40">
                        <TableCell>
                          <div className="font-mono text-sm font-medium text-foreground">{d.id}</div>
                          <div className="text-xs text-muted-foreground">{d.destinationPort}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm font-medium">{d.importer}</div>
                          <div className="text-xs text-muted-foreground">{d.exporter}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{d.goodsCategory}</div>
                          <div className="font-mono text-xs text-muted-foreground">HS {d.hsCode}</div>
                        </TableCell>
                        <TableCell className="text-sm">{d.originCountry}</TableCell>
                        <TableCell className="text-right font-mono text-sm">{formatMAD(d.customsValue)}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={statusStyles[d.status]}>
                            {d.status === "On-chain" && <Link2 className="mr-1 h-3 w-3" />}
                            {d.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={riskStyles[d.riskLevel]}>
                            {d.riskLevel} ({d.riskScore})
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {filtered.length === 0 && (
                <div className="py-12 text-center text-muted-foreground">
                  No declarations match your filters.
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
