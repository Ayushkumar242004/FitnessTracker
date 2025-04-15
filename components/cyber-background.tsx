"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface CyberBackgroundProps {
  theme: "neon-city" | "digital-dojo" | "cyber-gym"
}

export function CyberBackground({ theme }: CyberBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Theme-based configuration
    const themeConfig = {
      "neon-city": {
        bgColor: "#0f0a1e",
        gridColor: "#6b21a8",
        particleColors: ["#8b5cf6", "#ec4899", "#06b6d4"],
        lineCount: 15,
      },
      "digital-dojo": {
        bgColor: "#0c1e1a",
        gridColor: "#047857",
        particleColors: ["#10b981", "#3b82f6", "#f59e0b"],
        lineCount: 12,
      },
      "cyber-gym": {
        bgColor: "#18181b",
        gridColor: "#9333ea",
        particleColors: ["#f43f5e", "#3b82f6", "#22d3ee"],
        lineCount: 18,
      },
    }

    const config = themeConfig[theme]

    // Particles
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
        this.color = config.particleColors[Math.floor(Math.random() * config.particleColors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()

        // Add glow effect
        ctx.shadowBlur = 15
        ctx.shadowColor = this.color
      }
    }

    // Create particles
    const particles: Particle[] = []
    const particleCount = 50

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Draw grid
    const drawGrid = () => {
      const gridSize = 50
      const lineWidth = 0.5

      ctx.strokeStyle = config.gridColor
      ctx.lineWidth = lineWidth
      ctx.globalAlpha = 0.3

      // Horizontal lines
      for (let i = 0; i < config.lineCount; i++) {
        const y = (canvas.height / config.lineCount) * i

        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Vertical lines
      for (let i = 0; i < config.lineCount; i++) {
        const x = (canvas.width / config.lineCount) * i

        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      ctx.globalAlpha = 1
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background
      ctx.fillStyle = config.bgColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid
      drawGrid()

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [theme])

  return (
    <div className="fixed inset-0 z-0">
      <canvas ref={canvasRef} className="h-full w-full" />

      {/* Additional visual elements based on theme */}
      {theme === "neon-city" && (
        <>
          <motion.div
            className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-purple-600 opacity-10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-pink-600 opacity-10 blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </>
      )}

      {theme === "digital-dojo" && (
        <>
          <motion.div
            className="absolute left-1/3 top-1/3 h-72 w-72 rounded-full bg-emerald-600 opacity-10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/3 h-64 w-64 rounded-full bg-blue-600 opacity-10 blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 9,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </>
      )}

      {theme === "cyber-gym" && (
        <>
          <motion.div
            className="absolute left-1/4 bottom-1/4 h-80 w-80 rounded-full bg-red-600 opacity-10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 7,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute right-1/4 top-1/4 h-72 w-72 rounded-full bg-cyan-600 opacity-10 blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </>
      )}
    </div>
  )
}
