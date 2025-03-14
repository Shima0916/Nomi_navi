"use client"

import { useState } from "react"
import { Check, Clock, MapPin, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/Eventform/badge"

export default function EventPage({ params }: { params: { id: string } }) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  
  const eventId = params.id
  const event = {
    id: eventId,
    title: "四半期計画会議",
    description:
      "Q1の結果を確認し、Q2の取り組みを計画します。各部署の最新情報と提案目標を準備してご参加ください。",
    location: "会議室AまたはZoom",
    proposedDates: [
      { id: "1", date: "2025年3月15日", time: "10:00 - 12:00", responses: { yes: 5, no: 1, maybe: 2 } },
      { id: "2", date: "2025年3月18日", time: "14:00 - 16:00", responses: { yes: 7, no: 0, maybe: 1 } },
      { id: "3", date: "2025年3月22日", time: "11:00 - 13:00", responses: { yes: 3, no: 3, maybe: 2 } },
    ],
  }

  const handleResponse = (response: "yes" | "no" | "maybe") => {
    if (!selectedDate) {
      alert("まず日付を選択してください")
      return
    }
    console.log(`日付 ${selectedDate} に対して ${response} と回答しました`)
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold">{event.title}</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>イベント詳細</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>{event.description}</p>
          <div className="flex items-start space-x-2 text-sm">
            <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-start space-x-2 text-sm">
            <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <span>回答期限: 2025年3月10日</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>提案された日程</CardTitle>
          <CardDescription>都合の良い日を選択してください</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {event.proposedDates.map((date) => (
              <div
                key={date.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-muted/50 ${selectedDate === date.id ? "border-primary bg-muted/50" : ""}`}
                onClick={() => setSelectedDate(date.id)}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${selectedDate === date.id ? "bg-primary text-primary-foreground" : "border"}`}
                  >
                    {selectedDate === date.id && <Check className="h-3 w-3" />}
                  </div>
                  <div>
                    <div className="font-medium">{date.date}</div>
                    <div className="text-sm text-muted-foreground">{date.time}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                  <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                    {date.responses.yes} 参加可能
                  </Badge>
                  <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
                    {date.responses.no} 不参加
                  </Badge>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                    {date.responses.maybe} 未定
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Button className="w-full sm:w-auto" onClick={() => handleResponse("yes")} disabled={!selectedDate}>
            <Check className="mr-2 h-4 w-4" /> 参加可能
          </Button>
          <Button variant="outline" className="w-full sm:w-auto" onClick={() => handleResponse("maybe")} disabled={!selectedDate}>
            未定
          </Button>
          <Button variant="outline" className="w-full sm:w-auto text-destructive hover:text-destructive" onClick={() => handleResponse("no")} disabled={!selectedDate}>
            <X className="mr-2 h-4 w-4" /> 不参加
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}