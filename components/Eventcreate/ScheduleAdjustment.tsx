"use client"

import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/Eventcreate/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/Eventcreate/textarea';
import { Shop } from '@/types';
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

export default function ScheduleAdjustment({ restaurantData }: { restaurantData: Shop }) {
    const [selectedDates, setSelectedDates] = useState<string[]>([]);
    const [startTime, setStartTime] = useState<string>('');
    const [endTime, setEndTime] = useState<string>('');
    const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(undefined);
    const [customNotice, setCustomNotice] = useState<string>('');
    const [copySuccess, setCopySuccess] = useState<boolean>(false);

    // 自動生成の周知文を更新する関数
    const generateNotice = () => {
        return `
＝＝
社員向け周知文の例
--------------
📢 開発月１ランチのお知らせ: ${restaurantData.name}
--------------
📅 日時：${selectedDates.join(', ')} ${startTime && endTime ? `${startTime}～${endTime}` : ''}
✅ 参加できる方は「参加」スタンプをお願いします！
`;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        setCustomNotice(generateNotice());
    }, [selectedDates, startTime, endTime, restaurantData.name]);

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

    const handleCopy = () => {
        navigator.clipboard.writeText(customNotice);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
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
                            <div className="flex gap-2">
                                <select
                                    className="w-1/2 border rounded-md p-2"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                >
                                    <option value="">開始時間</option>
                                    <option value="12:00">12:00</option>
                                    <option value="13:00">13:00</option>
                                    <option value="18:00">18:00</option>
                                    <option value="19:00">19:00</option>
                                </select>
                                <span className="self-center">～</span>
                                <select
                                    className="w-1/2 border rounded-md p-2"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                >
                                    <option value="">終了時間</option>
                                    <option value="13:00">13:00</option>
                                    <option value="14:00">14:00</option>
                                    <option value="19:00">19:00</option>
                                    <option value="20:00">20:00</option>
                                </select>
                            </div>
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
                        <p><strong>時間帯:</strong> {startTime && endTime ? `${startTime}～${endTime}` : '未選択'}</p>

                        {/* 周知文編集可能エリア */}
                        <div className="mt-4">
                            <h4 className="font-semibold mb-2">自動生成された周知文（編集可）</h4>
                            <Textarea
                                className="w-full p-2 border rounded-md h-32"
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
            </div>
        </div>
    );
}
