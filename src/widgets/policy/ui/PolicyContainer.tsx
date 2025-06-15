import styled from "@emotion/styled";
import { ReactNode } from "react";
import PolicyHeader from "@/src/widgets/policy/ui/PolicyHeader";

interface PolicyContainerProps {
  children?: ReactNode;
  title: string;
  lastUpdated: string;
}

const PolicyContainer = ({ children, title, lastUpdated }: PolicyContainerProps) => {
  return (
    <MainContainer>
      <MainContent>
        <ContentContainer>
          <PolicyHeader title={title} />
          <Content>
            {children}
          </Content>
          <LastUpdated>{lastUpdated}</LastUpdated>
        </ContentContainer>
      </MainContent>
    </MainContainer>
  );
};

export default PolicyContainer;

const MainContainer = styled.div`
  min-height: 100vh;
  background-color: #fafafa;
  padding: 2rem 0;
`;

const MainContent = styled.main`
  max-width: 48rem;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 640px) {
    padding: 0 2rem;
  }
`;

const ContentContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  @media (max-width: 640px) {
    padding: 1.5rem;
    margin: 0 1rem;
  }
`;

const Content = styled.div`
  line-height: 1.8;
  color: #374151;

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 2rem 0 1rem 0;
    color: #1f2937;
  }

  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin: 1.5rem 0 0.75rem 0;
    color: #374151;
  }

  p {
    margin-bottom: 1rem;
  }

  ul {
    margin: 1rem 0;
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.5rem;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;

    th, td {
      border: 1px solid #e5e7eb;
      padding: 0.75rem;
      text-align: left;
    }

    th {
      background-color: #f9fafb;
      font-weight: 600;
    }

    ol {
      margin: 1rem 0;
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.5rem;
      }
    }
  }
`;

const LastUpdated = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
`;
