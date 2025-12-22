"use client"

import { useEffect, useState, useRef } from "react"
import { useInView } from "react-intersection-observer"

interface CounterProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
  decimals?: number
}

export function Counter({ end, duration = 2, prefix = "", suffix = "", className = "", decimals = 0 }: CounterProps) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true
      const startTime = Date.now()
      const endTime = startTime + duration * 1000

      const animate = () => {
        const now = Date.now()
        const progress = Math.min((now - startTime) / (duration * 1000), 1)

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentValue = end * easeOutQuart

        setCount(currentValue)

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }
  }, [inView, end, duration])

  const displayValue = decimals > 0 ? count.toFixed(decimals) : Math.floor(count)

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  )
}
