"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface UserProfileProps {
  onThemeChange: (theme: "neon-city" | "digital-dojo" | "cyber-gym") => void
}

export function UserProfile({ onThemeChange }: UserProfileProps) {
  const [level, setLevel] = useState(24)
  const [xp, setXp] = useState(7850)
  const [nextLevel, setNextLevel] = useState(10000)

  return (
    <div className="flex items-center space-x-4">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center space-x-3 rounded-full bg-gradient-to-r from-purple-900/50 to-pink-900/50 px-4 py-2 backdrop-blur-md"
      >
        <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-purple-500">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600"></div>
          <User className="absolute inset-0 m-auto h-6 w-6 text-white" />
        </div>
        <div>
          <div className="flex items-center">
            <h3 className="text-sm font-bold text-white">CyberRunner42</h3>
            <div className="ml-2 rounded-full bg-purple-500/20 px-2 py-0.5 text-xs font-medium text-purple-300">
              Lvl {level}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-1.5 w-24 rounded-full bg-purple-900/50">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                style={{ width: `${(xp / nextLevel) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs text-purple-300">
              {xp}/{nextLevel} XP
            </span>
          </div>
        </div>
      </motion.div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 rounded-full bg-purple-900/30 px-3 py-1.5 text-sm font-medium text-purple-300 backdrop-blur-md hover:bg-purple-900/50 hover:text-purple-200"
          >
            <span>Customize</span>
            <ChevronDown className="h-4 w-4" />
          </motion.button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 border-purple-500/20 bg-black/90 backdrop-blur-xl">
          <DropdownMenuLabel className="text-purple-300">Themes</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-purple-500/20" />
          <DropdownMenuItem
            className="focus:bg-purple-900/30 focus:text-purple-200"
            onClick={() => onThemeChange("neon-city")}
          >
            <div className="mr-2 h-4 w-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <span>Neon City</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="focus:bg-purple-900/30 focus:text-purple-200"
            onClick={() => onThemeChange("digital-dojo")}
          >
            <div className="mr-2 h-4 w-4 rounded-full bg-gradient-to-r from-green-500 to-blue-500"></div>
            <span>Digital Dojo</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="focus:bg-purple-900/30 focus:text-purple-200"
            onClick={() => onThemeChange("cyber-gym")}
          >
            <div className="mr-2 h-4 w-4 rounded-full bg-gradient-to-r from-red-500 to-cyan-500"></div>
            <span>Cyber Gym</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-purple-500/20" />
          <DropdownMenuItem className="focus:bg-purple-900/30 focus:text-purple-200">
            <span>Edit Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-purple-900/30 focus:text-purple-200">
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
