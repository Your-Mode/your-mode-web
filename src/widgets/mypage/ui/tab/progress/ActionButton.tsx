import { Button } from "@/src/shared/components/ui/button";
import { ChevronDown, ChevronUp, FileCheck } from "lucide-react";
import Link from "next/link";
import ReviewDialog from "@/src/widgets/mypage/ui/tab/progress/ReviewDialog";
import { MyContentItem } from "@/src/shared/types/content";
import styled from "@emotion/styled";

interface ActionButtonProps {
  content: MyContentItem;
  expandedTimelines: Set<string>;
  setExpandedTimelines: (expanded: Set<string>) => void;
  setThankYouModalOpen: (open: boolean) => void;
}

const ActionButton = ({ content, expandedTimelines, setExpandedTimelines, setThankYouModalOpen }: ActionButtonProps) => {
  const toggleTimeline = (contentId: string) => {
    const newExpanded = new Set(expandedTimelines);
    if (newExpanded.has(contentId)) {
      newExpanded.delete(contentId);
    } else {
      newExpanded.add(contentId);
    }
    setExpandedTimelines(newExpanded);
  };

  return (
    <ActionButtons>
      <Button variant="outline" size="sm" onClick={() => toggleTimeline(content.id)}>
        {expandedTimelines.has(content.id) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        진행 단계 확인
      </Button>
      <Link href={`/mypage/detail/${content.id}`}>
        <Button variant="outline" size="sm">
          <FileCheck size={16} />
          신청 내용 확인하기
        </Button>
      </Link>
      {content.status === "completed" &&
        <ReviewDialog id={content.id} setThankYouModalOpen={setThankYouModalOpen} />}
    </ActionButtons>
  );
};

export default ActionButton;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;
