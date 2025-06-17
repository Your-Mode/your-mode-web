import { Label } from "@/src/shared/components/ui/label";
import { Input } from "@/src/shared/components/ui/input";
import { Button } from "@/src/shared/components/ui/button";
import styled from "@emotion/styled";
import {
  PhoneFormValues,
  phoneSchema,
  usePasswordResetForm,
} from "@/src/widgets/auth/feature/hooks/usePasswordResetForm";

export default function PhoneStep({ onSubmit, isLoading }: {
  onSubmit: (v: PhoneFormValues) => void;
  isLoading: boolean
}) {
  const { register, handleSubmit, formState: { errors } } = usePasswordResetForm<PhoneFormValues>(phoneSchema)

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label htmlFor="phoneNumber">전화번호</Label>
        <StyledInput
          id="phoneNumber"
          type="tel"
          placeholder="전화번호를 입력하세요 (예: 010-1234-5678)"
          {...register("phoneNumber")}
        />
        {errors.phoneNumber && <ErrorText>{errors.phoneNumber.message}</ErrorText>}
      </FormGroup>
      <SendButton type="submit" disabled={isLoading}>
        {isLoading ? "발송 중..." : "인증코드 전송"}
      </SendButton>
    </Form>
  );
}

// 아래 스타일은 emotion 그대로 사용 (중복 방지용 export만 하면 됨)
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledInput = styled(Input)`&:focus {
  border-color: #ff3e6c;
  box-shadow: 0 0 0 2px rgba(255, 62, 108, 0.1);
}`;

const ErrorText = styled.p`color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

const SendButton = styled(Button)`flex: 1;
  background-color: #ff3e6c;

  &:hover {
    background-color: #e62e5c;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
