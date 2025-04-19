"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, Flame, Heart, TrendingUp, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FitnessChart } from "@/components/fitness-chart";
import { CircularProgress } from "@/components/circular-progress";
import { cn } from "@/lib/utils";

interface FitnessMetricsProps {
  onButtonClickAction: () => void;
}

export function FitnessMetrics({ onButtonClickAction }: FitnessMetricsProps) {
  const [activeTab, setActiveTab] = useState("daily");

  // Handle tab change and trigger button action
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    onButtonClickAction();
  };

  return (
    <Card className="overflow-hidden border border-purple-500/20 bg-black/40 backdrop-blur-md">
      <div className="p-6">
        {/* Header Section */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            <span className="mr-2 inline-block h-8 w-1 bg-gradient-to-b from-purple-500 to-pink-500"></span>
            Fitness Metrics
          </h2>
          <Tabs
            defaultValue="daily"
            className="w-[300px]"
            onValueChange={handleTabChange}
          >
            <TabsList className="grid w-full grid-cols-3 bg-purple-950/50 backdrop-blur-md">
              {["daily", "weekly", "monthly"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className={cn(
                    "data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600",
                    "data-[state=active]:text-white"
                  )}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <MetricCard
            icon={<Activity className="h-5 w-5 text-cyan-400" />}
            title="Steps"
            value="8,742"
            target="10,000"
            progress={87}
            color="cyan"
          />
          <MetricCard
            icon={<Flame className="h-5 w-5 text-orange-400" />}
            title="Calories"
            value="1,842"
            target="2,200"
            progress={84}
            color="orange"
          />
          <MetricCard
            icon={<Heart className="h-5 w-5 text-pink-400" />}
            title="Heart Rate"
            value="72 bpm"
            target="Resting"
            progress={65}
            color="pink"
          />
          <MetricCard
            icon={<Zap className="h-5 w-5 text-purple-400" />}
            title="Energy"
            value="76%"
            target="100%"
            progress={76}
            color="purple"
          />
        </div>

        {/* Activity Trends and Goal Progress */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Activity Trends Chart */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-purple-500/20 bg-purple-900/10 p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">
                  Activity Trends
                </h3>
                <TrendingUp className="h-5 w-5 text-green-400" />
              </div>
              <div className="h-[250px]">
                <FitnessChart period={activeTab} />
              </div>
            </div>
          </div>

          {/* Goal Progress Section */}
          <div>
            <div className="rounded-lg border border-purple-500/20 bg-purple-900/10 p-4">
              <h3 className="mb-4 text-lg font-medium text-white">
                Goal Progress
              </h3>
              <div className="flex flex-col items-center space-y-6">
                <CircularProgress
                  value={68}
                  size={180}
                  strokeWidth={12}
                  label="Weekly Goal"
                  sublabel="68% Complete"
                />
                <div className="w-full space-y-4">
                  {/* Workouts Progress */}
                  <div>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="text-purple-300">Workouts</span>
                      <span className="text-purple-300">3/5</span>
                    </div>
                    <Progress
                      value={60}
                      className="h-2 bg-purple-900/50"
                      indicatorClassName="bg-gradient-to-r from-purple-500 to-pink-500"
                    />
                  </div>

                  {/* Cardio Progress */}
                  <div>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="text-cyan-300">Cardio</span>
                      <span className="text-cyan-300">2/3</span>
                    </div>
                    <Progress
                      value={66}
                      className="h-2 bg-cyan-900/50"
                      indicatorClassName="bg-gradient-to-r from-cyan-500 to-blue-500"
                    />
                  </div>

                  {/* Nutrition Progress */}
                  <div>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="text-pink-300">Nutrition</span>
                      <span className="text-pink-300">4/7</span>
                    </div>
                    <Progress
                      value={57}
                      className="h-2 bg-pink-900/50"
                      indicatorClassName="bg-gradient-to-r from-pink-500 to-red-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  target: string;
  progress: number;
  color: "cyan" | "orange" | "pink" | "purple";
}

function MetricCard({
  icon,
  title,
  value,
  target,
  progress,
  color,
}: MetricCardProps) {
  const gradients = {
    cyan: "from-cyan-500 to-blue-500",
    orange: "from-orange-500 to-red-500",
    pink: "from-pink-500 to-purple-500",
    purple: "from-purple-500 to-indigo-500",
  };

  const bgColors = {
    cyan: "bg-cyan-900/20",
    orange: "bg-orange-900/20",
    pink: "bg-pink-900/20",
    purple: "bg-purple-900/20",
  };

  const borderColors = {
    cyan: "border-cyan-500/30",
    orange: "border-orange-500/30",
    pink: "border-pink-500/30",
    purple: "border-purple-500/30",
  };

  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        "relative overflow-hidden rounded-lg border p-4",
        borderColors[color],
        bgColors[color]
      )}
    >
      {/* Background Glow */}
      <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br opacity-20"></div>
      <div className="flex items-center justify-between">
        <div className="rounded-full bg-black/20 p-2">{icon}</div>
        <div className="text-xs font-medium text-gray-400">
          Target: {target}
        </div>
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-medium text-gray-300">{title}</h3>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
      <div className="mt-3">
        <div className="mb-1 flex justify-between text-xs">
          <span className="text-gray-400">Progress</span>
          <span className="text-gray-400">{progress}%</span>
        </div>
        <Progress
          value={progress}
          className="h-1.5 bg-black/30"
          indicatorClassName={`bg-gradient-to-r ${gradients[color]}`}
        />
      </div>
    </motion.div>
  );
}
