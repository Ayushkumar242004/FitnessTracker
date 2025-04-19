"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Flame,
  Zap,
  Sword,
  Shield,
  Dumbbell,
  Trophy,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Difficulty color mapping
const difficultyColors: Record<
  "Beginner" | "Intermediate" | "Advanced" | "Elite",
  string
> = {
  Beginner: "bg-green-500/20 text-green-400",
  Intermediate: "bg-blue-500/20 text-blue-400",
  Advanced: "bg-purple-500/20 text-purple-400",
  Elite: "bg-red-500/20 text-red-400",
};

type Difficulty = keyof typeof difficultyColors;
type TabType = "daily" | "weekly" | "monthly";

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  xpReward: number;
  duration: string;
  completed: boolean;
  icon: JSX.Element;
  color: string;
}

export function CyberChallenges({
  onButtonClickAction,
}: {
  onButtonClickAction: () => void;
}) {
  const [activeTab, setActiveTab] = useState<TabType>("daily");
  const [progress, setProgress] = useState(0);

  // Challenges data categorized by tabs
  const challenges: Record<TabType, Challenge[]> = {
    daily: [
      {
        id: "d1",
        title: "Neon Burst",
        description: "Complete 100 push-ups with perfect form",
        difficulty: "Intermediate",
        xpReward: 250,
        duration: "24h",
        completed: false,
        icon: <Zap className="h-5 w-5" />,
        color: "bg-gradient-to-br from-yellow-400 to-purple-600",
      },
      {
        id: "d2",
        title: "Cyber Core",
        description: "Hold a 3-minute plank",
        difficulty: "Beginner",
        xpReward: 150,
        duration: "24h",
        completed: true,
        icon: <Shield className="h-5 w-5" />,
        color: "bg-gradient-to-br from-cyan-400 to-blue-600",
      },
      {
        id: "d3",
        title: "Glitch Squats",
        description: "50 weighted squats with 20kg",
        difficulty: "Advanced",
        xpReward: 400,
        duration: "24h",
        completed: false,
        icon: <Dumbbell className="h-5 w-5" />,
        color: "bg-gradient-to-br from-pink-500 to-red-600",
      },
    ],
    weekly: [
      {
        id: "w1",
        title: "Digital Marathon",
        description: "Run 20km total this week",
        difficulty: "Intermediate",
        xpReward: 800,
        duration: "7d",
        completed: false,
        icon: <Flame className="h-5 w-5" />,
        color: "bg-gradient-to-br from-orange-500 to-yellow-400",
      },
      {
        id: "w2",
        title: "Code Breaker",
        description: "Complete 5 high-intensity workouts",
        difficulty: "Advanced",
        xpReward: 1200,
        duration: "7d",
        completed: false,
        icon: <Sword className="h-5 w-5" />,
        color: "bg-gradient-to-br from-green-500 to-teal-600",
      },
    ],
    monthly: [
      {
        id: "m1",
        title: "System Overhaul",
        description: "Train every day for 30 days",
        difficulty: "Elite",
        xpReward: 5000,
        duration: "30d",
        completed: false,
        icon: <Trophy className="h-5 w-5" />,
        color: "bg-gradient-to-br from-purple-600 to-pink-600",
      },
    ],
  };

  // Calculate progress based on completed challenges
  useEffect(() => {
    const completed = challenges[activeTab].filter((c) => c.completed).length;
    const total = challenges[activeTab].length;
    setProgress((completed / total) * 100);
  }, [activeTab]);

  // Tab index mapping for animated indicator
  const tabIndexMap: Record<TabType, number> = {
    daily: 0,
    weekly: 1,
    monthly: 2,
  };

  return (
    <Card className="overflow-hidden border border-purple-500/20 bg-black/40 backdrop-blur-md">
      <div className="p-6">
        {/* Header */}
        <motion.h3
          className="flex items-center text-lg font-bold text-white mb-4"
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
            CYBER CHALLENGES
          </span>
        </motion.h3>

        {/* Tabs */}
        <div className="relative mb-6">
          <div className="flex space-x-1 rounded-lg bg-black/30 p-1 relative z-10">
            {(["daily", "weekly", "monthly"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  onButtonClickAction();
                }}
                className={cn(
                  "relative z-20 flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors",
                  activeTab === tab
                    ? "text-white"
                    : "text-purple-300 hover:text-white"
                )}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Animated Tab Indicator */}
          <motion.div
            className="absolute top-0 left-0 h-full w-1/3 bg-purple-900/50 rounded-md z-0"
            animate={{ x: `${tabIndexMap[activeTab] * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-purple-300">
              CHALLENGE PROGRESS
            </span>
            <span className="text-xs font-bold text-white">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-purple-900/50 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        {/* Challenge Cards */}
        <div className="space-y-3">
          {challenges[activeTab].map((challenge) => (
            <motion.div
              key={challenge.id}
              className={cn(
                "relative overflow-hidden rounded-lg border border-purple-500/20 p-4 cursor-pointer transition-all",
                challenge.completed
                  ? "bg-green-900/20"
                  : "bg-purple-900/10 hover:bg-purple-900/30"
              )}
            >
              <div className="relative z-10 flex items-start">
                <div
                  className={cn(
                    "flex items-center justify-center h-10 w-10 rounded-full mr-3",
                    challenge.color
                  )}
                >
                  {challenge.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : (
                    challenge.icon
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4
                      className={cn(
                        "font-bold",
                        challenge.completed
                          ? "text-green-400 line-through"
                          : "text-white"
                      )}
                    >
                      {challenge.title}
                    </h4>
                    <span className="text-xs font-bold text-yellow-400">
                      {challenge.xpReward} XP
                    </span>
                  </div>
                  <p className="text-sm text-purple-200 mt-1">
                    {challenge.description}
                  </p>
                  <div className="flex items-center mt-2 space-x-2">
                    <span
                      className={cn(
                        "text-xs px-2 py-0.5 rounded-full",
                        difficultyColors[challenge.difficulty]
                      )}
                    >
                      {challenge.difficulty}
                    </span>
                    <span className="flex items-center text-xs text-purple-300">
                      <Clock className="h-3 w-3 mr-1" />
                      {challenge.duration}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
}
