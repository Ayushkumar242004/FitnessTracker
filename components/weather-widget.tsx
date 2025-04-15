"use client"

import { useState, useEffect } from "react"
import { Cloud, CloudRain, Sun, Thermometer } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function WeatherWidget() {
  const [weather, setWeather] = useState<"sunny" | "cloudy" | "rainy">("sunny")
  const [temperature, setTemperature] = useState(72)

  useEffect(() => {
    // Simulate weather changes
    const interval = setInterval(() => {
      const weathers: Array<"sunny" | "cloudy" | "rainy"> = ["sunny", "cloudy", "rainy"]
      const randomWeather = weathers[Math.floor(Math.random() * weathers.length)]
      const randomTemp = Math.floor(Math.random() * 30) + 60 // 60-90°F

      setWeather(randomWeather)
      setTemperature(randomTemp)
    }, 30000) // Change every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const getWeatherIcon = () => {
    switch (weather) {
      case "sunny":
        return <Sun className="h-4 w-4 text-yellow-400" />
      case "cloudy":
        return <Cloud className="h-4 w-4 text-gray-300" />
      case "rainy":
        return <CloudRain className="h-4 w-4 text-blue-300" />
    }
  }

  const getWeatherColor = () => {
    switch (weather) {
      case "sunny":
        return "from-yellow-600 to-orange-600"
      case "cloudy":
        return "from-gray-500 to-blue-600"
      case "rainy":
        return "from-blue-600 to-indigo-600"
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={cn("flex items-center space-x-2 rounded-full bg-gradient-to-r px-3 py-1.5", getWeatherColor())}
    >
      {getWeatherIcon()}
      <div className="flex items-center text-xs font-medium text-white">
        <Thermometer className="mr-1 h-3 w-3" />
        {temperature}°F
      </div>
    </motion.div>
  )
}
