import { CheckCircle } from "lucide-react";
import { MyContentItem } from "@/src/shared/types/content";
import styled from "@emotion/styled";

interface TimeLineProps {
  content: MyContentItem;
  expandedTimelines: Set<string>;
}

const TimeLine = ({ content, expandedTimelines }: TimeLineProps) => {
  return (
    <TimelineSection isExpanded={expandedTimelines.has(content.id)}>
      <TimelineTitle>진행 단계</TimelineTitle>
      <TimelineList>
        {content.timeline.map((step, index) => (
          <TimelineItem key={index} completed={step.completed}>
            <TimelineIcon completed={step.completed}>
              {step.completed && <CheckCircle size={12} color="white" />}
            </TimelineIcon>
            <span>{step.step}</span>
            {step.date && <span className="text-xs">({step.date})</span>}
          </TimelineItem>
        ))}
      </TimelineList>
    </TimelineSection>
  );
};

export default TimeLine;

const TimelineSection = styled.div<{ isExpanded: boolean }>`
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
  max-height: ${(props) => (props.isExpanded ? "500px" : "0")};
  overflow: hidden;
  opacity: ${(props) => (props.isExpanded ? "1" : "0")};
  transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
`;

const TimelineTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.75rem;
`;

const TimelineList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TimelineItem = styled.div<{ completed: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: ${(props) => (props.completed ? "#10b981" : "#666")};
`;

const TimelineIcon = styled.div<{ completed: boolean }>`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background-color: ${(props) => (props.completed ? "#10b981" : "#e5e7eb")};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;
