"use client";

import { useRouter } from "next/navigation";

export default function ThankYouPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-green-600">回答ありがとうございました！</h1>
        <p className="text-gray-600 mt-2">ご協力に感謝します。</p>
      </div>
    </div>
  );
}
