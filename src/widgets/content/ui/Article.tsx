import { Heart, MessageCircle, Share2 } from "lucide-react";
import Image from "next/image";
import styled from "@emotion/styled";
import { Button } from "@/components/ui/button";

interface ArticleProps {
  likeCount: number;
}

const Article = ({ likeCount }: ArticleProps) => {
  return (
    <ArticleContainer>
      {/* Header with Title and Image */}
      <ArticleHeader>
        <HeaderContent>
          <ArticleTitle>컨텐츠 제목이 들어갈 자리라고 해야할까요?</ArticleTitle>
          <ArticleDate>2025년 06월 16일</ArticleDate>
        </HeaderContent>

        <HeaderImageContainer>
          <LikeIconContainer>
            <Heart size={24} color="#fff" fill="#fff" />
          </LikeIconContainer>
        </HeaderImageContainer>
      </ArticleHeader>

      {/* Meta Information */}
      <MetaSection>
        <AuthorInfo>
          <BodyTypeBadge>웨이브 체형</BodyTypeBadge>
          <AuthorName>에디터 김명현</AuthorName>
        </AuthorInfo>

        <ActionButtons>
          <ActionButton variant="ghost" size="sm">
            <Heart size={16} />
            <span>{likeCount}</span>
          </ActionButton>
          <ActionButton variant="ghost" size="sm">
            <MessageCircle size={16} />
            <span>23</span>
          </ActionButton>
          <ActionButton variant="ghost" size="sm">
            <Share2 size={16} />
          </ActionButton>
        </ActionButtons>
      </MetaSection>

      {/* Main Image */}
      <MainImageContainer>
        <Image src="/placeholder.svg?height=400&width=800" alt="Content main image" fill className="object-cover" />
      </MainImageContainer>

      {/* Content */}
      <ArticleContent>
        <ContentText>
          <p>
            컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게
            컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게
            컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게
          </p>

          <ContentImageContainer>
            <Image
              src="/placeholder.svg?height=300&width=600"
              alt="Content image"
              width={600}
              height={300}
              className="rounded-lg"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </ContentImageContainer>

          <p>
            컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게
            컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게
            컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게 컨텐츠 내용 자유롭게
          </p>
        </ContentText>
      </ArticleContent>

      {/* Footer */}
      <ArticleFooter>
        <FooterAuthorInfo>
          <p>에디터 김명현</p>
          <p>전문적인 패션 스타일링 경험을 공유합니다.</p>
          <p>문의는 모든 내용을 겉에서 봐야하는 경우가 많다.</p>
        </FooterAuthorInfo>

        <FooterBranding>
          <Image src="/placeholder.svg?height=40&width=120" alt="유어모드 로고" width={120} height={40} />
          <p>유어모드는 무단 전재와 재배포를 금지하고 있습니다</p>
          <p>© 2025 유어모드</p>
        </FooterBranding>
      </ArticleFooter>
    </ArticleContainer>
  );
};

export default Article;

const ArticleContainer = styled.article`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  margin-bottom: 3rem;
`;

const ArticleHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2rem;
  padding: 2rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 1.5rem;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ArticleTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  line-height: 1.3;
  margin: 0;

  @media (max-width: 640px) {
    font-size: 1.5rem;
  }
`;

const ArticleDate = styled.time`
  color: #666;
  font-size: 0.875rem;
  font-weight: 500;
`;

const HeaderImageContainer = styled.div`
  position: relative;
  width: 280px;
  height: 160px;
  background-color: #e5e5e5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`;

const LikeIconContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 3.5rem;
  height: 3.5rem;
  background-color: #fbbf24;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const MetaSection = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 640px) {
    padding: 1rem 1.5rem;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BodyTypeBadge = styled.span`
  padding: 0.25rem 0.75rem;
  background-color: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
`;

const AuthorName = styled.span`
  color: #666;
  font-weight: 500;
  font-size: 0.875rem;
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 640px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const ActionButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  padding: 0.5rem 0.75rem;
`;

const MainImageContainer = styled.div`
  position: relative;
  height: 24rem;

  @media (min-width: 640px) {
    height: 32rem;
  }
`;

const ArticleContent = styled.div`
  padding: 2rem;

  @media (max-width: 640px) {
    padding: 1.5rem;
  }
`;

const ContentText = styled.div`
  font-size: 1.125rem;
  line-height: 1.8;
  color: #333;

  p {
    margin-bottom: 1.5rem;
  }

  @media (max-width: 640px) {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const ContentImageContainer = styled.div`
  margin: 2rem 0;
  text-align: center;
`;

const ArticleFooter = styled.div`
  padding: 2rem;
  border-top: 1px solid #eaeaea;
  background-color: #f9f9f9;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 640px) {
    padding: 1.5rem;
    flex-direction: column;
    gap: 2rem;
  }
`;

const FooterAuthorInfo = styled.div`
  text-align: left;

  p {
    color: #666;
    margin-bottom: 0.5rem;

    &:first-of-type {
      font-weight: 600;
      color: #333;
    }
  }

  @media (max-width: 640px) {
    p {
      font-size: 0.875rem;
    }
  }
`;

const FooterBranding = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  img {
    margin-bottom: 0.75rem;
  }

  p {
    font-size: 0.75rem;
    color: #666;
  }

  @media (max-width: 640px) {
    align-items: flex-start;
  }
`;
