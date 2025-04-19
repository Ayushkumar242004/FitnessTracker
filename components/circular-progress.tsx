"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CircularProgressProps {
  value: number;
  size: number;
  strokeWidth: number;
  label?: string;
  sublabel?: string;
}

export function CircularProgress({
  value,
  size,
  strokeWidth,
  label,
  sublabel,
}: CircularProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 500);
    return () => clearTimeout(timer);
  }, [value]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress / 100);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="rgba(128, 90, 213, 0.2)"
          strokeWidth={strokeWidth}
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>

        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="url(#circleGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeInOut" }}
          strokeLinecap="round"
        />
      </svg>

      {/* Glowing effect */}
      <div
        className="absolute inset-0 rounded-full opacity-20 blur-md"
        style={{
          background: `conic-gradient(from 0deg, #8B5CF6 0%, #EC4899 ${progress}%, transparent ${progress}%)`,
        }}
      />

      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-3xl font-bold text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {progress}%
        </motion.span>
        {label && <span className="text-sm text-purple-300">{label}</span>}
        {sublabel && (
          <span className="text-xs text-purple-400">{sublabel}</span>
        )}
      </div>
    </div>
  );
}
