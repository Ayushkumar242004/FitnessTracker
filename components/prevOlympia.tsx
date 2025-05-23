"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Flame,
  Zap,
  Sword,
  Shield,
  Dumbbell,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AnimeWorkoutQuotesProps {
  onButtonClickAction: () => void;
}

export function AnimeWorkoutQuotes({
  onButtonClickAction,
}: AnimeWorkoutQuotesProps) {
  const [currentQuote, setCurrentQuote] = useState(0);
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  // Anime quotes with character images
  const quotes = [
    {
      character: "Izuku Midoriya",
      anime: "My Hero Academia",
      quote: "Plus Ultra! Go beyond your limits!",
      powerLevel: "100%",
      image: "/anime5.png",
      bg: "bg-gradient-to-br from-green-500 to-blue-600",
      icon: <Zap className="h-5 w-5" />,
    },
    {
      character: "Goku",
      anime: "Dragon Ball Z",
      quote: "Push through the pain! Train until you collapse!",
      powerLevel: "Over 9000!",
      image: "/anime4.png",
      bg: "bg-gradient-to-br from-orange-500 to-red-600",
      icon: <Flame className="h-5 w-5" />,
    },
    {
      character: "Toriko",
      anime: "Toriko",
      quote: "Dedicate your heart. No pain, no gain.",
      powerLevel: "∞ Precision",
      image: "/anime3.png",
      bg: "bg-gradient-to-br from-gray-700 to-blue-900",
      icon: <Sword className="h-5 w-5" />,
    },
    {
      character: "Gojo",
      anime: "Jujutsu Kaisen",
      quote:
        "100 push-ups, 100 sit-ups, 100 squats, 10km running. EVERY. SINGLE. DAY.",
      powerLevel: "One Punch Power",
      image: "/anime2.png",
      bg: "bg-gradient-to-br from-yellow-400 to-red-500",
      icon: <Shield className="h-5 w-5" />,
    },
    {
      character: "Zoro",
      anime: "One Piece",
      quote: "A dropout will beat a genius through hard work!",
      powerLevel: "8 Gates Unleashed",
      image: "/anime1.png",
      bg: "bg-gradient-to-br from-green-600 to-yellow-500",
      icon: <Dumbbell className="h-5 w-5" />,
    },
  ];

  // Auto-rotate quotes every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextQuote();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentQuote]);

  // Navigate to the next quote
  const nextQuote = () => {
    controls.start("exit");
    setTimeout(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
      controls.start("enter");
      onButtonClickAction();
    }, 300);
  };

  // Navigate to the previous quote
  const prevQuote = () => {
    controls.start("exit");
    setTimeout(() => {
      setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length);
      controls.start("enter");
      onButtonClickAction();
    }, 300);
  };

  // Power level animation
  const powerLevelAnimation = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: [1, 1.1, 1],
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Card className="overflow-hidden border border-purple-500/20 bg-black/40 backdrop-blur-md">
      <div className="p-6">
        {/* Header Section */}
        <div className="mb-4 flex items-center justify-between">
          <motion.h3
            className="flex items-center text-lg font-bold text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.span
              animate={{
                rotate: [0, 10, -10, 0],
                transition: { duration: 0.5, repeat: Infinity, repeatDelay: 3 },
              }}
            >
              <Flame className="mr-2 h-5 w-5 text-yellow-400" />
            </motion.span>
            <span className="bg-gradient-to-r from-yellow-400 via-red-500 to-purple-500 bg-clip-text text-transparent">
              PLUS ULTRA! Anime Workout Quotes
            </span>
          </motion.h3>
          <div className="flex space-x-2">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-purple-300 hover:bg-purple-950/50 hover:text-purple-200"
                onClick={prevQuote}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-purple-300 hover:bg-purple-950/50 hover:text-purple-200"
                onClick={nextQuote}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Quote Display Section */}
        <div
          className="relative h-[400px] overflow-hidden rounded-lg border border-purple-500/20"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-yellow-500 opacity-10 blur-3xl"
              animate={{
                x: [0, 50, 0],
                y: [0, 30, 0],
                transition: { duration: 10, repeat: Infinity },
              }}
            />
            <motion.div
              className="absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-purple-500 opacity-10 blur-3xl"
              animate={{
                x: [0, -50, 0],
                y: [0, -30, 0],
                transition: { duration: 8, repeat: Infinity, delay: 2 },
              }}
            />
          </div>

          {/* Quote Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuote}
              initial="exit"
              animate="enter"
              exit="exit"
              variants={{
                enter: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: 100 },
              }}
              transition={{ duration: 0.5 }}
              className={`relative h-full w-full ${quotes[currentQuote].bg}`}
            >
              {/* Character Image */}
              <motion.div
                className="absolute inset-0 bg-black/30"
                style={{
                  backgroundImage: `url(${quotes[currentQuote].image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "400px",
                  width: "400px",
                }}
                animate={{
                  scale: isHovered ? 1.05 : 1,
                  transition: { duration: 0.5 },
                }}
              />

              {/* Quote Details */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <motion.div
                  className="mb-2 flex items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="mr-2 h-6 w-1 bg-yellow-400"></div>
                  <h4 className="text-2xl font-bold text-white drop-shadow-lg">
                    {quotes[currentQuote].character}
                  </h4>
                </motion.div>
                <motion.div
                  className="mb-3 flex items-center space-x-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                    {quotes[currentQuote].anime}
                  </span>
                  <motion.span
                    className="flex items-center rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-medium text-yellow-300"
                    variants={powerLevelAnimation}
                    initial="initial"
                    animate="animate"
                  >
                    {quotes[currentQuote].icon}
                    <span className="ml-1">
                      {quotes[currentQuote].powerLevel}
                    </span>
                  </motion.span>
                </motion.div>
                <motion.p
                  className="text-lg italic text-white drop-shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  "{quotes[currentQuote].quote}"
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Indicator Dots */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center p-4">
            <div className="flex space-x-2">
              {quotes.map((_, index) => (
                <motion.button
                  key={index}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all duration-300",
                    index === currentQuote ? "bg-yellow-400" : "bg-white/30"
                  )}
                  onClick={() => {
                    setCurrentQuote(index);
                    onButtonClickAction();
                  }}
                  whileHover={{ scale: 1.5 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
