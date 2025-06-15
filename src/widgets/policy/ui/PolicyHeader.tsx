import { Button } from "@/src/shared/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";

interface PolicyHeaderProps {
  title: string;
}

const PolicyHeader = ({ title }: PolicyHeaderProps) => {
  const router = useRouter();

  return (
    <Header>
      <Button variant="ghost" size="sm" onClick={router.back}>
        <ArrowLeft size={16} style={{ marginRight: "0.5rem" }} />
        돌아가기
      </Button>
      <Title>{title}</Title>
    </Header>
  )
}

export default PolicyHeader;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
`;

const Title = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.875rem;
  font-weight: 700;
  color: #333;

  @media (max-width: 640px) {
    font-size: 1.5rem;
  }
`;
