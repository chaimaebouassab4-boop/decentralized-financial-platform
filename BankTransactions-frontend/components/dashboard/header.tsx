"use client"

import { Bell, Search, ChevronDown, Wallet, Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { useWallet } from "@/hooks/use-wallet"
import Link from "next/link"

export function DashboardHeader() {
  const { user, authMode, logout } = useAuth()
  const { isConnected, isConnecting, shortAddress, address, connect, disconnect } = useWallet()

  const displayName = user?.name || "Guest User"
  const displayEmail = user?.email || "Demo Account"
  const isGuest = authMode !== "authenticated"

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur-sm">
      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search declarations, documents, transaction hashes..."
          className="h-10 w-full bg-secondary pl-10 pr-4"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Network Status */}
        <div className="hidden items-center gap-2 rounded-full bg-secondary px-3 py-1.5 md:flex">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-medium text-foreground">Blockchain Synced</span>
        </div>

        {/* Wallet */}
        {isConnected ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 bg-secondary border-border">
                <Wallet className="h-4 w-4 text-primary" />
                <span className="hidden font-mono text-sm sm:inline">{shortAddress}</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Connected Wallet</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => address && navigator.clipboard.writeText(address)}>
                <Copy className="mr-2 h-4 w-4" />
                Copy Address
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ExternalLink className="mr-2 h-4 w-4" />
                View on Block Explorer
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={disconnect}>
                Disconnect
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button size="sm" className="gap-2" onClick={connect} disabled={isConnecting}>
            <Wallet className="h-4 w-4" />
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </Button>
        )}

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-[10px]">3</Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <span className="text-sm font-medium">Clearance Certificate Issued</span>
              <span className="text-xs text-muted-foreground">DEC-2026-00184 cleared and anchored on-chain</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <span className="text-sm font-medium">High Risk Declaration Flagged</span>
              <span className="text-xs text-muted-foreground">DEC-2026-00180 routed to red channel (score 82)</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <span className="text-sm font-medium">Duty Payment Confirmed</span>
              <span className="text-xs text-muted-foreground">460,625 MAD settled — tx 0xab12cd34...</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar || "/placeholder-user.jpg"} />
                <AvatarFallback>{displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="hidden text-left md:block">
                <p className="text-sm font-medium">{displayName}</p>
                <p className="text-xs text-muted-foreground">{isGuest ? "Demo Mode" : displayEmail}</p>
              </div>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            {isGuest ? (
              <DropdownMenuItem asChild>
                <Link href="/auth" className="text-primary">
                  Sign In
                </Link>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={logout} className="text-destructive">
                Log out
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
