// components/ReviewSection.tsx
"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Star, StarHalf, Send, User } from "lucide-react"

// レビューの型定義
export type Review = {
  id: string
  userName: string
  rating: number
  comment: string
  date: string
  userImage?: string
}

// ページ側から渡されるレビューの props 用の型
type ReviewSectionProps = {
  reviews: Review[]
}

// 星評価コンポーネント
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && <StarHalf className="w-5 h-5 fill-yellow-400 text-yellow-400" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
      ))}
      <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  )
}

// 選択可能な星評価コンポーネント
const SelectableStarRating = ({
  rating,
  setRating,
}: {
  rating: number
  setRating: (rating: number) => void
}) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          className="focus:outline-none"
        >
          <Star
            className={`w-7 h-7 ${
              rating >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        </button>
      ))}
      <span className="ml-2 text-sm font-medium">
        {rating > 0 ? `${rating}.0` : "評価を選択"}
      </span>
    </div>
  )
}

const ReviewSection = ({ reviews: initialReviews }: ReviewSectionProps) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [newReview, setNewReview] = useState({ rating: 0, comment: "", userName: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)

  // 平均評価の計算
  const averageRating =
    reviews.length > 0 ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length : 0

  // レビュー送信処理
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()

    if (newReview.rating === 0) {
      alert("評価を選択してください")
      return
    }
    if (!newReview.userName.trim()) {
      alert("お名前を入力してください")
      return
    }

    setIsSubmitting(true)
    // APIリクエストなどの代わりにタイマーで模擬処理
    setTimeout(() => {
      const review: Review = {
        id: Date.now().toString(),
        userName: newReview.userName,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split("T")[0],
        userImage: "/placeholder.svg?height=50&width=50",
      }

      setReviews([review, ...reviews])
      setNewReview({ rating: 0, comment: "", userName: "" })
      setIsSubmitting(false)
      setShowThankYou(true)

      setTimeout(() => {
        setShowThankYou(false)
      }, 3000)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">口コミ・評価</h2>

      {/* 平均評価 */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center">
            <p className="text-4xl font-bold text-yellow-500">{averageRating.toFixed(1)}</p>
            <StarRating rating={averageRating} />
            <p className="text-sm text-muted-foreground mt-1">{reviews.length}件の評価</p>
          </div>
          <div className="w-full md:w-3/4 space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = reviews.filter((r) => Math.floor(r.rating) === star).length
              const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
              return (
                <div key={star} className="flex items-center gap-2">
                  <div className="flex items-center w-16">
                    <span className="text-sm font-medium">{star}</span>
                    <Star className="w-4 h-4 ml-1 text-yellow-400" />
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-yellow-400 h-2.5 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-muted-foreground w-12">{count}件</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* レビュー投稿フォーム */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-4">レビューを投稿</h3>
        {showThankYou ? (
          <div
            className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <p className="font-medium">ありがとうございます！</p>
            <p className="text-sm">レビューが投稿されました。</p>
          </div>
        ) : (
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label htmlFor="rating" className="block text-sm font-medium mb-2">
                評価
              </label>
              <SelectableStarRating
                rating={newReview.rating}
                setRating={(rating) => setNewReview({ ...newReview, rating })}
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                お名前
              </label>
              <input
                type="text"
                id="name"
                value={newReview.userName}
                onChange={(e) =>
                  setNewReview({ ...newReview, userName: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="名前を入力"
                required
              />
            </div>
            <div>
              <label htmlFor="comment" className="block text-sm font-medium mb-2">
                コメント
              </label>
              <textarea
                id="comment"
                rows={4}
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="ご感想をお聞かせください（任意）"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  送信中...
                </span>
              ) : (
                <span className="flex items-center">
                  <Send className="mr-2 h-4 w-4" />
                  レビューを投稿
                </span>
              )}
            </button>
          </form>
        )}
      </div>

      {/* 口コミ一覧 */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">口コミ一覧</h3>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="rounded-lg border bg-card text-card-foreground shadow-sm p-6"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden relative bg-gray-200">
                      {review.userImage ? (
                        <Image
                          src={review.userImage || "/placeholder.svg"}
                          alt={review.userName}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <User className="w-full h-full p-2 text-gray-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{review.userName}</p>
                      <div className="flex items-center mt-1">
                        <StarRating rating={review.rating} />
                        <span className="text-sm text-muted-foreground ml-2">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {review.comment && (
                  <div className="mt-3 text-muted-foreground">
                    <p>{review.comment}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>まだ口コミはありません。最初のレビューを投稿してみませんか？</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReviewSection
