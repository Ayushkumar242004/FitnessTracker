"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";

export function TimeTracker() {
  const [time, setTime] = useState<Date | null>(null); // Initialize as null to avoid mismatch

  // Update the time every second on the client side
  useEffect(() => {
    setTime(new Date()); // Set the initial time on the client
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Format the time into a 12-hour clock with AM/PM
  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  // Render nothing until the time is initialized
  if (!time) {
    return null;
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }} // Slight scale effect on hover
      className="flex items-center space-x-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1.5"
    >
      <Clock className="h-4 w-4 text-white" />
      <span className="text-xs font-medium text-white">{formatTime(time)}</span>
    </motion.div>
  );
}
