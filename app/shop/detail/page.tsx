"use client";
import type React from "react";
import Image from "next/image";
import {
  MapPin,
  Clock,
  Phone,
  DollarSign,
  Tag,
  Car,
  CreditCard,
  Wifi,
  Users,
  Utensils,
  Wine,
  Ban,
  Baby,
  Globe,
  Star,
  StarHalf,
  Send,
  User,
} from "lucide-react";
import { Shop } from "@/types";
// ReviewSection はクライアントコンポーネントとして実装済み（"use client" をその内部で記述）
import ReviewSection, { Review } from "@/components/ui/ReviewSection";
import Parent from "./Parent";
import Main  from "./Main";
import { useState } from "react";

// サーバーコンポーネントなので "use client" は使いません

interface ReviewSelectionProps {
  averageRating: number;
}

const initialReviews: Review[] = [
  {
    id: "1",
    userName: "沖縄グルメ好き",
    rating: 4.5,
    comment:
      "沖縄旅行で訪れました。もとぶ牛の焼肉は本当に美味しかったです！特にカルビとロースがジューシーで絶品でした。店内も清潔で、スタッフの方々の対応も丁寧でした。ただ、週末だったためか少し混雑していて、料理が出てくるまで少し時間がかかりました。それでも、また訪れたいお店です。",
    date: "2023-12-15",
    userImage: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "2",
    userName: "焼肉マスター",
    rating: 5,
    comment:
      "県内の焼肉店を数多く訪れましたが、ここのもとぶ牛は別格です。肉質が良く、特に「特選もとぶ牛盛り合わせ」は絶対に注文すべきです。接客も素晴らしく、肉の焼き方なども丁寧に教えてくれます。個室を予約したので、家族でゆっくり楽しめました。価格はやや高めですが、その価値は十分にあります。",
    date: "2023-11-20",
    userImage: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "3",
    userName: "名護市民",
    rating: 4,
    comment:
      "地元民としてよく利用しています。安定した味で、特に平日のランチがおすすめです。コスパが良く、もとぶ牛を手頃に楽しめます。夜はやや混雑するので予約必須です。駐車場も広いので車でのアクセスも便利です。",
    date: "2024-01-05",
    userImage: "/placeholder.svg?height=50&width=50",
  },
];

export default function DetailPage({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "", userName: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

   const handleSubmitReview = (e: React.FormEvent) => {
      e.preventDefault();
  
      if (newReview.rating === 0) {
        alert("評価を選択してください");
        return;
      }
  
      if (!newReview.userName.trim()) {
        alert("お名前を入力してください");
        return;
      }
  
      setIsSubmitting(true);
  
      // 本来はここでAPIリクエストを行います
      setTimeout(() => {
        const review: Review = {
          id: Date.now().toString(),
          userName: newReview.userName,
          rating: newReview.rating,
          comment: newReview.comment,
          date: new Date().toISOString().split("T")[0],
          userImage: "/placeholder.svg?height=50&width=50",
        };
  
        setReviews([review, ...reviews]);
        setNewReview({ rating: 0, comment: "", userName: "" });
        setIsSubmitting(false);
        setShowThankYou(true);
  
        setTimeout(() => {
          setShowThankYou(false);
        }, 3000);
      }, 1000);
    };
  



  const { id } = searchParams;
  if (!id) return <div>ID が指定されていません。</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        <Main searchParams={searchParams}/>

        {/* Reviews Section */}
        <Parent initialReviews={reviews} showThankYou={showThankYou} handleSubmitReview={handleSubmitReview} newReview={newReview} isSubmitting={isSubmitting} setNewReview={setNewReview}/>
      </div>
    </div>
  );
}
