"use client"

import { useEffect, useState } from "react"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "@/components/ui/chart"

interface FitnessChartProps {
  period: string
}

export function FitnessChart({ period }: FitnessChartProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // Generate different data based on the period
    if (period === "daily") {
      setData([
        { time: "6AM", steps: 500, calories: 100, heartRate: 65 },
        { time: "9AM", steps: 2500, calories: 350, heartRate: 85 },
        { time: "12PM", steps: 4000, calories: 800, heartRate: 95 },
        { time: "3PM", steps: 5500, calories: 1200, heartRate: 90 },
        { time: "6PM", steps: 7000, calories: 1500, heartRate: 110 },
        { time: "9PM", steps: 8742, calories: 1842, heartRate: 75 },
      ])
    } else if (period === "weekly") {
      setData([
        { time: "Mon", steps: 9200, calories: 1950, heartRate: 88 },
        { time: "Tue", steps: 8500, calories: 1800, heartRate: 85 },
        { time: "Wed", steps: 10500, calories: 2200, heartRate: 92 },
        { time: "Thu", steps: 7800, calories: 1650, heartRate: 80 },
        { time: "Fri", steps: 8742, calories: 1842, heartRate: 72 },
        { time: "Sat", steps: 6500, calories: 1400, heartRate: 75 },
        { time: "Sun", steps: 5000, calories: 1100, heartRate: 70 },
      ])
    } else {
      setData([
        { time: "Week 1", steps: 45000, calories: 9500, heartRate: 82 },
        { time: "Week 2", steps: 52000, calories: 11000, heartRate: 85 },
        { time: "Week 3", steps: 48000, calories: 10200, heartRate: 80 },
        { time: "Week 4", steps: 61000, calories: 12800, heartRate: 88 },
      ])
    }
  }, [period])

  return (
    <ChartContainer className="h-full">
      <Chart>
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <Line
            type="monotone"
            dataKey="steps"
            stroke="#8B5CF6"
            strokeWidth={2}
            dot={{
              r: 4,
              fill: "#8B5CF6",
              strokeWidth: 0,
            }}
            activeDot={{
              r: 6,
              fill: "#8B5CF6",
              stroke: "#fff",
              strokeWidth: 2,
            }}
          />
          <Line
            type="monotone"
            dataKey="calories"
            stroke="#EC4899"
            strokeWidth={2}
            dot={{
              r: 4,
              fill: "#EC4899",
              strokeWidth: 0,
            }}
            activeDot={{
              r: 6,
              fill: "#EC4899",
              stroke: "#fff",
              strokeWidth: 2,
            }}
          />
          <Line
            type="monotone"
            dataKey="heartRate"
            stroke="#06B6D4"
            strokeWidth={2}
            dot={{
              r: 4,
              fill: "#06B6D4",
              strokeWidth: 0,
            }}
            activeDot={{
              r: 6,
              fill: "#06B6D4",
              stroke: "#fff",
              strokeWidth: 2,
            }}
          />
          <ChartTooltip
            content={<ChartTooltipContent className="border-purple-500/20 bg-black/80 backdrop-blur-md" />}
          />
        </LineChart>
      </Chart>
    </ChartContainer>
  )
}
