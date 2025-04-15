"use client"

import React from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { cn } from "@/lib/utils"

const Chart = ({ className, ...props }: React.ComponentProps<typeof ResponsiveContainer>) => {
  return <ResponsiveContainer className={cn("w-full", className)} {...props} />
}
Chart.displayName = "Chart"

const ChartContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("h-[350px] w-full", className)} {...props} />,
)
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = Tooltip

interface ChartTooltipContentProps {
  className?: string
  [key: string]: any
}

const ChartTooltipContent = ({ className, ...props }: ChartTooltipContentProps) => {
  if (!props.payload || props.payload.length === 0) {
    return null
  }
  return (
    <div className={cn("rounded-md border bg-popover p-4 text-popover-foreground", className)}>
      <p className="text-sm font-bold">{props.payload[0].name}</p>
      <ul className="mt-2 space-y-1">
        {props.payload.map((item: any) => (
          <li key={item.dataKey} className="flex items-center justify-between text-xs">
            <span className="mr-2 text-muted-foreground">{item.dataKey}:</span>
            <span className="font-medium">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
ChartTooltipContent.displayName = "ChartTooltipContent"

export {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
}
