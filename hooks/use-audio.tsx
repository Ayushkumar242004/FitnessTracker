"use client"

import { useEffect, useRef, useState } from "react"

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const playSound = (src: string) => {
    if (typeof window !== "undefined") {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }

      const audio = new Audio(src)
      audioRef.current = audio

      audio.volume = 0.3
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.error("Error playing audio:", error))

      audio.onended = () => {
        setIsPlaying(false)
        audioRef.current = null
      }
    }
  }

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  return { playSound, stopSound, isPlaying }
}
