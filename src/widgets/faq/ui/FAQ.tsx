import styled from "@emotion/styled";
import { faqs } from "@/src/widgets/faq/feature/faq";

const FAQ = () => {
  return (
    <>
      <PageTitle>자주 묻는 질문</PageTitle>
      <FAQContainer>
        {faqs.map((faq, index) => (
          <FAQItem key={index}>
            <Question>{faq.question}</Question>
            <Answer>{faq.answer}</Answer>
          </FAQItem>
        ))}
      </FAQContainer>
    </>
  );
};

export default FAQ;

const PageTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #333;
  text-align: center;

  @media (max-width: 640px) {
    font-size: 2rem;
  }
`;

const FAQContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const FAQItem = styled.div`
  border-bottom: 1px solid #eaeaea;
  padding: 1.5rem 0;

  &:last-child {
    border-bottom: none;
  }
`;

const Question = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.75rem;
`;

const Answer = styled.p`
  color: #666;
  line-height: 1.6;
  margin: 0;
`;
