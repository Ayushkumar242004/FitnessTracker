"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useTransform, useMotionValue, useSpring } from "framer-motion"
import { Trophy, Award, Star, Zap, Flame, Shield, Sword, Medal, CheckCircle,ChevronLeft,ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Achievement {
  id: string
  title: string
  description: string
  unlocked: boolean
  xp: number
  rarity: "common" | "rare" | "epic" | "legendary"
  icon: JSX.Element
  animation?: string
}

export function AchievementHall() {
  const [activeCategory, setActiveCategory] = useState<"all" | "unlocked" | "locked">("all")
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "carousel">("grid")


  // 3D tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 10, damping: 30 })
  const springY = useSpring(y, { stiffness: 50, damping: 30 })
  
  // Reduced rotation from ±10° to ±6°
  const rotateX = useTransform(springY, [-100, 100], [6, -6])
  const rotateY = useTransform(springX, [-100, 100], [-6, 6])
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  
  // Achievement data
  const achievements: Achievement[] = [
    {
      id: "a1",
      title: "First Steps",
      description: "Complete your first workout",
      unlocked: true,
      xp: 100,
      rarity: "common",
      icon: <CheckCircle className="h-6 w-6" />,
      animation: "trophy-spin"
    },
    {
      id: "a2",
      title: "Shonen Spirit",
      description: "Train 5 days in a row",
      unlocked: true,
      xp: 250,
      rarity: "rare",
      icon: <Flame className="h-6 w-6" />,
      animation: "fire-pulse"
    },
    {
      id: "a3",
      title: "Plus Ultra!",
      description: "Push beyond your limits in 10 workouts",
      unlocked: false,
      xp: 500,
      rarity: "epic",
      icon: <Zap className="h-6 w-6" />,
      animation: "lightning-strike"
    },
    {
      id: "a4",
      title: "Dragon Warrior",
      description: "Complete 100 strength exercises",
      unlocked: false,
      xp: 750,
      rarity: "epic",
      icon: <Sword className="h-6 w-6" />,
      animation: "sword-slash"
    },
    {
      id: "a5",
      title: "Cyber Athlete",
      description: "Reach level 10",
      unlocked: true,
      xp: 1000,
      rarity: "rare",
      icon: <Shield className="h-6 w-6" />,
      animation: "shield-glow"
    },
    {
      id: "a6",
      title: "Legendary Hero",
      description: "Unlock all achievements",
      unlocked: false,
      xp: 5000,
      rarity: "legendary",
      icon: <Trophy className="h-6 w-6" />,
      animation: "golden-glow"
    },
    {
      id: "a7",
      title: "Speed Demon",
      description: "Complete a workout in record time",
      unlocked: false,
      xp: 300,
      rarity: "rare",
      icon: <Zap className="h-6 w-6" />,
      animation: "speed-lines"
    },
    {
      id: "a8",
      title: "Iron Will",
      description: "Train for 30 consecutive days",
      unlocked: false,
      xp: 2000,
      rarity: "legendary",
      icon: <Medal className="h-6 w-6" />,
      animation: "medal-spin"
    }
  ]

  // Filter achievements based on active category
  const filteredAchievements = achievements.filter(achievement => {
    if (activeCategory === "all") return true
    if (activeCategory === "unlocked") return achievement.unlocked
    return !achievement.unlocked
  })

  // Rarity colors
  const rarityColors = {
    common: "bg-gray-500/20 text-gray-300",
    rare: "bg-blue-500/20 text-blue-400",
    epic: "bg-purple-500/20 text-purple-400",
    legendary: "bg-yellow-500/20 text-yellow-400"
  }

  // Rarity border colors
  const rarityBorderColors = {
    common: "border-gray-500",
    rare: "border-blue-500",
    epic: "border-purple-500",
    legendary: "border-yellow-500"
  }

  // Auto-rotate carousel
  useEffect(() => {
    if (viewMode !== "carousel") return
    
    const interval = setInterval(() => {
      const currentIndex = filteredAchievements.findIndex(a => a.id === selectedAchievement?.id)
      const nextIndex = (currentIndex + 1) % filteredAchievements.length
      setSelectedAchievement(filteredAchievements[nextIndex])
    }, 5000)
    
    return () => clearInterval(interval)
  }, [viewMode, selectedAchievement, filteredAchievements])

  return (
    <motion.div
      className="w-full px-4 lg:px-6 py-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="w-full"
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1000
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Card className="overflow-hidden border border-purple-500/20 bg-black/40 backdrop-blur-xl">
          {/* Header */}
          <div className="p-6 border-b border-purple-500/20 relative">
            {/* Floating trophies in background */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`trophy-bg-${i}`}
                  className="absolute text-yellow-400"
                  initial={{
                    x: Math.random() * 1200,
                    y: Math.random() * 400,
                    rotate: Math.random() * 360,
                    scale: Math.random() * 0.5 + 0.5
                  }}
                  animate={{
                    y: [0, -100, -200, -300, 0],
                    rotate: [0, 180, 360],
                    transition: {
                      duration: Math.random() * 10 + 10,
                      repeat: Infinity,
                      ease: "linear"
                    }
                  }}
                >
                  <Trophy className="h-12 w-12" />
                </motion.div>
              ))}
            </div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <motion.h2 
                  className="text-2xl font-bold text-white mb-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-purple-500 bg-clip-text text-transparent">
                    ACHIEVEMENT HALL
                  </span>
                </motion.h2>
                <motion.p 
                  className="text-purple-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Earn rewards and showcase your progress
                </motion.p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  className={cn(
                    "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
                    viewMode !== "grid" && "bg-transparent"
                  )}
                  onClick={() => setViewMode("grid")}
                >
                  Grid View
                </Button>
                <Button
                  variant={viewMode === "carousel" ? "default" : "ghost"}
                  className={cn(
                    "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700",
                    viewMode !== "carousel" && "bg-transparent"
                  )}
                  onClick={() => {
                    setViewMode("carousel")
                    setSelectedAchievement(filteredAchievements[0])
                  }}
                >
                  Showcase View
                </Button>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="p-4 border-b border-purple-500/20">
            <div className="flex overflow-x-auto pb-2 gap-2">
              {["all", "unlocked", "locked"].map((category) => (
                <motion.button
                  key={category}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap",
                    activeCategory === category 
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      : "bg-purple-900/30 text-purple-300 hover:bg-purple-900/50"
                  )}
                  onClick={() => setActiveCategory(category as any)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                  {category === "unlocked" && (
                    <span className="ml-1 bg-yellow-500 text-yellow-900 text-xs px-1.5 py-0.5 rounded-full">
                      {achievements.filter(a => a.unlocked).length}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredAchievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -5 }}
                    className={cn(
                      "relative overflow-hidden rounded-lg border p-4 transition-all",
                      rarityBorderColors[achievement.rarity],
                      achievement.unlocked ? "bg-gradient-to-br from-black/50 to-purple-900/20" : "bg-black/30"
                    )}
                    onClick={() => setSelectedAchievement(achievement)}
                  >
                    {/* Rarity glow */}
                    <div className={cn(
                      "absolute -inset-1 opacity-20 blur-md transition-opacity",
                      achievement.unlocked ? rarityColors[achievement.rarity] : "bg-gray-900",
                      "hover:opacity-40"
                    )} />

                    {/* Achievement content */}
                    <div className="relative z-10">
                      <div className="flex items-start gap-3">
                        <motion.div
                          className={cn(
                            "flex items-center justify-center h-12 w-12 rounded-full",
                            rarityColors[achievement.rarity],
                            !achievement.unlocked && "grayscale opacity-70"
                          )}
                          animate={{
                            rotate: achievement.unlocked ? [0, 10, -10, 0] : 0,
                            transition: {
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 3
                            }
                          }}
                        >
                          {achievement.icon}
                        </motion.div>
                        <div>
                          <h3 className={cn(
                            "font-bold",
                            achievement.unlocked ? "text-white" : "text-gray-400"
                          )}>
                            {achievement.title}
                          </h3>
                          <p className="text-sm text-purple-300 mt-1">
                            {achievement.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded-full",
                          rarityColors[achievement.rarity]
                        )}>
                          {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold text-yellow-400">
                            +{achievement.xp} XP
                          </span>
                          <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                        </div>
                      </div>
                    </div>

                    {/* Lock overlay for locked achievements */}
                    {!achievement.unlocked && (
                      <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                        <div className="text-center p-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-8 w-8 mx-auto text-purple-400 mb-2"
                          >
                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                          <p className="text-sm text-purple-300">
                            Complete requirements to unlock
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="relative h-96 w-full rounded-lg overflow-hidden">
                {/* Carousel view */}
                <AnimatePresence mode="wait">
                  {selectedAchievement && (
                    <motion.div
                      key={selectedAchievement.id}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                      className={cn(
                        "absolute inset-0 flex flex-col items-center justify-center p-8 text-center rounded-lg",
                        rarityColors[selectedAchievement.rarity]
                      )}
                    >
                      {/* Achievement card */}
                      <div className="relative z-10 max-w-2xl">
                        {/* Floating icon with animation */}
                        <motion.div
                          className={cn(
                            "mx-auto mb-6 flex items-center justify-center h-20 w-20 rounded-full",
                            selectedAchievement.unlocked 
                              ? "bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg"
                              : "bg-gray-700/50"
                          )}
                          animate={{
                            y: [0, -10, 0],
                            rotate: selectedAchievement.unlocked ? [0, 360] : 0,
                            scale: [1, 1.1, 1],
                            transition: {
                              duration: selectedAchievement.unlocked ? 2 : 3,
                              repeat: Infinity,
                              repeatType: "reverse"
                            }
                          }}
                        >
                          {selectedAchievement.icon}
                        </motion.div>

                        <motion.h3 
                          className="text-3xl font-bold text-white mb-2"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          {selectedAchievement.title}
                        </motion.h3>

                        <motion.p
                          className="text-lg text-purple-100 mb-6"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          {selectedAchievement.description}
                        </motion.p>

                        <div className="flex justify-center gap-4">
                          <motion.div
                            className={cn(
                              "px-4 py-1 rounded-full text-sm font-bold",
                              rarityColors[selectedAchievement.rarity]
                            )}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                          >
                            {selectedAchievement.rarity.charAt(0).toUpperCase() + selectedAchievement.rarity.slice(1)}
                          </motion.div>
                          <motion.div
                            className="flex items-center bg-yellow-500/20 text-yellow-400 px-4 py-1 rounded-full text-sm font-bold"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            +{selectedAchievement.xp} XP
                            <Star className="h-4 w-4 ml-1 fill-yellow-400" />
                          </motion.div>
                        </div>

                        {!selectedAchievement.unlocked && (
                          <motion.div
                            className="mt-6 bg-black/50 p-4 rounded-lg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                          >
                            <p className="text-purple-300">
                              Complete requirements to unlock this achievement
                            </p>
                          </motion.div>
                        )}
                      </div>

                      {/* Background particles */}
                      {selectedAchievement.unlocked && (
                        <>
                          <motion.div
                            className="absolute top-1/4 left-1/4 h-2 w-2 rounded-full bg-yellow-400/50"
                            animate={{
                              y: [0, -50, 0],
                              x: [0, -20, 0],
                              opacity: [0.5, 1, 0.5],
                              transition: {
                                duration: 3,
                                repeat: Infinity
                              }
                            }}
                          />
                          <motion.div
                            className="absolute top-1/3 right-1/4 h-3 w-3 rounded-full bg-purple-400/50"
                            animate={{
                              y: [0, -30, 0],
                              x: [0, 20, 0],
                              opacity: [0.5, 1, 0.5],
                              transition: {
                                duration: 4,
                                repeat: Infinity,
                                delay: 1
                              }
                            }}
                          />
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Carousel controls */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {filteredAchievements.map((achievement, index) => (
                    <button
                      key={achievement.id}
                      className={cn(
                        "h-2 w-2 rounded-full transition-all",
                        selectedAchievement?.id === achievement.id 
                          ? "bg-white w-6" 
                          : "bg-white/30"
                      )}
                      onClick={() => setSelectedAchievement(achievement)}
                    />
                  ))}
                </div>

                {/* Navigation arrows */}
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-purple-600/50 transition-all"
                  onClick={() => {
                    const currentIndex = filteredAchievements.findIndex(a => a.id === selectedAchievement?.id)
                    const prevIndex = (currentIndex - 1 + filteredAchievements.length) % filteredAchievements.length
                    setSelectedAchievement(filteredAchievements[prevIndex])
                  }}
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-purple-600/50 transition-all"
                  onClick={() => {
                    const currentIndex = filteredAchievements.findIndex(a => a.id === selectedAchievement?.id)
                    const nextIndex = (currentIndex + 1) % filteredAchievements.length
                    setSelectedAchievement(filteredAchievements[nextIndex])
                  }}
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            )}
          </div>

          {/* Stats footer */}
          <div className="p-4 border-t border-purple-500/20 bg-black/20">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-400" />
                <span className="text-sm text-purple-300">
                  <span className="text-white font-bold">
                    {achievements.filter(a => a.unlocked).length}
                  </span> of {achievements.length} achievements unlocked
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span className="text-sm text-purple-300">
                  <span className="text-white font-bold">
                    {achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.xp, 0)}
                  </span> XP earned
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-purple-400"
                >
                  <path d="m7.5 4.27 9 5.15" />
                  <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                  <path d="m3.3 7 8.7 5 8.7-5" />
                  <path d="M12 22V12" />
                </svg>
                <span className="text-sm text-purple-300">
                  <span className="text-white font-bold">
                    {achievements.filter(a => a.rarity === "legendary" && a.unlocked).length}
                  </span> legendary achievements
                </span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}