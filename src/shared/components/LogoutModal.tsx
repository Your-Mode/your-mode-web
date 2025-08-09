import styled from "@emotion/styled";

interface LogoutModalProps {
  handleLogoutConfirm: () => void;
  handleLogoutCancel: () => void;
}

const LogoutModal = ({ handleLogoutCancel, handleLogoutConfirm }: LogoutModalProps) => {
  return (
    <ModalOverlay onClick={handleLogoutCancel}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>로그아웃</ModalTitle>
        <ModalText>정말 로그아웃하시겠습니까?</ModalText>
        <ModalButtons>
          <ModalButton variant="secondary" onClick={handleLogoutCancel}>
            아니요
          </ModalButton>
          <ModalButton variant="primary" onClick={handleLogoutConfirm}>
            네
          </ModalButton>
        </ModalButtons>
      </ModalContent>
    </ModalOverlay>
  )
}

export default LogoutModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 90%;
  text-align: center;
`;

const ModalTitle = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
`;

const ModalText = styled.p`
  margin: 0 0 2rem 0;
  color: #666;
  line-height: 1.5;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const ModalButton = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ variant }) =>
  variant === "primary"
    ? `
        background-color: #ef4444;
        color: white;
        &:hover {
          background-color: #dc2626;
        }
      `
    : `
        background-color: #f3f4f6;
        color: #374151;
        &:hover {
          background-color: #e5e7eb;
        }
      `}
`;
