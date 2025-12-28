"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/components/theme-provider"

interface LogoProps {
  className?: string
  showText?: boolean
  size?: "sm" | "md" | "lg"
}

export function Logo({ className = "", showText = true, size = "md" }: LogoProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark" || (typeof window !== "undefined" && document.documentElement.classList.contains("dark"))
  
  const sizeClasses = {
    sm: "h-16 w-auto",
    md: "h-20 w-auto",
    lg: "h-32 w-auto"
  }
  
  const textColor = isDark ? "#FFFFFF" : "#000000"
  const subtitleColor = isDark ? "#FFFFFF" : "#000000"
  const taglineColor = isDark ? "#FFFFFF" : "#999"

  return (
    <motion.div 
      className={`flex items-center ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className={`${sizeClasses[size]} flex-shrink-0`}>
        <svg 
          viewBox="0 0 800 200" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Gradient for the anvil/forge */}
            <linearGradient id="forgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00D9C0" stopOpacity="1" />
              <stop offset="100%" stopColor="#1A1F3A" stopOpacity="1" />
            </linearGradient>
            
            {/* Glow effect */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Logo Icon: Stylized Anvil/Forge with Hammer (LARGER) */}
          <g transform="translate(80, 50)">
            
            {/* Anvil Base */}
            <path 
              d="M 10 70 L 90 70 L 84 90 L 16 90 Z" 
              fill="url(#forgeGradient)" 
              opacity="0.9"
            />
            
            {/* Anvil Top (forging surface) */}
            <path 
              d="M 0 50 L 100 50 L 96 70 L 4 70 Z" 
              fill="#1A1F3A"
            />
            
            {/* Anvil Horn (left side) */}
            <path 
              d="M 0 30 L 30 30 L 24 50 L 0 50 Z" 
              fill="#00D9C0"
            />
            
            {/* Hammer (striking down) */}
            <g transform="translate(50, 0)">
              {/* Hammer Handle */}
              <rect 
                x="0" 
                y="0" 
                width="8" 
                height="40" 
                fill="#00D9C0" 
                rx="4"
              />
              
              {/* Hammer Head */}
              <rect 
                x="-10" 
                y="0" 
                width="28" 
                height="16" 
                fill="url(#forgeGradient)" 
                rx="4"
              />
              
              {/* Spark Effect (animated) */}
              <circle cx="4" cy="40" r="4" fill="#00D9C0" opacity="0.8" filter="url(#glow)">
                <animate 
                  attributeName="opacity" 
                  values="0.3;1;0.3" 
                  dur="1.5s" 
                  repeatCount="indefinite"
                />
                <animate 
                  attributeName="r" 
                  values="3;5;3" 
                  dur="1.5s" 
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="-6" cy="44" r="3" fill="#00D9C0" opacity="0.6">
                <animate 
                  attributeName="opacity" 
                  values="0.2;0.8;0.2" 
                  dur="1.5s" 
                  begin="0.3s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="14" cy="44" r="3" fill="#00D9C0" opacity="0.6">
                <animate 
                  attributeName="opacity" 
                  values="0.2;0.8;0.2" 
                  dur="1.5s" 
                  begin="0.6s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="-10" cy="48" r="2" fill="#FF6B35" opacity="0.5">
                <animate 
                  attributeName="opacity" 
                  values="0.3;0.7;0.3" 
                  dur="1.5s" 
                  begin="0.9s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="18" cy="48" r="2" fill="#FF6B35" opacity="0.5">
                <animate 
                  attributeName="opacity" 
                  values="0.3;0.7;0.3" 
                  dur="1.5s" 
                  begin="1.2s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
            
            {/* Chain Links (connecting traditional to blockchain) */}
            <circle 
              cx="-16" 
              cy="56" 
              r="8" 
              fill="none" 
              stroke="#00D9C0" 
              strokeWidth="3"
            />
            <circle 
              cx="116" 
              cy="56" 
              r="8" 
              fill="none" 
              stroke="#1A1F3A" 
              strokeWidth="3"
            />
          </g>
          
          {/* Brand Name: FORGE (MUCH LARGER) */}
          {showText && (
            <text 
              x="240" 
              y="95" 
              fontFamily="'Arial Black', 'Helvetica', sans-serif" 
              fontSize="80" 
              fontWeight="900" 
              fill={textColor}
              letterSpacing="4"
            >
              FORGE
            </text>
          )}
          
          {/* Subtitle: FINANCE */}
          {showText && (
            <text 
              x="240" 
              y="140" 
              fontFamily="'Arial', sans-serif" 
              fontSize="32" 
              fontWeight="300" 
              fill={subtitleColor}
              letterSpacing="10"
            >
              FINANCE
            </text>
          )}
          
          {/* Decorative Line */}
          {showText && (
            <line 
              x1="240" 
              y1="155" 
              x2="620" 
              y2="155" 
              stroke="#00D9C0" 
              strokeWidth="3"
              strokeLinecap="round"
            />
          )}
          
          {/* Tagline */}
          {showText && (
            <text 
              x="240" 
              y="180" 
              fontFamily="'Arial', sans-serif" 
              fontSize="16" 
              fill={taglineColor}
              letterSpacing="2"
            >
              FORGING THE FUTURE OF FINANCE
            </text>
          )}
        </svg>
      </div>
    </motion.div>
  )
}

