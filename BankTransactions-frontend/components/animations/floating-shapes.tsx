"use client"

import { motion } from "framer-motion"

export function FloatingShapes() {
  const shapes = [
    { size: 80, x: "10%", y: "20%", delay: 0, duration: 8 },
    { size: 60, x: "80%", y: "30%", delay: 1, duration: 10 },
    { size: 100, x: "70%", y: "70%", delay: 2, duration: 12 },
    { size: 40, x: "20%", y: "80%", delay: 0.5, duration: 9 },
    { size: 50, x: "90%", y: "10%", delay: 1.5, duration: 11 },
    { size: 70, x: "5%", y: "50%", delay: 2.5, duration: 10 },
  ]

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-primary/10 bg-primary/5"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Hexagon shapes */}
      {[
        { x: "30%", y: "15%", size: 60, delay: 0 },
        { x: "60%", y: "85%", size: 80, delay: 1.5 },
      ].map((hex, i) => (
        <motion.div
          key={`hex-${i}`}
          className="absolute"
          style={{ left: hex.x, top: hex.y }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 60, 0],
          }}
          transition={{
            duration: 8,
            delay: hex.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <svg width={hex.size} height={hex.size} viewBox="0 0 100 100">
            <polygon
              points="50 1, 95 25, 95 75, 50 99, 5 75, 5 25"
              fill="none"
              stroke="rgba(34, 211, 238, 0.1)"
              strokeWidth="1"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}
