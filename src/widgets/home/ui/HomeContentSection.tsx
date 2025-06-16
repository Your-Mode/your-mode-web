import { ArrowRight } from "lucide-react";
import ContentCard from "@/src/widgets/content/ui/content-card-vertical";
import { ContentItem } from "@/src/shared/types/content";
import styled from "@emotion/styled";
import Link from "next/link";

interface HomeContentSectionProps {
  title: string;
  moreLink?: string;
  contents: Omit<ContentItem, "createdAt">[];
}

const HomeContentSection = ({ title, contents, moreLink }: HomeContentSectionProps) => {
  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>{title}</SectionTitle>
        {moreLink ?
          <ViewAllLink href={`/${moreLink}`}>
            더 보기 <ArrowRight size={16} />
          </ViewAllLink>
          : null
        }
      </SectionHeader>
      <ContentGrid>
        {contents.map((content) => (
          <ContentCard key={content.id} {...content} />
        ))}
      </ContentGrid>
    </SectionContainer>
  );
};

export default HomeContentSection;

const SectionContainer = styled.section`
  margin-bottom: 4rem;
  margin-top: 3rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.family.primary};
  font-size: ${({ theme }) => theme.fonts.size["2xl"]};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  position: relative;
  display: inline-block;

  &:after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 3rem;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.primary[500]};
  }

  @media (max-width: 640px) {
    font-size: ${({ theme }) => theme.fonts.size.xl};
  }
`;

const ViewAllLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.primary[500]};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  font-size: ${({ theme }) => theme.fonts.size.sm};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary[600]};
  }
`;

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
