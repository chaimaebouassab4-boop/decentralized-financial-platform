"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  FileText,
  Landmark,
  Blocks,
  FileCheck2,
  Gauge,
  Home,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/contexts/auth-context"
import { Badge } from "@/components/ui/badge"
import { Logo } from "@/components/layout/logo"

const mainLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/declarations", label: "Declarations", icon: FileText },
  { href: "/transactions", label: "Transactions", icon: Landmark },
  { href: "/blockchain", label: "Blockchain", icon: Blocks },
  { href: "/documents", label: "Documents", icon: FileCheck2 },
  { href: "/risk-analysis", label: "Risk Analysis", icon: Gauge },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { user, authMode, logout } = useAuth()

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-border bg-sidebar">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-sidebar-border px-4">
        <Link href="/" className="group w-full">
          <Logo size="sm" showText={true} />
        </Link>
      </div>

      {authMode !== "authenticated" && (
        <div className="mx-4 mt-4 rounded-lg bg-amber-500/10 border border-amber-500/20 p-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30">
              Demo Mode
            </Badge>
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">
            You&apos;re viewing sample customs data.{" "}
            <Link href="/auth" className="text-primary hover:underline">
              Sign in
            </Link>{" "}
            or connect a wallet for full access.
          </p>
        </div>
      )}

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-1">
          <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Customs Modules
          </p>
          {mainLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
                {isActive && (
                  <motion.div
                    className="ml-auto h-1.5 w-1.5 rounded-full bg-sidebar-primary"
                    layoutId="sidebarActiveIndicator"
                  />
                )}
              </Link>
            )
          })}
        </div>

        <div className="mt-8 space-y-1">
          <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Navigation</p>
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-sidebar-border p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Theme</span>
          <ThemeToggle />
        </div>

        {authMode === "authenticated" && user && (
          <div className="mb-3 p-2 rounded-lg bg-sidebar-accent/50">
            <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate font-mono">
              {user.walletAddress || user.email}
            </p>
          </div>
        )}

        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
        >
          <LogOut className="h-4 w-4" />
          {authMode === "authenticated" ? "Log Out" : "Exit Demo"}
        </button>
      </div>
    </aside>
  )
}
