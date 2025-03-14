"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Check, Clock, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shop } from "@/types";

export default function EventPage() {
  const searchParams = useSearchParams();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [responses, setResponses] = useState<Record<string, "yes" | "no" | "maybe" | null>>({});
  const [proposedDates, setProposedDates] = useState<{ date: string; startTime: string; endTime: string }[]>([]);
  const [restaurantData, setRestaurantData] = useState<Shop | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const id = searchParams.get("id");

  // 日程データを取得
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

  // 店舗データを取得
  useEffect(() => {
    if (!id) return;

    const fetchShopData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/shops?id=${id}`);
        if (!res.ok) {
          throw new Error("データ取得エラーです");
        }
        const jsondata = await res.json();
        setRestaurantData(jsondata[0]);
      } catch (error) {
        //setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShopData();
  }, [id]);

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

  console.log("🟢🟢🟢🟢🟢🟢🟢 ID:", id, "🟢🟢🟢🟢🟢🟢🟢");
  console.log("🏠 店舗データ:", restaurantData);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold">スケジュール確認</h1>

      {loading ? (
        <p>データ取得中...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : restaurantData ? (
        <Card>
          <CardHeader>
            <CardTitle>店舗情報</CardTitle>
          </CardHeader>
          <CardContent>
            <p>店舗名: {restaurantData.name}</p>
            <p>住所: {restaurantData.address}</p>
          </CardContent>
        </Card>
      ) : (
        <p className="text-gray-500">店舗情報が見つかりません。</p>
      )}

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
