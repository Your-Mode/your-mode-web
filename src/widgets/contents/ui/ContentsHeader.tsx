import styled from "@emotion/styled";

interface ContentsHeaderProps {
  title: string;
  description: string;
}

const ContentsHeader = ({ title, description }: ContentsHeaderProps) => {
  return (
    <>
      <PageTitle>{title}</PageTitle>
      <PageDescription>
        {description}
      </PageDescription>
    </>
  );
};

export default ContentsHeader;

const PageTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.family.primary};
  font-size: ${({ theme }) => theme.fonts.size["4xl"]};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text.primary};

  @media (max-width: 640px) {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }
`;

const PageDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fonts.size.lg};
  max-width: 800px;
  margin-bottom: 2rem;

  @media (max-width: 640px) {
    font-size: ${({ theme }) => theme.fonts.size.base};
  }
`;
