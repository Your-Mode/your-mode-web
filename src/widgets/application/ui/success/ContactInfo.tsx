import styled from "@emotion/styled";

const ContactInfo = () => {
  return (
    <ContactInfoContainer>
      <strong>📞 문의사항이 있으시나요?</strong>
      <br />
      고객센터: 010-1234-5678
      <br />
      이메일: yourmode@naver.com
      <br />
      평일 09:00 - 18:00 (주말 및 공휴일 휴무)
    </ContactInfoContainer>
  );
};

export default ContactInfo;

const ContactInfoContainer = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #eaeaea;
  font-size: 0.875rem;
  color: #666;
  line-height: 1.6;
`;
