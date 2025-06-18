import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/shared/components/ui/dialog";
import { Button } from "@/src/shared/components/ui/button";
import { MessageSquare, Star } from "lucide-react";
import { Label } from "@/src/shared/components/ui/label";
import { Textarea } from "@/src/shared/components/ui/textarea";
import styled from "@emotion/styled";
import { useState } from "react";

interface ReviewDialogProps {
  setThankYouModalOpen: (open: boolean) => void;
  id: string;
}

const ReviewDialog = ({ setThankYouModalOpen, id }: ReviewDialogProps) => {
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedContentId, setSelectedContentId] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleReviewSubmit = () => {
    console.log("Review submitted:", { contentId: selectedContentId, rating, reviewText });
    setReviewModalOpen(false);
    setThankYouModalOpen(true);
    setSelectedContentId(null);
    setRating(0);
    setReviewText("");
  };

  return (
    <Dialog open={reviewModalOpen} onOpenChange={setReviewModalOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={() => setSelectedContentId(id)}>
          <MessageSquare size={16} />
          후기 작성
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>스타일링 후기 작성</DialogTitle>
          <DialogDescription>
            받으신 스타일링 서비스는 어떠셨나요? 솔직한 후기를 남겨주세요.
          </DialogDescription>
        </DialogHeader>
        <ReviewForm>
          <div>
            <Label htmlFor="rating">만족도</Label>
            <StarRating>
              {[1, 2, 3, 4, 5].map((star) => (
                <StarButton
                  key={star}
                  type="button"
                  filled={star <= rating}
                  onClick={() => setRating(star)}
                >
                  <Star size={24} fill={star <= rating ? "currentColor" : "none"} />
                </StarButton>
              ))}
            </StarRating>
          </div>
          <div>
            <Label htmlFor="review">후기 내용</Label>
            <Textarea
              id="review"
              placeholder="스타일링 서비스에 대한 솔직한 후기를 작성해주세요..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </ReviewForm>
        <DialogFooter>
          <Button variant="outline" onClick={() => setReviewModalOpen(false)}>
            취소
          </Button>
          <Button onClick={handleReviewSubmit} disabled={rating === 0 || !reviewText.trim()}>
            후기 등록
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;

const ReviewForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StarRating = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
`;

const StarButton = styled.button<{ filled: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => (props.filled ? "#fbbf24" : "#d1d5db")};
  transition: color 0.2s;

  &:hover {
    color: #fbbf24;
  }
`;
