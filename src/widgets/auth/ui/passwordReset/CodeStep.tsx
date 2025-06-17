import { Label } from "@/src/shared/components/ui/label";
import { Input } from "@/src/shared/components/ui/input";
import { Button } from "@/src/shared/components/ui/button";
import styled from "@emotion/styled";
import {
  CodeFormValues,
  codeSchema,
  usePasswordResetForm,
} from "@/src/widgets/auth/feature/hooks/usePasswordResetForm";

export default function CodeStep({ onSubmit, isLoading, timer }: {
  onSubmit: (v: CodeFormValues) => void;
  isLoading: boolean;
  timer: number
}) {
  const { register, handleSubmit, formState: { errors } } = usePasswordResetForm<CodeFormValues>(codeSchema);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label htmlFor="code">인증코드</Label>
        <StyledInput
          id="code"
          type="text"
          maxLength={6}
          placeholder="6자리 인증코드를 입력하세요"
          {...register("code")}
        />
        {errors.code && <ErrorText>{errors.code.message}</ErrorText>}
        {timer > 0 && <TimerText>{timer}초 후 재전송 가능</TimerText>}
      </FormGroup>
      <SendButton type="submit" disabled={isLoading}>
        {isLoading ? "확인 중..." : "인증 확인"}
      </SendButton>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledInput = styled(Input)`
  &:focus {
  border-color: #ff3e6c;
  box-shadow: 0 0 0 2px rgba(255, 62, 108, 0.1);
  }
`;

const ErrorText = styled.p`
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

const TimerText = styled.p`
  font-size: 0.75rem;
  color: #666;
  margin-top: 0.5rem;
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

const CancelButton = styled(Button)`
  flex: 1;
  background-color: transparent;
  color: #666;
  border: 1px solid #ddd;

  &:hover {
    background-color: #f8f9fa;
    color: #333;
  }
`;
