import styled from "@emotion/styled";

const ThankYouModal = ({ onClose }: { onClose: () => void }) => (
  <ModalOverlay>
    <ModalContent>
      <ModalIcon>
        <span style={{ fontSize: "2rem" }}>🙏</span>
      </ModalIcon>
      <ModalTitle>소중한 의견 감사합니다!</ModalTitle>
      <ModalDesc>더 나은 서비스를 위해 소중한 피드백을 활용하겠습니다.</ModalDesc>
      <ConfirmButton onClick={onClose}>확인</ConfirmButton>
    </ModalContent>
  </ModalOverlay>
);

export default ThankYouModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 9999; padding: 1rem;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  text-align: center;
  max-width: 400px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ModalIcon = styled.div`
  width: 4rem; height: 4rem;
  background: linear-gradient(to right, #34d399, #14b8a6);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 1rem;
`;

const ModalTitle = styled.h3`
  font-size: 1.25rem; font-weight: 600; color: #111827; margin-bottom: 0.5rem;
`;

const ModalDesc = styled.p`
  color: #6b7280; margin-bottom: 1.5rem;
`;

const ConfirmButton = styled.button`
  padding: 0.75rem 2rem;
  background: linear-gradient(to right, #f472b6, #ec4899);
  color: white;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover { transform: scale(1.05); }
`;
