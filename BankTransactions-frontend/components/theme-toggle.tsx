"use client"

import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "@/components/theme-provider"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleToggle = () => {
    if (!mounted) return
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="relative h-9 w-9"
      onClick={handleToggle}
      aria-label="Toggle theme"
    >
      {mounted ? (
        <motion.div 
          className="relative w-4 h-4"
          initial={false} 
          animate={{ rotate: theme === "dark" ? 180 : 0 }} 
          transition={{ duration: 0.3 }}
        >
          <Sun className="absolute inset-0 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute inset-0 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </motion.div>
      ) : (
        <div className="relative w-4 h-4">
          <Sun className="absolute inset-0 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute inset-0 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </div>
      )}
    </Button>
  )
}