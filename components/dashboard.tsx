"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CyberSidebar } from "@/components/cyber-sidebar";
import { FitnessMetrics } from "@/components/fitness-metrics";
import { AIAssistant } from "@/components/ai-assistant";
import { LegendsHall } from "@/components/legends-hall";
import { AnimeWorkoutQuotes } from "@/components/prevOlympia";
import { CyberChallenges } from "@/components/challenge";
import { PowerUpZone } from "@/components/power-up-zone";
import { AnimeTrainingSchedule } from "@/components/schedule"
import { CyberBackground } from "@/components/cyber-background";
import { WeatherWidget } from "@/components/weather-widget";
import { TimeTracker } from "@/components/time-tracker";
import { UserProfile } from "@/components/user-profile";
import { useAudio } from "@/hooks/use-audio";
import { AchievementHall } from "@/components/achievement"

export default function Dashboard() {
  const [theme, setTheme] = useState<
    "neon-city" | "digital-dojo" | "cyber-gym"
  >("neon-city");
  const [showAssistant, setShowAssistant] = useState(true);
  const { playSound } = useAudio();

  const handleButtonClick = () => {
   
  };

  return (
    <div className="relative min-h-screen w-full overflow-y-auto">
      {/* Background Theme */}
      <CyberBackground theme={theme} />

      {/* Sidebar */}
      <div className="hidden lg:block fixed top-0 left-0 z-20">
        <CyberSidebar onButtonClick={handleButtonClick} />
      </div>

      {/* Main Dashboard Content */}
      <main className="relative z-10 px-4 py-6 lg:ml-64 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section */}
          <div className="col-span-2 space-y-6">
            {/* Top Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center flex-wrap gap-4">
                <UserProfile onThemeChange={setTheme} />
                <div className="flex space-x-4">
                  <TimeTracker />
                  <WeatherWidget />
                </div>
              </div>

              <FitnessMetrics onButtonClick={handleButtonClick} />
            </motion.div>

            {/* Power Up */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <PowerUpZone onButtonClick={handleButtonClick} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <CyberChallenges onButtonClick={handleButtonClick} />
            </motion.div>

          </div>

          {/* Right Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            {showAssistant && (
              <AIAssistant
                onClose={() => setShowAssistant(false)}
                onButtonClick={handleButtonClick}
              />
            )}

            <LegendsHall onButtonClick={handleButtonClick} />
            <AnimeWorkoutQuotes onButtonClick={handleButtonClick} />
            <AnimeTrainingSchedule onButtonClick={handleButtonClick} />
          </motion.div>
        </div>
        <AchievementHall />

      </main>
    </div>
  );
}
