import { Label } from "@/src/shared/components/ui/label";
import { Checkbox } from "@/src/shared/components/ui/checkbox";
import type React from "react";
import styled from "@emotion/styled";
import { Input } from "@/src/shared/components/ui/input";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { SignUpForm } from "@/src/widgets/auth/feature/hooks/useHandleSighup";

interface PasswordProps {
  register: UseFormRegister<SignUpForm>;
  errors: FieldErrors<SignUpForm>;
  watch: UseFormWatch<SignUpForm>;
}

const Password = ({ register, errors, watch }: PasswordProps) => {
  const password = watch('password') || '';
  return (
    <FormGroup>
      <Label htmlFor="password">비밀번호</Label>
      <StyledInput
        id="password"
        type="password"
        placeholder="••••••••••••"
        {...register('password')}
      />
      <CheckboxContainer>
        <CheckboxItem>
          <Checkbox
            checked={
              /[a-zA-Z]/.test(password) &&
              /\d/.test(password) &&
              /[!@#$%^&*(),.?":{}|<>]/.test(password)
            }
            disabled
          />
          <span>영문/숫자/특수문자 포함</span>
        </CheckboxItem>
        <CheckboxItem>
          <Checkbox checked={password.length >= 8} disabled />
          <span>8자 이상 입력</span>
        </CheckboxItem>
      </CheckboxContainer>
      {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
    </FormGroup>
  );
};

export default Password;

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

const CheckboxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const CheckboxItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
`;

const ErrorText = styled.p`
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;
