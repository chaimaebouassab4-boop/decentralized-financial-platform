"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const assets = [
  {
    name: "Ethereum",
    symbol: "ETH",
    balance: "45.892",
    value: "$114,730.00",
    change: "+5.2%",
    allocation: 65,
    icon: "⟠",
    color: "bg-[#627EEA]",
  },
  {
    name: "USD Coin",
    symbol: "USDC",
    balance: "25,000.00",
    value: "$25,000.00",
    change: "+0.0%",
    allocation: 20,
    icon: "$",
    color: "bg-[#2775CA]",
  },
  {
    name: "Chainlink",
    symbol: "LINK",
    balance: "850.00",
    value: "$12,750.00",
    change: "-2.1%",
    allocation: 10,
    icon: "⬡",
    color: "bg-[#375BD2]",
  },
  {
    name: "Uniswap",
    symbol: "UNI",
    balance: "420.50",
    value: "$4,205.00",
    change: "+8.4%",
    allocation: 5,
    icon: "🦄",
    color: "bg-[#FF007A]",
  },
]

export function WalletAssets() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
      <Card>
        <CardHeader>
          <CardTitle>Wallet Assets</CardTitle>
          <CardDescription>Your token holdings and allocations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assets.map((asset, index) => (
              <motion.div
                key={asset.symbol}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${asset.color} text-white text-lg`}
                >
                  {asset.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <span className="font-medium">{asset.name}</span>
                      <span className="ml-2 text-sm text-muted-foreground">{asset.symbol}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{asset.value}</p>
                      <p className={`text-xs ${asset.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                        {asset.change}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={asset.allocation} className="h-1.5 flex-1" />
                    <span className="text-xs text-muted-foreground w-8">{asset.allocation}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {asset.balance} {asset.symbol}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
