import { AlertCircle, Calendar, CheckCircle, Clock, FileText, User } from "lucide-react";
import { CardDescription, CardHeader, CardTitle } from "@/src/shared/components/ui/card";
import { getStatusText } from "@/src/widgets/mypage/feature/utils/utils";
import styled from "@emotion/styled";
import { Badge } from "@/src/shared/components/ui/badge";
import { ContentStatus, MyContentItem } from "@/src/shared/types/content";

interface ProgressContentHeaderProps {
  content: MyContentItem;
}

const ProgressContentHeader = ({ content }: ProgressContentHeaderProps) => {
  const { title, applicationDate, expectedDate, status, description, editorName } = content;

  const getStatusIcon = (status: ContentStatus) => {
    switch (status) {
      case "pending":
        return <Clock size={14} />;
      case "assigned":
        return <User size={14} />;
      case "in-progress":
        return <FileText size={14} />;
      case "review":
        return <AlertCircle size={14} />;
      case "completed":
        return <CheckCircle size={14} />;
      case "cancelled":
        return <AlertCircle size={14} />;
      default:
        return <Clock size={14} />;
    }
  };

  return (
    <CardHeaderSection>
      <ContentHeader>
        <ContentInfo>
          <ContentTitle>{title}</ContentTitle>
          <ContentMeta>
            <MetaItem>
              <Calendar size={14} />
              신청일: {applicationDate}
            </MetaItem>
            {expectedDate && (
              <MetaItem>
                <Clock size={14} />
                예상 완료: {expectedDate}
              </MetaItem>
            )}
            {editorName && (
              <MetaItem>
                <User size={14} />
                담당 에디터: {editorName}
              </MetaItem>
            )}
          </ContentMeta>
          <CardDescription>{description}</CardDescription>
        </ContentInfo>

        <StatusSection>
          <StatusBadge status={status}>
            {getStatusIcon(status)}
            {getStatusText(status)}
          </StatusBadge>
        </StatusSection>
      </ContentHeader>
    </CardHeaderSection>
  );
};

export default ProgressContentHeader;

const CardHeaderSection = styled(CardHeader)`
  padding-bottom: 1rem;
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const ContentInfo = styled.div`
  flex: 1;
`;

const ContentTitle = styled(CardTitle)`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #333;

  @media (max-width: 640px) {
    font-size: 1.125rem;
  }
`;

const ContentMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  color: #666;

  @media (max-width: 640px) {
    gap: 0.5rem;
    font-size: 0.8rem;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const StatusSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  min-width: 120px;

  @media (max-width: 768px) {
    align-items: flex-start;
    min-width: auto;
  }
`;

const StatusBadge = styled(Badge)<{
  status: "pending" | "assigned" | "in-progress" | "review" | "completed" | "cancelled"
}>`
  background-color: ${(props) => {
    switch (props.status) {
      case "pending":
        return "#f59e0b";
      case "assigned":
        return "#8b5cf6";
      case "in-progress":
        return "#3b82f6";
      case "review":
        return "#06b6d4";
      case "completed":
        return "#10b981";
      case "cancelled":
        return "#ef4444";
      default:
        return "#f59e0b";
    }
  }};

  &:hover {
    background-color: ${(props) => {
      switch (props.status) {
        case "pending":
          return "#d97706";
        case "assigned":
          return "#7c3aed";
        case "in-progress":
          return "#2563eb";
        case "review":
          return "#0891b2";
        case "completed":
          return "#059669";
        case "cancelled":
          return "#dc2626";
        default:
          return "#d97706";
      }
    }};
  }
`;
