"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Dumbbell, Headphones, CloudLightningIcon as Lightning, Music, Play, Salad, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface PowerUpZoneProps {
  onButtonClick: () => void
}

export function PowerUpZone({ onButtonClick }: PowerUpZoneProps) {
  const [activeTab, setActiveTab] = useState("workouts")

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    onButtonClick()
  }

  return (
    <Card className="overflow-hidden border border-purple-500/20 bg-black/40 backdrop-blur-md">
      <div className="p-6">
        <div className="mb-6 flex items-center">
          <Lightning className="mr-2 h-6 w-6 text-yellow-400" />
          <h2 className="text-2xl font-bold text-white">Power Up Zone</h2>
        </div>

        <Tabs defaultValue="workouts" className="w-full" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-3 bg-purple-950/50 backdrop-blur-md">
            <TabsTrigger
              value="workouts"
              className={cn(
                "data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600",
                "data-[state=active]:text-white",
              )}
            >
              <Dumbbell className="mr-2 h-4 w-4" />
              Workouts
            </TabsTrigger>
            <TabsTrigger
              value="playlists"
              className={cn(
                "data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600",
                "data-[state=active]:text-white",
              )}
            >
              <Music className="mr-2 h-4 w-4" />
              Playlists
            </TabsTrigger>
            <TabsTrigger
              value="nutrition"
              className={cn(
                "data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600",
                "data-[state=active]:text-white",
              )}
            >
              <Salad className="mr-2 h-4 w-4" />
              Nutrition
            </TabsTrigger>
          </TabsList>

          <TabsContent value="workouts" className="mt-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <WorkoutCard
                title="Cybernetic Strength"
                level="Advanced"
                duration="45 min"
                intensity="High"
                exercises={5}
                image="/placeholder.svg?height=200&width=400"
                onButtonClick={onButtonClick}
              />
              <WorkoutCard
                title="Neural Network HIIT"
                level="Intermediate"
                duration="30 min"
                intensity="Very High"
                exercises={8}
                image="/placeholder.svg?height=200&width=400"
                onButtonClick={onButtonClick}
              />
              <WorkoutCard
                title="Digital Detox Yoga"
                level="Beginner"
                duration="40 min"
                intensity="Low"
                exercises={12}
                image="/placeholder.svg?height=200&width=400"
                onButtonClick={onButtonClick}
              />
              <WorkoutCard
                title="Quantum Core Circuit"
                level="Intermediate"
                duration="25 min"
                intensity="Medium"
                exercises={6}
                image="/placeholder.svg?height=200&width=400"
                onButtonClick={onButtonClick}
              />
            </div>
          </TabsContent>

          <TabsContent value="playlists" className="mt-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <PlaylistCard
                title="Synthwave Pump"
                tracks={12}
                duration="48 min"
                mood="Energetic"
                image="/placeholder.svg?height=200&width=400"
                onButtonClick={onButtonClick}
              />
              <PlaylistCard
                title="Cyberpunk Beats"
                tracks={15}
                duration="62 min"
                mood="Intense"
                image="/placeholder.svg?height=200&width=400"
                onButtonClick={onButtonClick}
              />
              <PlaylistCard
                title="Digital Zen"
                tracks={10}
                duration="55 min"
                mood="Focused"
                image="/placeholder.svg?height=200&width=400"
                onButtonClick={onButtonClick}
              />
              <PlaylistCard
                title="Neon Cardio"
                tracks={14}
                duration="67 min"
                mood="Upbeat"
                image="/placeholder.svg?height=200&width=400"
                onButtonClick={onButtonClick}
              />
            </div>
          </TabsContent>

          <TabsContent value="nutrition" className="mt-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <NutritionCard
                title="Protein Power Bowl"
                calories={450}
                protein={35}
                carbs={40}
                fats={15}
                image="/placeholder.svg?height=200&width=400"
                onButtonClick={onButtonClick}
              />
              <NutritionCard
                title="Green Machine Smoothie"
                calories={320}
                protein={20}
                carbs={45}
                fats={8}
                image="/placeholder.svg?height=200&width=400"
                onButtonClick={onButtonClick}
              />
              <NutritionCard
                title="Cyber Creatine Oats"
                calories={520}
                protein={30}
                carbs={65}
                fats={12}
                image="/placeholder.svg?height=200&width=400"
                onButtonClick={onButtonClick}
              />
              <NutritionCard
                title="Recovery Ramen"
                calories={580}
                protein={42}
                carbs={70}
                fats={18}
                image="/placeholder.svg?height=200&width=400"
                onButtonClick={onButtonClick}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  )
}

