import PasswordField from "@/src/widgets/mypage/ui/password/PasswordField";
import React, { useState } from "react";
import styled from "@emotion/styled";
import { Button } from "@/src/shared/components/ui/button";
import { useRouter } from "next/navigation";
import { PasswordFormValues, usePasswordChange } from "@/src/widgets/mypage/feature/hooks/usePasswordChange";

const PasswordChangeForm = () => {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState("");
  const { control, handleSubmit, formState: { errors, isSubmitting }, reset } = usePasswordChange();

  const onSubmit = async (data: PasswordFormValues) => {
    try {
      // 예시: API 호출
      await new Promise(r => setTimeout(r, 1000));
      setSuccessMessage('비밀번호가 성공적으로 변경되었습니다!');
      reset();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch {
      // 별도 ErrorField를 두고도 좋음
      alert('비밀번호 변경 중 오류가 발생했습니다.');
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <PasswordField
        name="currentPassword"
        control={control}
        label="현재 비밀번호"
        error={errors.currentPassword?.message}
      />
      <PasswordField
        name="newPassword"
        control={control}
        label="새 비밀번호"
        helpText="영문, 숫자, 특수문자를 포함하여 8자 이상 입력하세요"
        error={errors.newPassword?.message}
      />
      <PasswordField
        name="confirmPassword"
        control={control}
        label="새 비밀번호 확인"
        error={errors.confirmPassword?.message}
      />

      {successMessage && <SuccessText>{successMessage}</SuccessText>}

      <ButtonRow>
        <CancelButton type="button" onClick={() => router.back()}>
          취소
        </CancelButton>
        <SaveButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? '변경 중...' : '비밀번호 변경'}
        </SaveButton>
      </ButtonRow>
    </FormContainer>
  );
};

export default PasswordChangeForm;

const FormContainer = styled.form`
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const SaveButton = styled(Button)`
  flex: 1;
  background-color: #ff3e6c;

  &:hover {
    background-color: #e62e5c;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Button)`
  flex: 1;
  background: transparent;
  color: #666;
  border: 1px solid #ddd;

  &:hover {
    background-color: #f8f9fa;
    color: #333;
  }
`;

const SuccessText = styled.p`
  color: #10b981;
  font-size: 0.875rem;
  text-align: center;
`;
