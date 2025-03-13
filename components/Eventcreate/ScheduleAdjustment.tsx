"use client"

import React, { useState } from 'react';
import { Calendar } from '@/components/Eventcreate/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shop } from '@/types';
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

export default function ScheduleAdjustment({ restaurantData }: { restaurantData: Shop }) {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(undefined);

  const addDate = (range: DateRange | undefined) => {
    if (range && range.from) {
      const formattedDate = format(range.from, "yyyy-MM-dd"); // `Date` を `YYYY-MM-DD` の `string` に変換
      if (!selectedDates.includes(formattedDate)) {
        setSelectedDates([...selectedDates, formattedDate]);
      }
      setSelectedRange(range);
    }
  };

  const removeDate = (dateToRemove: string) => {
    setSelectedDates(selectedDates.filter(date => date !== dateToRemove));
  };

  const generatedNotice = `
＝＝
社員向け周知文の例
--------------
📢 開発月１ランチのお知らせ: ${restaurantData.name}
--------------
📅 日時：${selectedDates.join(', ')} ${selectedTimeSlot}
✅ 参加できる方は「参加」スタンプをお願いします！
`;  

  return (
    <div className="container mx-auto p-4">
      {/* タイトルセクション */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold">スケジュール調整</h1>
        <p className="text-gray-600">会食のスケジュールを簡単に設定</p>
      </header>
      
      {/* メインレイアウト */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* 左側: 入力フォーム */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">日程を選択</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold text-lg">会食タイトル: {restaurantData.name}</p>
            
            {/* カレンダー選択 */}
            <Calendar
              selected={selectedRange}
              onSelect={addDate}
              mode="range"
            />
            
            {/* 選択済み日程表示 */}
            <div className="mt-2 text-sm text-gray-600">
              <p className="font-semibold">選択済み日程:</p>
              {selectedDates.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedDates.map((date) => (
                    <span key={date} className="bg-gray-200 p-1 rounded flex items-center">
                      {date}
                      <button 
                        className="ml-2 text-red-500 text-xs" 
                        onClick={() => removeDate(date)}
                      >✖</button>
                    </span>
                  ))}
                </div>
              ) : (
                <span>未選択</span>
              )}
            </div>
            
            {/* 時間帯選択 */}
            <div className="mt-4">
              <label className="block text-sm font-semibold">時間帯</label>
              <select 
                className="mt-1 w-full border rounded-md p-2" 
                value={selectedTimeSlot} 
                onChange={(e) => setSelectedTimeSlot(e.target.value)}
              >
                <option value="">選択してください</option>
                <option value="12:00～13:30">12:00～13:30</option>
                <option value="18:00～20:00">18:00～20:00</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* 右側: プレビュー */}
        <Card>
          <CardHeader>
            <CardTitle>スケジュールプレビュー</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>会食タイトル:</strong> {restaurantData.name}</p>
            <p><strong>候補日程:</strong> {selectedDates.join(', ') || '未選択'}</p>
            <p><strong>時間帯:</strong> {selectedTimeSlot || '未選択'}</p>
            
            {/* 周知文プレビュー */}
            <div className="mt-4 p-3 bg-gray-100 rounded-md">
              <h4 className="font-semibold mb-2">自動生成された周知文</h4>
              <pre className="whitespace-pre-wrap text-sm">{generatedNotice}</pre>
            </div>
            
            {/* コピー機能 */}
            <Button className="mt-4 w-full" onClick={() => navigator.clipboard.writeText(generatedNotice)}>
              コピーする
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
