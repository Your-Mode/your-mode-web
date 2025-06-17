import { Label } from "@/src/shared/components/ui/label";
import type React from "react";
import styled from "@emotion/styled";
import { Input } from "@/src/shared/components/ui/input";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { SignUpForm } from "@/src/widgets/auth/feature/hooks/useHandleSighup";

interface CustomFormGroupProps {
  id: string;
  register: UseFormRegister<SignUpForm>;
  errors: FieldErrors<SignUpForm>;
  name: keyof SignUpForm;
  type: string;
  htmlFor: string;
  placeholder: string;
}

const CustomFormGroup = ({ id, register, errors, htmlFor, type, name, placeholder }: CustomFormGroupProps) => {
  return (
    <FormGroup>
      <Label htmlFor={htmlFor}>이메일</Label>
      <StyledInput
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(name)}
      />
      {errors[name] && <ErrorText>{errors[name].message}</ErrorText>}
    </FormGroup>
  );
};

export default CustomFormGroup;

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
