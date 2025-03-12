"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function ImageButtons() {
  const [selectedButton, setSelectedButton] = useState<number | null>(null)

  const buttons = [
    {
      id: 1,
      image: "/placeholder.svg?height=200&width=200",
      label: "Button 1",
    },
    {
      id: 2,
      image: "/placeholder.svg?height=200&width=200",
      label: "Button 2",
    },
    {
      id: 3,
      image: "/placeholder.svg?height=200&width=200",
      label: "Button 3",
    },
    {
      id: 4,
      image: "/placeholder.svg?height=200&width=200",
      label: "Button 4",
    },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white">
      <div className="grid grid-cols-2 gap-6 md:gap-8">
        {buttons.map((button) => (
          <button
            key={button.id}
            className={cn(
              "relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 overflow-hidden h-48 md:h-64",
              selectedButton === button.id
                ? "border-primary shadow-lg scale-[1.02]"
                : "border-gray-200 hover:border-gray-300 hover:shadow",
            )}
            onClick={() => setSelectedButton(button.id)}
          >
            <div className="relative w-full h-32 md:h-44 mb-2">
              <Image
                src={button.image || "/placeholder.svg"}
                alt={button.label}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <span className="font-medium text-lg">{button.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

