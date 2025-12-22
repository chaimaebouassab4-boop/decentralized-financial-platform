"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  Blocks,
  TrendingUp,
  Shield,
  Bell,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

const mainLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/transactions", label: "Transactions", icon: ArrowLeftRight },
  { href: "/dashboard/wallet", label: "Wallet", icon: Wallet },
  { href: "/dashboard/blockchain", label: "Blockchain", icon: Blocks },
  { href: "/dashboard/analytics", label: "Analytics", icon: TrendingUp },
  { href: "/dashboard/contracts", label: "Smart Contracts", icon: FileText },
]

const secondaryLinks = [
  { href: "/dashboard/security", label: "Security", icon: Shield },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/dashboard/help", label: "Help Center", icon: HelpCircle },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-border bg-sidebar">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-bold text-sidebar-primary-foreground">FC</span>
          </motion.div>
          <span className="text-lg font-semibold text-sidebar-foreground group-hover:text-sidebar-primary transition-colors">
            FinChain
          </span>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-1">
          <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Main Menu</p>
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
                    layoutId="activeIndicator"
                  />
                )}
              </Link>
            )
          })}
        </div>

        <div className="mt-8 space-y-1">
          <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Settings</p>
          {secondaryLinks.map((link) => {
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
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-sidebar-border p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Theme</span>
          <ThemeToggle />
        </div>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10">
          <LogOut className="h-4 w-4" />
          Log Out
        </button>
      </div>
    </aside>
  )
}
