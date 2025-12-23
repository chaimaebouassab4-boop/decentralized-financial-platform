"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { Menu, X, Wallet, Sparkles, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

const navLinks = [
  { href: "/", label: "Home", icon: "01" },
  { href: "/dashboard", label: "Dashboard", icon: "02" },
  { href: "/transactions", label: "Transactions", icon: "03" },
  { href: "/blockchain", label: "Blockchain", icon: "04" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState("/")
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)
    setActiveLink(window.location.pathname)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [mouseX, mouseY])

  const gradientX = useTransform(mouseX, [0, typeof window !== "undefined" ? window.innerWidth : 1000], [0, 100])

  return (
    <>
      <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, var(--neon-cyan) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-10 right-1/4 w-64 h-64 rounded-full opacity-15 blur-3xl"
          style={{
            background: "radial-gradient(circle, var(--neon-purple) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
          <motion.nav
            className={`relative rounded-2xl transition-all duration-500 ${
              scrolled
                ? "bg-background/70 backdrop-blur-xl shadow-2xl shadow-primary/5"
                : "bg-background/40 backdrop-blur-md"
            }`}
            layout
          >
            {/* Animated gradient border */}
            <motion.div
              className="absolute -inset-[1px] rounded-2xl opacity-60"
              style={{
                background: `linear-gradient(${gradientX}deg, var(--neon-cyan), var(--neon-purple), var(--neon-green), var(--neon-cyan))`,
                backgroundSize: "300% 300%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />

            {/* Inner container */}
            <div className="relative rounded-2xl bg-background/90 dark:bg-background/80 px-4 py-3">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                  <motion.div className="relative" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    {/* Animated ring */}
                    <motion.div
                      className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary via-purple-500 to-primary opacity-0 group-hover:opacity-100 blur-sm transition-opacity"
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    />
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
                      <motion.span
                        className="text-sm font-bold text-primary-foreground"
                        animate={{
                          textShadow: [
                            "0 0 0px rgba(255,255,255,0)",
                            "0 0 10px rgba(255,255,255,0.5)",
                            "0 0 0px rgba(255,255,255,0)",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      >
                        FC
                      </motion.span>
                    </div>
                    {/* Sparkle effect */}
                    <motion.div
                      className="absolute -top-1 -right-1"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <Sparkles className="h-3 w-3 text-primary" />
                    </motion.div>
                  </motion.div>
                  <div className="flex flex-col">
                    <span className="text-lg font-bold tracking-tight text-foreground">FinChain</span>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Web3 Finance</span>
                  </div>
                </Link>

                <div className="hidden md:flex items-center">
                  <div className="relative flex items-center gap-1 rounded-full bg-secondary/50 p-1">
                    {/* Sliding background indicator */}
                    <AnimatePresence>
                      {hoveredLink && (
                        <motion.div
                          className="absolute h-8 rounded-full bg-primary/10"
                          layoutId="navIndicator"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                    </AnimatePresence>

                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onMouseEnter={() => setHoveredLink(link.href)}
                        onMouseLeave={() => setHoveredLink(null)}
                        onClick={() => setActiveLink(link.href)}
                        className="relative z-10"
                      >
                        <motion.div
                          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            activeLink === link.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="text-[10px] font-mono opacity-50">{link.icon}</span>
                          <span>{link.label}</span>
                          {activeLink === link.href && (
                            <motion.div
                              className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-primary"
                              layoutId="activeIndicator"
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                              }}
                            />
                          )}
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-3">
                  <ThemeToggle />

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link href="/auth">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-full px-4 text-muted-foreground hover:text-foreground"
                      >
                        Log In
                      </Button>
                    </Link>
                  </motion.div>

                  <motion.div className="relative group" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    {/* Glow effect behind button */}
                    <motion.div
                      className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-purple-500 to-primary opacity-0 group-hover:opacity-70 blur-md transition-opacity"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                      style={{ backgroundSize: "200% 200%" }}
                    />
                    <Button
                      size="sm"
                      className="relative rounded-full px-5 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary border-0 shadow-lg shadow-primary/25"
                    >
                      <Wallet className="mr-2 h-4 w-4" />
                      <span>Connect</span>
                      <ChevronRight className="ml-1 h-3 w-3 opacity-70" />
                    </Button>
                  </motion.div>
                </div>

                {/* Mobile menu button */}
                <div className="flex items-center gap-2 md:hidden">
                  <ThemeToggle />
                  <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative p-2 rounded-xl bg-secondary/50"
                    whileTap={{ scale: 0.9 }}
                  >
                    <AnimatePresence mode="wait">
                      {isOpen ? (
                        <motion.div
                          key="close"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <X className="h-5 w-5 text-foreground" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="menu"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Menu className="h-5 w-5 text-foreground" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.nav>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden mx-4 mt-2"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative rounded-2xl overflow-hidden">
                {/* Gradient border */}
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-primary/50 via-purple-500/50 to-primary/50" />

                <div className="relative rounded-2xl bg-background/95 backdrop-blur-xl p-4">
                  <div className="space-y-1">
                    {navLinks.map((link, i) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => {
                            setIsOpen(false)
                            setActiveLink(link.href)
                          }}
                          className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                            activeLink === link.href
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                          }`}
                        >
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-xs font-mono">
                            {link.icon}
                          </span>
                          <span className="font-medium">{link.label}</span>
                          {activeLink === link.href && (
                            <motion.div
                              className="ml-auto h-2 w-2 rounded-full bg-primary"
                              layoutId="mobileActiveIndicator"
                            />
                          )}
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    className="mt-4 pt-4 border-t border-border space-y-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Link href="/auth" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start rounded-xl">
                        Log In
                      </Button>
                    </Link>
                    <Button className="w-full rounded-xl bg-gradient-to-r from-primary to-primary/90">
                      <Wallet className="mr-2 h-4 w-4" />
                      Connect Wallet
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
