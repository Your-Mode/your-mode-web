import ContentCard from "@/src/widgets/content/ui/content-card-vertical";
import { ContentItem } from "@/src/shared/types/content";
import styled from "@emotion/styled";
import { formatDate } from "@/src/shared/utils/formatDate";
import { Article } from "@/src/shared/api/content";

interface ContentsListProps {
  items?: Article[];
  filteredContent?: ContentItem[];
  onLoadMore?: () => void;
  isFetchingMore?: boolean;
}

const ContentsList = ({ filteredContent, items, onLoadMore, isFetchingMore}: ContentsListProps) => {
  if (!items?.length) {
    return <NoContentMessage>검색 결과가 없습니다. 다른 검색어나 필터를 시도해보세요.</NoContentMessage>;
  }

  console.log(items)
  return (
    <>
      <ContentGrid>
        {items.map((content) => (
          <ContentCard
            key={content.id}
            id={content.id.toString()}
            title={content.title}
            image={content.mainImgUrl}
            bodyType={content.bodyTypes.map(bt => bt.name).join(', ')}
            likes={content.likeCount}
            comments={content.commentCount}
            date={formatDate(content.createdAt)}
          />
        ))}
      </ContentGrid>

      {onLoadMore && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
          <button onClick={onLoadMore} disabled={isFetchingMore}>
            {isFetchingMore ? '불러오는 중…' : '더 보기'}
          </button>
        </div>
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
