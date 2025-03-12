"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"


export default function ImageButtons() {
  const [selectedButton, setSelectedButton] = useState<number | null>(null)

  const buttons = [
    {
      id: 1,
      image: "/placeholder.svg",
      label: "Button 1",
    },
    {
      id: 2,
      image: "/placeholder.svg",
      label: "Button 2",
    },
    {
      id: 3,
      image: "/placeholder.svg",
      label: "Button 3",
    },
    {
      id: 4,
      image: "/placeholder.svg",
      label: "Button 4",
    },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white">
      <div className="grid grid-cols-2 gap-6 md:gap-8">
       
          <button
            key="1"
            className={cn(
              "relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 overflow-hidden h-48 md:h-64",
              selectedButton === 1
                ? "border-primary shadow-lg scale-[1.02]"
                : "border-gray-200 hover:border-gray-300 hover:shadow",
            )}
            onClick={() => setSelectedButton(1)}
          >
            <div className="relative w-full h-32 md:h-44 mb-2">
              <Image
                src="https://tier-family.co.jp/wp-content/uploads/image4-36-1024x1024.jpg"
                alt="bisines"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <span className="font-medium text-lg">bisines</span>
          </button>

          <button
            key="2"
            className={cn(
              "relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 overflow-hidden h-48 md:h-64",
              selectedButton === 2
                ? "border-primary shadow-lg scale-[1.02]"
                : "border-gray-200 hover:border-gray-300 hover:shadow",
            )}
            onClick={() => setSelectedButton(2)}
          >
            <div className="relative w-full h-32 md:h-44 mb-2">
              <Image
                src="https://tier-family.co.jp/wp-content/uploads/image4-36-1024x1024.jpg"
                alt="kajual"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <span className="font-medium text-lg">kajual</span>
          </button>
          <button
            key="3"
            className={cn(
              "relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 overflow-hidden h-48 md:h-64",
              selectedButton === 3
                ? "border-primary shadow-lg scale-[1.02]"
                : "border-gray-200 hover:border-gray-300 hover:shadow",
            )}
            onClick={() => setSelectedButton(3)}
          >
            <div className="relative w-full h-32 md:h-44 mb-2">
              <Image
                src="https://tier-family.co.jp/wp-content/uploads/image4-36-1024x1024.jpg"
                alt="ivent"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <span className="font-medium text-lg">ivent</span>
          </button>
          <button
            key="4"
            className={cn(
              "relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 overflow-hidden h-48 md:h-64",
              selectedButton === 4
                ? "border-primary shadow-lg scale-[1.02]"
                : "border-gray-200 hover:border-gray-300 hover:shadow",
            )}
            onClick={() => setSelectedButton(4)}
          >
            <div className="relative w-full h-32 md:h-44 mb-2">
              <Image
                src="https://tier-family.co.jp/wp-content/uploads/image4-36-1024x1024.jpg"
                alt="celebration"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <span className="font-medium text-lg">celebration</span>
          </button>
      </div>
    </div>
  )
}
