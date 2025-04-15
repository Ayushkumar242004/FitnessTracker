"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import { motion } from "framer-motion"

export function TimeTracker() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (date: Date) => {
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const ampm = hours >= 12 ? "PM" : "AM"
    const formattedHours = hours % 12 || 12
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

    return `${formattedHours}:${formattedMinutes} ${ampm}`
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center space-x-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1.5"
    >
      <Clock className="h-4 w-4 text-white" />
      <span className="text-xs font-medium text-white">{formatTime(time)}</span>
    </motion.div>
  )
}