interface WorkoutCardProps {
  title: string
  level: string
  duration: string
  intensity: string
  exercises: number
  image: string
  onButtonClick: () => void
}

function WorkoutCard({ title, level, duration, intensity, exercises, image, onButtonClick }: WorkoutCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden rounded-lg border border-purple-500/20 bg-purple-950/10"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-60"></div>
      <img
        src={image || "/placeholder.svg"}
        alt={title}
        className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="mb-2 flex flex-wrap gap-2">
          <Badge variant="outline" className="border-purple-500/30 bg-black/50 text-purple-300">
            {level}
          </Badge>
          <Badge variant="outline" className="border-blue-500/30 bg-black/50 text-blue-300">
            {duration}
          </Badge>
          <Badge variant="outline" className="border-pink-500/30 bg-black/50 text-pink-300">
            {intensity}
          </Badge>
        </div>

        <h3 className="mb-1 text-lg font-bold text-white">{title}</h3>
        <p className="mb-3 text-sm text-gray-300">{exercises} exercises</p>

        <Button
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500"
          onClick={onButtonClick}
        >
          <Zap className="mr-2 h-4 w-4" />
          Start Workout
        </Button>
      </div>
    </motion.div>
  )
}

interface PlaylistCardProps {
  title: string
  tracks: number
  duration: string
  mood: string
  image: string
  onButtonClick: () => void
}

function PlaylistCard({ title, tracks, duration, mood, image, onButtonClick }: PlaylistCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden rounded-lg border border-cyan-500/20 bg-cyan-950/10"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-60"></div>
      <img
        src={image || "/placeholder.svg"}
        alt={title}
        className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="mb-2 flex flex-wrap gap-2">
          <Badge variant="outline" className="border-cyan-500/30 bg-black/50 text-cyan-300">
            {tracks} tracks
          </Badge>
          <Badge variant="outline" className="border-blue-500/30 bg-black/50 text-blue-300">
            {duration}
          </Badge>
          <Badge variant="outline" className="border-teal-500/30 bg-black/50 text-teal-300">
            {mood}
          </Badge>
        </div>

        <h3 className="mb-1 text-lg font-bold text-white">{title}</h3>
        <p className="mb-3 text-sm text-gray-300">Perfect for intense workouts</p>

        <Button
          className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500"
          onClick={onButtonClick}
        >
          <Play className="mr-2 h-4 w-4" />
          Play Playlist
        </Button>
      </div>

      <div className="absolute right-4 top-4 rounded-full bg-black/50 p-2 backdrop-blur-sm">
        <Headphones className="h-5 w-5 text-cyan-400" />
      </div>
    </motion.div>
  )
}

interface NutritionCardProps {
  title: string
  calories: number
  protein: number
  carbs: number
  fats: number
  image: string
  onButtonClick: () => void
}

function NutritionCard({ title, calories, protein, carbs, fats, image, onButtonClick }: NutritionCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden rounded-lg border border-green-500/20 bg-green-950/10"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-60"></div>
      <img
        src={image || "/placeholder.svg"}
        alt={title}
        className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="mb-2 flex flex-wrap gap-2">
          <Badge variant="outline" className="border-green-500/30 bg-black/50 text-green-300">
            {calories} cal
          </Badge>
          <Badge variant="outline" className="border-blue-500/30 bg-black/50 text-blue-300">
            P: {protein}g
          </Badge>
          <Badge variant="outline" className="border-yellow-500/30 bg-black/50 text-yellow-300">
            C: {carbs}g
          </Badge>
          <Badge variant="outline" className="border-red-500/30 bg-black/50 text-red-300">
            F: {fats}g
          </Badge>
        </div>

        <h3 className="mb-1 text-lg font-bold text-white">{title}</h3>
        <p className="mb-3 text-sm text-gray-300">High protein, nutrient-dense</p>

        <Button
          className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white hover:from-green-500 hover:to-teal-500"
          onClick={onButtonClick}
        >
          <Salad className="mr-2 h-4 w-4" />
          View Recipe
        </Button>
      </div>
    </motion.div>
  )
}
