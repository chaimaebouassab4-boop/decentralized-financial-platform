"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { monthlyActivity } from "@/data/declarations"

type ChartView = "declarations" | "duties"

export function DeclarationsChart() {
  const [view, setView] = useState<ChartView>("declarations")

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{view === "declarations" ? "Declarations Activity" : "Duties & Taxes Collected"}</CardTitle>
            <CardDescription>
              {view === "declarations"
                ? "Submitted vs. cleared declarations per month"
                : "Monthly customs revenue (millions MAD)"}
            </CardDescription>
          </div>
          <div className="flex gap-1">
            <Button
              variant={view === "declarations" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("declarations")}
              className="h-8 px-3"
            >
              Declarations
            </Button>
            <Button
              variant={view === "duties" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("duties")}
              className="h-8 px-3"
            >
              Revenue
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              {view === "declarations" ? (
                <BarChart data={monthlyActivity} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="month"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: "hsl(var(--secondary))", opacity: 0.4 }}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--card-foreground))",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="declarations" name="Submitted" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="cleared" name="Cleared" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : (
                <AreaChart data={monthlyActivity}>
                  <defs>
                    <linearGradient id="colorDuties" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="month"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}M`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--card-foreground))",
                    }}
                    formatter={(value: number) => [`${value}M MAD`, "Duties & taxes"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="dutiesMAD"
                    stroke="#14b8a6"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorDuties)"
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
