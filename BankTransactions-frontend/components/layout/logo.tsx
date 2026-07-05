"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/components/theme-provider"

interface LogoProps {
  className?: string
  showText?: boolean
  size?: "sm" | "md" | "lg"
}

/**
 * DouaneChain logo — a shipping container linked by chain nodes with a
 * verification shield, representing customs + blockchain traceability.
 */
export function Logo({ className = "", showText = true, size = "md" }: LogoProps) {
  const { theme } = useTheme()
  const isDark =
    theme === "dark" ||
    (typeof window !== "undefined" && document.documentElement.classList.contains("dark"))

  const sizeClasses = {
    sm: "h-9 w-auto",
    md: "h-11 w-auto",
    lg: "h-20 w-auto",
  }

  const navy = isDark ? "#E2E8F0" : "#0F2A43"
  const teal = "#14B8A6"
  const taglineColor = isDark ? "#94A3B8" : "#64748B"

  return (
    <motion.div
      className={`flex items-center ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <div className={`${sizeClasses[size]} flex-shrink-0`}>
        <svg
          viewBox={showText ? "0 0 640 160" : "0 0 170 160"}
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="xMinYMid meet"
        >
          <defs>
            <linearGradient id="dcContainer" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#14B8A6" />
              <stop offset="100%" stopColor="#0E7490" />
            </linearGradient>
            <linearGradient id="dcShield" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0F2A43" />
              <stop offset="100%" stopColor="#1E4A6E" />
            </linearGradient>
          </defs>

          {/* Icon */}
          <g transform="translate(10, 22)">
            {/* Shipping container */}
            <rect x="0" y="18" width="112" height="66" rx="8" fill="url(#dcContainer)" />
            {/* Container ribs */}
            <line x1="20" y1="26" x2="20" y2="76" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="4" strokeLinecap="round" />
            <line x1="40" y1="26" x2="40" y2="76" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="4" strokeLinecap="round" />
            <line x1="60" y1="26" x2="60" y2="76" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="4" strokeLinecap="round" />
            <line x1="80" y1="26" x2="80" y2="76" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="4" strokeLinecap="round" />

            {/* Chain links entering / leaving the container */}
            <circle cx="-8" cy="51" r="11" fill="none" stroke={navy} strokeWidth="6" />
            <circle cx="120" cy="51" r="11" fill="none" stroke={navy} strokeWidth="6" opacity="0.85" />

            {/* Block nodes above (blockchain) */}
            <circle cx="24" cy="2" r="5" fill={teal} />
            <circle cx="56" cy="-6" r="5" fill={navy} />
            <circle cx="88" cy="2" r="5" fill={teal} />
            <line x1="29" y1="0.5" x2="51" y2="-4.5" stroke={taglineColor} strokeWidth="2.5" />
            <line x1="61" y1="-4.5" x2="83" y2="0.5" stroke={taglineColor} strokeWidth="2.5" />
            <line x1="24" y1="7" x2="24" y2="18" stroke={taglineColor} strokeWidth="2.5" strokeDasharray="3 3" />
            <line x1="88" y1="7" x2="88" y2="18" stroke={taglineColor} strokeWidth="2.5" strokeDasharray="3 3" />

            {/* Verification shield */}
            <g transform="translate(84, 58)">
              <path
                d="M 26 0 L 52 10 V 30 C 52 48 40 60 26 66 C 12 60 0 48 0 30 V 10 Z"
                fill="url(#dcShield)"
                stroke="#FFFFFF"
                strokeWidth="3"
              />
              <path
                d="M 14 32 L 23 41 L 39 22"
                fill="none"
                stroke={teal}
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </g>

          {/* Wordmark */}
          {showText && (
            <>
              <text
                x="192"
                y="86"
                fontFamily="'Inter', 'Arial', sans-serif"
                fontSize="52"
                fontWeight="800"
                letterSpacing="1"
              >
                <tspan fill={navy}>Douane</tspan>
                <tspan fill={teal}>Chain</tspan>
              </text>
              <line x1="194" y1="103" x2="478" y2="103" stroke={teal} strokeWidth="3" strokeLinecap="round" />
              <text
                x="194"
                y="128"
                fontFamily="'Inter', 'Arial', sans-serif"
                fontSize="17"
                fontWeight="500"
                fill={taglineColor}
                letterSpacing="3.5"
              >
                DIGITAL CUSTOMS PLATFORM
              </text>
            </>
          )}
        </svg>
      </div>
    </motion.div>
  )
}
