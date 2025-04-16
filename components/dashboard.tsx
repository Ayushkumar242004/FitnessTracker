"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { CyberSidebar } from "@/components/cyber-sidebar";
import { FitnessMetrics } from "@/components/fitness-metrics";
import { AIAssistant } from "@/components/ai-assistant";
import { LegendsHall } from "@/components/legends-hall";
import { AnimeWorkoutQuotes } from "@/components/prevOlympia";
import { CyberChallenges } from "@/components/challenge";
import { PowerUpZone } from "@/components/power-up-zone";
import { AnimeTrainingSchedule } from "@/components/schedule";
import { CyberBackground } from "@/components/cyber-background";
import { WeatherWidget } from "@/components/weather-widget";
import { TimeTracker } from "@/components/time-tracker";
import { UserProfile } from "@/components/user-profile";
import { useAudio } from "@/hooks/use-audio";
import { AchievementHall } from "@/components/achievement";

export default function Dashboard() {
  const [theme, setTheme] = useState<
    "neon-city" | "digital-dojo" | "cyber-gym"
  >("neon-city");
  const [showAssistant, setShowAssistant] = useState(true);
  const { playSound } = useAudio();

  // Create refs for each section
  const topBarRef = useRef<HTMLDivElement>(null);
  const powerUpRef = useRef<HTMLDivElement>(null);
  const challengesRef = useRef<HTMLDivElement>(null);
  const legendsHallRef = useRef<HTMLDivElement>(null);
  const quotesRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = (section?: string) => {
    let ref;
    switch (section) {
      case "top-bar":
        ref = topBarRef;
        break;
      case "power-up":
        ref = powerUpRef;
        break;
      case "challenges":
        ref = challengesRef;
        break;
      case "legends-hall":
        ref = legendsHallRef;
        break;
      case "quotes":
        ref = quotesRef;
        break;
      case "schedule":
        ref = scheduleRef;
        break;
      case "achievements":
        ref = achievementsRef;
        break;
      default:
        return;
    }

    if (ref?.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
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
              ref={topBarRef}
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
              ref={powerUpRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <PowerUpZone onButtonClick={handleButtonClick} />
            </motion.div>

            {/* Challenges */}
            <motion.div
              ref={challengesRef}
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

            <div ref={legendsHallRef}>
              <LegendsHall onButtonClick={handleButtonClick} />
            </div>

            <div ref={quotesRef}>
              <AnimeWorkoutQuotes onButtonClick={handleButtonClick} />
            </div>

            <div ref={scheduleRef}>
              <AnimeTrainingSchedule onButtonClick={handleButtonClick} />
            </div>
          </motion.div>
        </div>

        <div ref={achievementsRef}>
          <AchievementHall />
        </div>
      </main>
    </div>
  );
}