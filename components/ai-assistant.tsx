"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, X } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface AIAssistantProps {
  onClose: () => void
  onButtonClick: () => void
}

export function AIAssistant({ onClose, onButtonClick }: AIAssistantProps) {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [typedText, setTypedText] = useState("")

  const messages = [
    "Your workout intensity is up 12% this week! Keep pushing those limits! 💪",
    "I notice you've been hitting your step goals consistently. Great job on building that habit!",
    "Try adding 2 more sets to your bench press today. I think you're ready for the challenge!",
    "Remember to stay hydrated during your workout. Aim for at least 20oz of water.",
    "Your heart rate recovery is improving! That's a sign your cardiovascular health is getting better.",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [messages.length])

  useEffect(() => {
    setIsTyping(true)
    setTypedText("")

    const message = messages[currentMessage]
    let index = 0

    const typingInterval = setInterval(() => {
      if (index < message.length) {
        setTypedText((prev) => prev + message.charAt(index))
        index++
      } else {
        setIsTyping(false)
        clearInterval(typingInterval)
      }
    }, 30)

    return () => clearInterval(typingInterval)
  }, [currentMessage, messages])

  return (
    <Card className="relative overflow-hidden border border-cyan-500/20 bg-gradient-to-br from-cyan-950/40 to-purple-950/40 backdrop-blur-md">
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-500 opacity-10 blur-3xl"></div>

      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-cyan-500 bg-cyan-950/50">
              <div className="absolute inset-0 flex items-center justify-center">
                <Bot className="h-6 w-6 text-cyan-400" />
              </div>
              <div className="absolute inset-0 animate-pulse rounded-full bg-cyan-500 opacity-20"></div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                CYBER<span className="text-cyan-400">COACH</span>
              </h3>
              <p className="text-xs text-cyan-300">AI FITNESS ASSISTANT</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full text-cyan-300 hover:bg-cyan-950/50 hover:text-cyan-200"
            onClick={() => {
              onClose()
              onButtonClick()
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="relative min-h-[100px] rounded-lg border border-cyan-500/20 bg-black/30 p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMessage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-start space-x-3"
            >
              <div className="mt-1 h-8 w-8 flex-shrink-0 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-1.5">
                <Bot className="h-full w-full text-white" />
              </div>
              <div>
                <p className="text-sm text-cyan-100">
                  {typedText}
                  {isTyping && <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-cyan-400"></span>}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-4 flex space-x-2">
          <Button
            className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500"
            onClick={onButtonClick}
          >
            Ask for Advice
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-cyan-500/30 bg-transparent text-cyan-300 hover:bg-cyan-950/30 hover:text-cyan-200"
            onClick={onButtonClick}
          >
            Workout Suggestion
          </Button>
        </div>
      </div>
    </Card>
  )
}
