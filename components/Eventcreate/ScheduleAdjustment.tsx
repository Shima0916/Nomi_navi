"use client"

import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/Eventcreate/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/Eventcreate/textarea';
import { Shop } from '@/types';
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { useRouter } from 'next/navigation';

export default function ScheduleAdjustment({ restaurantData }: { restaurantData: Shop }) {
  const [selectedDates, setSelectedDates] = useState<{ date: string; startTime: string; endTime: string }[]>([]);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(undefined);
  const [customNotice, setCustomNotice] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  // 自動生成の周知文を更新する関数
  const generateNotice = () => {
    const formattedDates = selectedDates.map(({ date, startTime, endTime }) => 
      `${date} ${startTime && endTime ? `${startTime}～${endTime}` : ''}`
    ).join(', ');
    const encodedDates = encodeURIComponent(JSON.stringify(selectedDates));

    return `
--------------
🍖会食のお知らせ: ${restaurantData.name}
--------------
📅 日時：${formattedDates}
次のURLから参加登録をお願いします！
${process.env.NEXT_PUBLIC_API_HOST}/schedule/form?dates=${encodedDates}&id=${restaurantData.id}
`;
  };

  useEffect(() => {
    setCustomNotice(generateNotice());
  }, [selectedDates, restaurantData.name]);

  const addDate = (range: DateRange | undefined) => {
    if (range && range.from) {
      const formattedDate = format(range.from, "yyyy-MM-dd"); // `Date` を `YYYY-MM-DD` の `string` に変換
      setSelectedDates(prevState => {
        if (!prevState.some(d => d.date === formattedDate)) {
          return [...prevState, { date: formattedDate, startTime: '', endTime: '' }];
        }
        return prevState;
      });
      setSelectedRange(range);
    }
  };

  const removeDate = (dateToRemove: string) => {
    setSelectedDates(prevState => prevState.filter(({ date }) => date !== dateToRemove));
  };

  const updateTime = (dateToUpdate: string, key: 'startTime' | 'endTime', value: string) => {
    setSelectedDates(prevState => prevState.map(d => 
      d.date === dateToUpdate ? { ...d, [key]: value } : d
    ));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(customNotice);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const router = useRouter();

  const handleNavigate = () => {
    const encodedDates = encodeURIComponent(JSON.stringify(selectedDates));
    router.push(`/schedule/form?dates=${encodedDates}&id=${restaurantData.id}`);
    console.log("😊😊😊😊😊😊😊😊😊😊😊😊"+restaurantData.id)
  };


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
            <div className="flex justify-center">
              <Calendar
                selected={selectedRange}
                onSelect={addDate}
                mode="range"
              />
            </div>
            
            {/* 選択済み日程表示 */}
            <div className="mt-2 text-sm text-gray-600">
              <p className="font-semibold">選択済み日程:</p>
              {selectedDates.length > 0 ? (
                <div className="space-y-2 mt-1">
                  {selectedDates.map(({ date, startTime, endTime }) => (
                    <div key={date} className="flex items-center gap-2 bg-gray-200 p-2 rounded">
                      <span>{date}</span>
                      <select 
                        className="border rounded-md p-1"
                        value={startTime} 
                        onChange={(e) => updateTime(date, 'startTime', e.target.value)}
                      >
                        <option value="">開始時間</option>
                        <option value="12:00">12:00</option>
                        <option value="13:00">13:00</option>
                        <option value="18:00">18:00</option>
                        <option value="19:00">19:00</option>
                      </select>
                      <span>～</span>
                      <select 
                        className="border rounded-md p-1"
                        value={endTime} 
                        onChange={(e) => updateTime(date, 'endTime', e.target.value)}
                      >
                        <option value="">終了時間</option>
                        <option value="13:00">13:00</option>
                        <option value="14:00">14:00</option>
                        <option value="19:00">19:00</option>
                        <option value="20:00">20:00</option>
                      </select>
                      <button className="text-red-500 text-xs" onClick={() => removeDate(date)}>✖</button>
                    </div>
                  ))}
                </div>
              ) : (
                <span>未選択</span>
              )}
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
            <p><strong>候補日程:</strong> {selectedDates.map(({ date, startTime, endTime }) => 
              `${date} ${startTime && endTime ? `${startTime}～${endTime}` : ''}`
            ).join(', ') || '未選択'}</p>
            
            {/* 周知文編集可能エリア */}
            <div className="mt-4">
              <h4 className="font-semibold mb-2">自動生成された周知文（編集可）</h4>
              <Textarea 
                className="w-full p-2 border rounded-md h-80" 
                value={customNotice} 
                onChange={(e) => setCustomNotice(e.target.value)}
              />
            </div>
            
            {/* コピー機能 */}
            <Button className="mt-4 w-full" onClick={handleCopy}>
              {copySuccess ? "コピーしました！" : "コピーする"}
            </Button>
          </CardContent>
        </Card>
              {/* 右下にスケジュールフォームへのボタンを配置 */}
              <Button 
            className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600" 
            onClick={handleNavigate}>
            日程調整へ
        </Button>

      </div>
    </div>
  );
}
