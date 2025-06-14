import { ChevronRight } from "lucide-react";
import styled from "@emotion/styled";
import Link from "next/link";

const BreadcrumbNavigation = () => {
  return (
    <BreadcrumbContainer>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">유어모드 내일 로그</BreadcrumbLink>
          <ChevronRight size={14} />
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/contents">에디터 컨텐츠</BreadcrumbLink>
          <ChevronRight size={14} />
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbCurrent>맞춤형 컨텐츠</BreadcrumbCurrent>
        </BreadcrumbItem>
      </BreadcrumbList>
    </BreadcrumbContainer>
  );
};

export default BreadcrumbNavigation;

const BreadcrumbContainer = styled.nav`
  margin-bottom: 2rem;
  padding: 0 1rem;

  @media (min-width: 640px) {
    padding: 0;
  }
`;

const BreadcrumbList = styled.ol`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #666;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 640px) {
    font-size: 0.75rem;
    flex-wrap: wrap;
  }
`;

const BreadcrumbItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const BreadcrumbLink = styled(Link)`
  color: #666;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #ff3e6c;
  }
`;

const BreadcrumbCurrent = styled.span`
  color: #333;
  font-weight: 500;
`;
