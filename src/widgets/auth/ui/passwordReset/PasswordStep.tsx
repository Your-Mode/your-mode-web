import { Label } from "@/src/shared/components/ui/label";
import { Input } from "@/src/shared/components/ui/input";
import { Button } from "@/src/shared/components/ui/button";
import styled from "@emotion/styled";
import {
  PasswordFormValues,
  passwordSchema,
  usePasswordResetForm,
} from "@/src/widgets/auth/feature/hooks/usePasswordResetForm";

export default function PasswordStep({ onSubmit, isLoading }: {
  onSubmit: (v: PasswordFormValues) => void;
  isLoading: boolean
}) {
  const { register, handleSubmit, formState: { errors } } = usePasswordResetForm<PasswordFormValues>(passwordSchema);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label htmlFor="newPassword">새 비밀번호</Label>
        <StyledInput
          id="newPassword"
          type="password"
          placeholder="새 비밀번호를 입력하세요"
          {...register("newPassword")}
        />
        {errors.newPassword && <ErrorText>{errors.newPassword.message}</ErrorText>}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="confirmPassword">새 비밀번호 확인</Label>
        <StyledInput
          id="confirmPassword"
          type="password"
          placeholder="새 비밀번호를 다시 입력하세요"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && <ErrorText>{errors.confirmPassword.message}</ErrorText>}
      </FormGroup>
      <SendButton type="submit" disabled={isLoading}>
        {isLoading ? "변경 중..." : "비밀번호 변경"}
      </SendButton>
    </Form>
  );
}

const Form = styled.form`display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledInput = styled(Input)`
  &:focus {
    border-color: #ff3e6c;
    box-shadow: 0 0 0 2px rgba(255, 62, 108, 0.1);
  }
`;

const ErrorText = styled.p`color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

const SendButton = styled(Button)`
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
