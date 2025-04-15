"use client"

import { useState, useEffect } from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { Activity, Award, BarChart2, Calendar, Dumbbell, Flame, Home, Menu, Settings, User, X } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"

interface CyberSidebarProps {
  onButtonClick: () => void
}

export function CyberSidebar({ onButtonClick }: CyberSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number }>>([])

  const menuItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: Activity, label: "Workouts", active: false },
    { icon: Flame, label: "Challenges", active: false },
    { icon: BarChart2, label: "Progress", active: false },
    { icon: Award, label: "Achievements", active: false },
    { icon: Calendar, label: "Schedule", active: false },
   
  ]

  // Floating particles effect
  useEffect(() => {
    if (!isOpen) return
    
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 200,
      y: Math.random() * 600,
      size: Math.random() * 3 + 1
    }))
    setParticles(newParticles)

    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(p => ({
          ...p,
          y: (p.y + 0.5) % 600,
          x: p.x + (Math.random() - 0.5) * 0.5
        }))
      )
    }, 50)

    return () => clearInterval(interval)
  }, [isOpen])

  // 3D tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const rotateX = useTransform(y, [-100, 100], [5, -5])
  const rotateY = useTransform(x, [-100, 100], [-5, 5])

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    x.set(event.clientX - rect.left - rect.width / 2)
    y.set(event.clientY - rect.top - rect.height / 2)
    
    // Update glow position for the cyber effect
    setGlowPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    })
  }

  function handleMouseLeave() {
    animate(x, 0, { duration: 0.5 })
    animate(y, 0, { duration: 0.5 })
  }

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(!isOpen)
          onButtonClick()
        }}
        className="fixed top-4 left-4 z-50 p-2 rounded-full bg-purple-900/50 backdrop-blur-md border border-purple-500/30 text-purple-300 hover:text-purple-100 transition-all duration-300 hover:bg-purple-800/60 hover:border-purple-400/50 md:hidden"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <SidebarProvider>
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out md:translate-x-0",
            isOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformPerspective: 1000
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="h-full"
          >
            <Sidebar className="border-r border-purple-500/20 bg-black/80 backdrop-blur-xl overflow-hidden">
              {/* Cyber grid background */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="absolute top-0 bottom-0 w-px bg-purple-500" style={{ left: `${i * 5}%` }} />
                ))}
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="absolute left-0 right-0 h-px bg-purple-500" style={{ top: `${i * 5}%` }} />
                ))}
              </div>
              
              {/* Floating particles */}
              {particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute rounded-full bg-purple-500/30 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ 
                    duration: Math.random() * 5 + 5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  style={{
                    left: particle.x,
                    top: particle.y,
                    width: particle.size,
                    height: particle.size
                  }}
                />
              ))}
              
              {/* Dynamic glow effect */}
              <motion.div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(300px at ${glowPosition.x}px ${glowPosition.y}px, rgba(168, 85, 247, 0.15), transparent 80%)`
                }}
                animate={{
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />

              <SidebarHeader className="p-4 relative z-10">
                <div className="flex items-center space-x-2">
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 rounded-full bg-purple-500 blur-md opacity-70"></div>
                    <Dumbbell className="relative h-8 w-8 text-white" />
                  </motion.div>
                  <div>
                    <motion.h1 
                      className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent"
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%']
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      CYBER<span className="text-white">FIT</span>
                    </motion.h1>
                    <motion.p 
                      className="text-xs text-purple-300"
                      animate={{
                        textShadow: [
                          '0 0 5px rgba(192, 132, 252, 0)',
                          '0 0 10px rgba(192, 132, 252, 0.5)',
                          '0 0 5px rgba(192, 132, 252, 0)'
                        ]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity
                      }}
                    >
                      NEXT LEVEL FITNESS
                    </motion.p>
                  </div>
                </div>
              </SidebarHeader>

              <SidebarContent className="relative z-10">
                <SidebarMenu>
                  {menuItems.map((item, index) => (
                    <SidebarMenuItem key={item.label}>
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="w-full"
                        onHoverStart={() => setHoveredIndex(index)}
                        onHoverEnd={() => setHoveredIndex(null)}
                      >
                        <SidebarMenuButton
                          isActive={item.active}
                          onClick={onButtonClick}
                          className={cn(
                            "group relative w-full overflow-hidden",
                            "before:absolute before:inset-0 before:w-0 before:bg-gradient-to-r before:from-purple-600/20 before:to-pink-600/20 before:transition-all before:duration-500 hover:before:w-full",
                            "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-purple-500 after:to-pink-500 after:transition-all after:duration-500 hover:after:w-full",
                            item.active && "bg-gradient-to-r from-purple-900/40 to-pink-900/40 text-white after:w-full",
                          )}
                        >
                          <motion.div
                            animate={{
                              scale: hoveredIndex === index ? [1, 1.2, 1] : 1,
                              rotate: hoveredIndex === index ? [0, 10, -10, 0] : 0
                            }}
                            transition={{ duration: 0.5 }}
                          >
                            <item.icon
                              className={cn(
                                "mr-2 h-5 w-5 transition-all duration-300",
                                item.active ? "text-purple-300" : "text-purple-400 group-hover:text-purple-300",
                              )}
                            />
                          </motion.div>
                          <span>{item.label}</span>
                          {item.active && (
                            <motion.div 
                              className="absolute right-2 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-purple-400"
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.8, 1, 0.8]
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity
                              }}
                            />
                          )}
                          {hoveredIndex === index && !item.active && (
                            <motion.span 
                              className="absolute left-0 top-0 h-full w-[2px] bg-purple-500"
                              initial={{ scaleY: 0 }}
                              animate={{ scaleY: 1 }}
                              exit={{ scaleY: 0 }}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </SidebarMenuButton>
                      </motion.div>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarContent>

              <SidebarFooter className="p-4 relative z-10">
                <motion.div 
                  className="rounded-lg border border-purple-500/20 bg-purple-900/20 p-3"
                  whileHover={{ 
                    y: -2,
                    boxShadow: '0 10px 25px -5px rgba(168, 85, 247, 0.1)'
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-purple-500"
                      animate={{
                        rotate: 360
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600"></div>
                      <User className="absolute inset-0 m-auto h-6 w-6 text-white" />
                    </motion.div>
                    <div>
                      <p className="text-sm font-medium text-white">CyberRunner42</p>
                      <motion.p 
                        className="text-xs text-purple-300"
                        animate={{
                          x: [0, -2, 2, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity
                        }}
                      >
                        Level 24 • Elite
                      </motion.p>
                    </div>
                  </div>
                  <motion.div 
                    className="mt-2 h-1 w-full bg-purple-900/50 rounded-full overflow-hidden"
                    initial={{ scaleX: 0, transformOrigin: 'left' }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                  >
                    <motion.div 
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '65%' }}
                      transition={{ delay: 1, duration: 1 }}
                    />
                  </motion.div>
                </motion.div>
              </SidebarFooter>
            </Sidebar>
          </motion.div>
        </div>
      </SidebarProvider>
    </>
  )
}