"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { ChevronLeft, ChevronRight, Flame, Zap, Sword, Shield, Dumbbell, Clock, Calendar } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TrainingSession {
  id: string
  title: string
  time: string
  anime: string
  quote: string
  intensity: string
  image: string
  bg: string
  icon: JSX.Element
}

export function AnimeTrainingSchedule({ onButtonClick }: { onButtonClick: () => void }) {
  const [currentSession, setCurrentSession] = useState(0)
  const controls = useAnimation()
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const sessions: TrainingSession[] = [
    {
      id: "s1",
      title: "Shonen Sunrise Run",
      time: "06:00 AM",
      anime: "Naruto",
      quote: "Wake up early and run like Rock Lee!",
      intensity: "High",
      image: "/e1.png",
      bg: "bg-gradient-to-br from-orange-500 to-yellow-400",
      icon: <Flame className="h-5 w-5" />
    },
    {
      id: "s2",
      title: "Gravity Chamber",
      time: "12:30 PM",
      anime: "Dragon Ball Z",
      quote: "Push beyond your limits like Goku!",
      intensity: "Extreme",
      image: "/e2.png",
      bg: "bg-gradient-to-br from-blue-600 to-purple-700",
      icon: <Zap className="h-5 w-5" />
    },
    {
      id: "s3",
      title: "Odm Gear Core",
      time: "07:00 PM",
      anime: "Attack on Titan",
      quote: "Strengthen your core like Levi!",
      intensity: "Medium",
      image: "/e3.png",
      bg: "bg-gradient-to-br from-gray-800 to-blue-900",
      icon: <Sword className="h-5 w-5" />
    },
    {
      id: "s4",
      title: "Heroic Weightlifting",
      time: "05:30 PM",
      anime: "My Hero Academia",
      quote: "Build strength like All Might!",
      intensity: "High",
      image: "/e4.png",
      bg: "bg-gradient-to-br from-red-500 to-yellow-500",
      icon: <Dumbbell className="h-5 w-5" />
    },
    {
      id: "s5",
      title: "Saitama Routine",
      time: "08:00 AM",
      anime: "One Punch Man",
      quote: "100 push-ups, 100 sit-ups, 100 squats!",
      intensity: "Legendary",
      image: "/e5.png",
      bg: "bg-gradient-to-br from-yellow-400 to-red-500",
      icon: <Shield className="h-5 w-5" />
    }
  ]

  // Auto-rotate sessions every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSession()
    }, 7000)
    return () => clearInterval(interval)
  }, [currentSession])

  const nextSession = () => {
    controls.start("exit")
    setTimeout(() => {
      setCurrentSession((prev) => (prev + 1) % sessions.length)
      controls.start("enter")
      onButtonClick()
    }, 300)
  }

  const prevSession = () => {
    controls.start("exit")
    setTimeout(() => {
      setCurrentSession((prev) => (prev - 1 + sessions.length) % sessions.length)
      controls.start("enter")
      onButtonClick()
    }, 300)
  }

  // Handle mouse movement for cyber glow effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setGlowPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  // Intensity badge animation
  const intensityAnimation = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: [1, 1.1, 1],
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }

  return (
    <Card className="overflow-hidden border border-purple-500/20 bg-black/40 backdrop-blur-md">
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <motion.h3 
            className="flex items-center text-lg font-bold text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.span
              animate={{ 
                rotate: [0, 15, -15, 0],
                transition: { duration: 0.7, repeat: Infinity, repeatDelay: 4 }
              }}
            >
              <Calendar className="mr-2 h-5 w-5 text-purple-400" />
            </motion.span>
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
             TRAINING SCHEDULE
            </span>
          </motion.h3>
          <div className="flex space-x-2">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-purple-300 hover:bg-purple-950/50 hover:text-purple-200"
                onClick={prevSession}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-purple-300 hover:bg-purple-950/50 hover:text-purple-200"
                onClick={nextSession}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>

        <div 
          className="relative h-[400px] overflow-hidden rounded-lg border border-purple-500/20"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Cyber grid background */}
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={`h-${i}`} className="absolute top-0 left-0 right-0 h-px bg-purple-500" style={{ top: `${i * 7}%` }} />
            ))}
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={`v-${i}`} className="absolute top-0 left-0 bottom-0 w-px bg-purple-500" style={{ left: `${i * 7}%` }} />
            ))}
          </div>

          {/* Floating energy particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full bg-purple-500/30"
              initial={{
                x: Math.random() * 300,
                y: Math.random() * 400,
                width: Math.random() * 4 + 2,
                height: Math.random() * 4 + 2
              }}
              animate={{
                y: [0, -100, -200, -300, -400, 0],
                x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
                transition: {
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  repeatType: "loop"
                }
              }}
            />
          ))}

          {/* Dynamic cyber glow */}
          {isHovered && (
            <motion.div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(300px at ${glowPosition.x}px ${glowPosition.y}px, rgba(139, 92, 246, 0.2), transparent 80%)`
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                transition: { duration: 3, repeat: Infinity }
              }}
            />
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={sessions[currentSession].id}
              initial="exit"
              animate="enter"
              exit="exit"
              variants={{
                enter: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -50 }
              }}
              transition={{ duration: 0.5 }}
              className={`relative h-full w-full ${sessions[currentSession].bg}`}
            >
              {/* Anime training image */}
              <motion.div
                className="absolute inset-0 bg-black/40"
                style={{
                  backgroundImage: `url(${sessions[currentSession].image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
                animate={{
                  scale: isHovered ? 1.05 : 1,
                  transition: { duration: 0.5 }
                }}
              />

              {/* Digital noise overlay */}
              <div className="absolute inset-0 bg-[url('/digital-noise.png')] opacity-5 mix-blend-overlay pointer-events-none" />

              {/* Content overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <motion.div
                  className="mb-2 flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="mr-2 h-6 w-1 bg-cyan-400"></div>
                  <h4 className="text-2xl font-bold text-white drop-shadow-lg">
                    {sessions[currentSession].title}
                  </h4>
                </motion.div>

                <motion.div
                  className="mb-3 flex items-center space-x-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="flex items-center rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                    <Clock className="h-3 w-3 mr-1" />
                    {sessions[currentSession].time}
                  </span>
                  <motion.span
                    className="flex items-center rounded-full bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-300"
                    variants={intensityAnimation}
                    initial="initial"
                    animate="animate"
                  >
                    {sessions[currentSession].icon}
                    <span className="ml-1">{sessions[currentSession].intensity}</span>
                  </motion.span>
                </motion.div>

                <motion.p
                  className="text-sm text-purple-200 mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Anime: <span className="text-cyan-300">{sessions[currentSession].anime}</span>
                </motion.p>

                <motion.p
                  className="text-lg italic text-white drop-shadow-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  "{sessions[currentSession].quote}"
                </motion.p>

                {/* Hover effect - digital scan lines */}
                {isHovered && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={`scanline-${i}`}
                        className="absolute left-0 right-0 h-px bg-white/10"
                        initial={{ y: Math.random() * 400 }}
                        animate={{
                          y: [0, 400],
                          opacity: [0.5, 0],
                          transition: {
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.05
                          }
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Indicator dots */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center p-4">
            <div className="flex space-x-2">
              {sessions.map((_, index) => (
                <motion.button
                  key={index}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all duration-300",
                    index === currentSession ? "bg-cyan-400" : "bg-white/30"
                  )}
                  onClick={() => {
                    setCurrentSession(index)
                    onButtonClick()
                  }}
                  whileHover={{ scale: 1.5 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}