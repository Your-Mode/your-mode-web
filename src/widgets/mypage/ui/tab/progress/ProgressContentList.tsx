import {
  Clock,
} from "lucide-react";
import { Card, CardContent } from "@/src/shared/components/ui/card";
import EmptyState from "../../EmptyState";
import styled from "@emotion/styled";
import { MyContentItem } from "@/src/shared/types/content";
import { useState } from "react";
import ProgressContentHeader from "@/src/widgets/mypage/ui/tab/progress/ProgressContentHeader";
import ProgressBar from "@/src/widgets/mypage/ui/tab/progress/ProgressBar";
import Tags from "@/src/widgets/mypage/ui/tab/progress/Tags";
import TimeLine from "@/src/widgets/mypage/ui/tab/progress/TimeLine";
import ActionButton from "@/src/widgets/mypage/ui/tab/progress/ActionButton";

interface ProgressContentListProps {
  setThankYouModalOpen: (open: boolean) => void;
  filteredContents: MyContentItem[];
}

const ProgressContentList = ({ setThankYouModalOpen, filteredContents }: ProgressContentListProps) => {
  const [expandedTimelines, setExpandedTimelines] = useState<Set<string>>(new Set());

  return (
    <>
      {filteredContents.length > 0 ? (
        <ContentList>
          {filteredContents.map((content) => (
            <ContentCardContainer key={content.id}>
              <ProgressContentHeader content={content} />
              <CardContent>
                <ProgressBar progress={content.progress} />
                <Tags content={content} />
                <TimeLine content={content} expandedTimelines={expandedTimelines} />
                <ActionButton
                  content={content}
                  expandedTimelines={expandedTimelines}
                  setExpandedTimelines={setExpandedTimelines}
                  setThankYouModalOpen={setThankYouModalOpen}
                />
              </CardContent>
            </ContentCardContainer>
          ))}
        </ContentList>
      ) : (
        <EmptyState
          icon={<Clock size={64} />}
          title="진행 중인 신청이 없습니다"
          description="맞춤형 스타일링 컨텐츠를 신청해보세요."
          actionLink="/content-application"
          actionText="맞춤형 컨텐츠 신청하기"
        />
      )}
    </>
  );
};

export default ProgressContentList;

const ContentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ContentCardContainer = styled(Card)`
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
    border-color: #ff3e6c;
  }
`;
