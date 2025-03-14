"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import Link from "next/link" 

export default function ImageButtons() {
  const [selectedButton, setSelectedButton] = useState<number | null>(null)
  const queryParams = [
    {
      category: "business",
      id: "1",
    },
    {
      category: "casual",
      id: "1",
    },
    {
      category: "event",
      id: "1",
    },{
      category: "celebration",
      id: "1",
    }
  ]

    return (
      <div className="w-full max-w-4xl mx-auto p-6 bg-white">
        <div className="grid grid-cols-2 gap-6 md:gap-8">
          <div>
          </div>
        
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
                <Link href={{pathname: "/shop/result",query: queryParams[0],}}>
                  <Image
                    src="/images/Business_Deal.png"
                    alt="business"
                    fill
                    className="object-cover rounded-lg"
                  />
                  </Link>
              </div>
              <span className="font-medium text-lg">ビジネス</span>
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
                <Link href={{pathname: "/shop/result",query: queryParams[1],}}>
                <Image
                  src="/images/Team_Brainstorming.png"
                  alt="casual"
                  fill
                  className="object-cover rounded-lg"
                />
                </Link>
              </div>
              <span className="font-medium text-lg">カジュアル</span>
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
                <Link href={{pathname: "/shop/result",query: queryParams[2],}}>
                  <Image
                    src="/images/Having_Fun.png"
                    alt="event"
                    fill
                    className="object-cover rounded-lg"
                  />
                  </Link>
              </div>
              <span className="font-medium text-lg">イベント</span>
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
                <Link href={{pathname: "/shop/result",query: queryParams[3],}}>
                  <Image
                    src="/images/Hero_Employee.png"
                    alt="celebration"
                    fill
                    className="object-cover rounded-lg"
                  />
                  </Link>
              </div>
              <span className="font-medium text-lg">お祝い</span>
            </button>
        </div>
      </div>
    )
}
