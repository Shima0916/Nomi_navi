import ReviewSection, { Review } from "@/components/ui/ReviewSection";

export default function Parent({ initialReviews, showThankYou, handleSubmitReview, newReview, isSubmitting,setNewReview}: { initialReviews: Review[]; showThankYou: boolean ;handleSubmitReview: (e: React.FormEvent) => void;newReview: { rating: number; comment: string; userName: string };isSubmitting: boolean;setNewReview: (newReview: { rating: number; comment: string; userName: string }) => void;}) {
  return (
    <div>
      <ReviewSection initialReviews={initialReviews} showThankYou={showThankYou} handleSubmitReview={handleSubmitReview} newReview={newReview} isSubmitting={isSubmitting} setNewReview={setNewReview}/>
    </div>
  );
}
