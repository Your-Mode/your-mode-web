import Image from "next/image";
import styled from "@emotion/styled";

const RelatedContent = () => {
  return (
    <RelatedSection>
      <SectionTitle>컨텐츠 둘러보기</SectionTitle>
      <RelatedGrid>
        {[1, 2, 3, 4].map((i) => (
          <RelatedCard key={i}>
            <Image
              src="/placeholder.svg?height=150&width=200"
              alt={`Related content ${i}`}
              width={200}
              height={150}
              style={{ width: "100%", height: "8rem", objectFit: "cover" }}
            />
            <RelatedCardContent>
              <RelatedTitle>유어모드 컨텐츠 대단하다테스트튜토리얼 웹 컨텐츠 내용 자유롭게</RelatedTitle>
              <RelatedMeta>
                <span>2025년 4월 16일</span>
              </RelatedMeta>
              <RelatedStats>
                <span>좋아요 수</span>
                <span>댓글 수</span>
              </RelatedStats>
            </RelatedCardContent>
          </RelatedCard>
        ))}
      </RelatedGrid>
    </RelatedSection>
  )
}

export default RelatedContent;

const RelatedSection = styled.section`
  margin-top: 3rem;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #333;

  @media (max-width: 640px) {
    font-size: 1.5rem;
  }
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const RelatedCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const RelatedCardContent = styled.div`
  padding: 1rem;
`;

const RelatedTitle = styled.h3`
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const RelatedMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const RelatedStats = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #666;
`;
