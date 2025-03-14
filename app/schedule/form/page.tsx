"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Check, Clock, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/Eventform/badge";

export default function EventPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [proposedDates, setProposedDates] = useState<{ date: string; startTime: string; endTime: string }[]>([]);

  useEffect(() => {
    const datesParam = searchParams.get("dates");
    if (datesParam) {
      try {
        const decodedDates = JSON.parse(decodeURIComponent(datesParam));
        setProposedDates(decodedDates);
      } catch (error) {
        console.error("Invalid date format:", error);
      }
    }
  }, [searchParams]);

  const handleResponse = (response: "yes" | "no" | "maybe") => {
    if (!selectedDate) {
      alert("まず日付を選択してください");
      return;
    }
    console.log(`日付 ${selectedDate} に対して ${response} と回答しました`);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold">スケジュール確認</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>イベント詳細</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>提案された日程を確認してください。</p>
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
            {proposedDates.length > 0 ? (
              proposedDates.map((date, index) => (
                <div
                  key={index}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-muted/50 ${selectedDate === date.date ? "border-primary bg-muted/50" : ""}`}
                  onClick={() => setSelectedDate(date.date)}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${selectedDate === date.date ? "bg-primary text-primary-foreground" : "border"}`}
                    >
                      {selectedDate === date.date && <Check className="h-3 w-3" />}
                    </div>
                    <div>
                      <div className="font-medium">{date.date}</div>
                      <div className="text-sm text-muted-foreground">
                        {date.startTime && date.endTime ? `${date.startTime}～${date.endTime}` : "時間未設定"}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">日程が選択されていません。</p>
            )}
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
  );
}