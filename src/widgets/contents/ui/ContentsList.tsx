import ContentCard from "@/src/widgets/content/ui/content-card-vertical";
import { ContentItem } from "@/src/shared/types/content";
import styled from "@emotion/styled";

interface ContentsListProps {
  filteredContent: ContentItem[];
}

const ContentsList = ({ filteredContent }: ContentsListProps) => {
  return (
    <>
      {filteredContent.length > 0 ? (
        <ContentGrid>
          {filteredContent.map((content) => (
            <ContentCard
              key={content.id}
              id={content.id}
              title={content.title}
              image={content.image}
              bodyType={content.bodyType}
              likes={content.likes}
              comments={content.comments}
              date={content.date}
            />
          ))}
        </ContentGrid>
      ) : (
        <NoContentMessage>검색 결과가 없습니다. 다른 검색어나 필터를 시도해보세요.</NoContentMessage>
      )}
    </>
  )
}

export default ContentsList;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
  }
`;

const NoContentMessage = styled.div`
  text-align: center;
  padding: 3rem 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fonts.size.lg};
`;
