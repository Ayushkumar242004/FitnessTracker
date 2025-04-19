"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LegendsHallProps {
  onButtonClickAction: () => void;
}

export function LegendsHall({ onButtonClickAction }: LegendsHallProps) {
  const [currentLegend, setCurrentLegend] = useState(0);

  // List of legends with their details
  const legends = [
    {
      name: "Arnold Schwarzenegger",
      title: "7x Mr. Olympia",
      years: "1970-1975, 1980",
      quote:
        "The resistance that you fight physically in the gym and the resistance that you fight in life can only build a strong character.",
      image: "/arnold.png?height=400&width=300",
    },
    {
      name: "Ronnie Coleman",
      title: "8x Mr. Olympia",
      years: "1998-2005",
      quote:
        "Everybody wants to be a bodybuilder, but don't nobody want to lift no heavy weight.",
      image: "/ronnie.png?height=400&width=300",
    },
    {
      name: "Dorian Yates",
      title: "6x Mr. Olympia",
      years: "1992-1997",
      quote:
        "If you're willing to go through all the battling you got to go through to get where you want to get, who's got the right to stop you?",
      image: "/dorian.png?height=400&width=300",
    },
    {
      name: "Lee Haney",
      title: "8x Mr. Olympia",
      years: "1984-1991",
      quote:
        "Exercise to stimulate, not to annihilate. The world wasn't formed in a day, and neither were we. Set small goals and build upon them.",
      image: "/lee.png?height=400&width=300",
    },
  ];

  // Navigate to the next legend
  const nextLegend = () => {
    onButtonClickAction();
    setCurrentLegend((prev) => (prev + 1) % legends.length);
  };

  // Navigate to the previous legend
  const prevLegend = () => {
    onButtonClickAction();
    setCurrentLegend((prev) => (prev - 1 + legends.length) % legends.length);
  };

  return (
    <Card className="overflow-hidden border border-purple-500/20 bg-black/40 backdrop-blur-md">
      <div className="p-6">
        {/* Header Section */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center text-lg font-bold text-white">
            <Trophy className="mr-2 h-5 w-5 text-yellow-400" />
            Legends Hall
          </h3>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-purple-300 hover:bg-purple-950/50 hover:text-purple-200"
              onClick={prevLegend}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-purple-300 hover:bg-purple-950/50 hover:text-purple-200"
              onClick={nextLegend}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Legend Display Section */}
        <div className="relative h-[400px] overflow-hidden rounded-lg border border-purple-500/20 bg-purple-950/20">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

          {/* Legend Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentLegend}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-full w-full"
            >
              {/* Legend Image */}
              <img
                src={legends[currentLegend].image || "/placeholder.svg"}
                alt={legends[currentLegend].name}
                className="h-[300px] w-[300px] mx-auto"
              />

              {/* Legend Information */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="mb-2 flex items-center">
                  <div className="mr-2 h-6 w-1 bg-yellow-400"></div>
                  <h4 className="text-xl font-bold text-white">
                    {legends[currentLegend].name}
                  </h4>
                </div>
                <div className="mb-2 flex items-center space-x-2">
                  <span className="rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs font-medium text-yellow-300">
                    {legends[currentLegend].title}
                  </span>
                  <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-xs font-medium text-purple-300">
                    {legends[currentLegend].years}
                  </span>
                </div>
                <p className="text-sm italic text-gray-300">
                  "{legends[currentLegend].quote}"
                </p>
              </div>

              {/* Background Glow Effects */}
              <div className="absolute left-0 top-0 h-full w-full">
                <div className="absolute -left-20 -top-20 h-40 w-40 animate-pulse rounded-full bg-yellow-500 opacity-10 blur-3xl"></div>
                <div className="absolute -right-20 -bottom-20 h-40 w-40 animate-pulse rounded-full bg-purple-500 opacity-10 blur-3xl"></div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Pagination Dots */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center p-2">
            <div className="flex space-x-1">
              {legends.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "h-1.5 w-6 rounded-full transition-all duration-300",
                    index === currentLegend
                      ? "bg-gradient-to-r from-yellow-400 to-purple-500"
                      : "bg-white/30"
                  )}
                  onClick={() => {
                    setCurrentLegend(index);
                    onButtonClickAction();
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
