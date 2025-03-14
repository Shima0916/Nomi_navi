"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Check, Clock, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function EventPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [responses, setResponses] = useState<Record<string, "yes" | "no" | "maybe" | null>>({});
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

  const handleResponse = (date: string, response: "yes" | "no" | "maybe") => {
    setResponses((prevResponses) => ({ ...prevResponses, [date]: response }));
    setSelectedDate(date);
  };

  const handleSubmit = () => {
    if (!selectedDate || !responses[selectedDate]) {
      alert("日付と回答を選択してください");
      return;
    }
    console.log(`日付 ${selectedDate} に対して ${responses[selectedDate]} と回答しました`);
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
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border cursor-pointer transition duration-300 ease-in-out ${responses[date.date] === "yes" ? "bg-green-100 bg-opacity-50 border-green-600" : responses[date.date] === "maybe" ? "bg-yellow-100 bg-opacity-50 border-yellow-600" : responses[date.date] === "no" ? "bg-red-100 bg-opacity-50 border-red-600" : "hover:bg-muted/50"}`}
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
                  <div className="flex space-x-2 mt-2 sm:mt-0">
                    <Button variant={responses[date.date] === "yes" ? "default" : "outline"} onClick={() => handleResponse(date.date, "yes")}>参加可能</Button>
                    <Button variant={responses[date.date] === "maybe" ? "default" : "outline"} onClick={() => handleResponse(date.date, "maybe")}>未定</Button>
                    <Button variant={responses[date.date] === "no" ? "default" : "outline"} onClick={() => handleResponse(date.date, "no")} className="text-destructive">不参加</Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">日程が選択されていません。</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center mt-4">
          <Button className="bg-blue-500 text-white hover:bg-blue-600" onClick={handleSubmit} disabled={!selectedDate || !responses[selectedDate]}>
            <Send className="mr-2 h-4 w-4" /> 送信する
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
