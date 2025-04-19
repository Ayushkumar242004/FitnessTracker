"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AIAssistantProps {
  onButtonClickAction: () => void;
}

export function AIAssistant({ onButtonClickAction }: AIAssistantProps) {
  // State for managing the current message index
  const [currentMessage, setCurrentMessage] = useState(0);

  // State for managing typing animation
  const [isTyping, setIsTyping] = useState(false);

  // State for storing the typed text
  const [typedText, setTypedText] = useState("");

  // Predefined messages for the AI Assistant
  const messages = [
    "Your workout intensity is up 12% this week! Keep pushing those limits! 💪",
    "I notice you've been hitting your step goals consistently. Great job on building that habit!",
    "Try adding 2 more sets to your bench press today. I think you're ready for the challenge!",
    "Remember to stay hydrated during your workout. Aim for at least 20oz of water.",
    "Your heart rate recovery is improving! That's a sign your cardiovascular health is getting better.",
  ];

  // Automatically cycle through messages every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [messages.length]);

  // Typing animation for the current message
  useEffect(() => {
    setIsTyping(true);
    setTypedText("");

    const message = messages[currentMessage];
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index < message.length) {
        setTypedText((prev) => prev + message.charAt(index));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [currentMessage, messages]);

  return (
    <Card className="relative overflow-hidden border border-cyan-500/20 bg-gradient-to-br from-cyan-950/40 to-purple-950/40 backdrop-blur-md">
      {/* Background Glow */}
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-500 opacity-10 blur-3xl"></div>

      <div className="p-6">
        {/* Header Section */}
        <div className="mb-4 flex items-center justify-between">
          {/* AI Assistant Avatar and Title */}
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

          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full text-cyan-300 hover:bg-cyan-950/50 hover:text-cyan-200"
            onClick={() => {
              onButtonClickAction();
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Message Display Section */}
        <div className="relative min-h-[100px] rounded-lg border border-cyan-500/20 bg-black/30 p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMessage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-start space-x-3"
            >
              {/* AI Icon */}
              <div className="mt-1 h-8 w-8 flex-shrink-0 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-1.5">
                <Bot className="h-full w-full text-white" />
              </div>

              {/* Typing Animation */}
              <div>
                <p className="text-sm text-cyan-100">
                  {typedText}
                  {isTyping && (
                    <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-cyan-400"></span>
                  )}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex space-x-2">
          <Button
            className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500"
            onClick={onButtonClickAction}
          >
            Ask for Advice
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-cyan-500/30 bg-transparent text-cyan-300 hover:bg-cyan-950/30 hover:text-cyan-200"
            onClick={onButtonClickAction}
          >
            Workout Suggestion
          </Button>
        </div>
      </div>
    </Card>
  );
}
