import { Label } from "@/src/shared/components/ui/label";
import type React from "react";
import styled from "@emotion/styled";
import { Input } from "@/src/shared/components/ui/input";
import { FieldError, FieldErrors, Path, UseFormRegister } from "react-hook-form";
import { SignUpForm } from "@/src/widgets/auth/feature/hooks/useHandleSighup";
import { InfoForm } from "@/src/widgets/auth/feature/hooks/useHandleAdditionalInfo";

interface BodyInfoProps<T extends SignUpForm | InfoForm> {
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
}

const BodyInfo = <T extends SignUpForm | InfoForm>({ register, errors }: BodyInfoProps<T>) => {
  const heightError = errors?.height as FieldError | undefined;
  const weightError = errors?.weight as FieldError | undefined;

  return (
    <FormRow>
      <FormGroup>
        <Label htmlFor="height">키</Label>
        <StyledInput
          id="height"
          type="number"
          placeholder="ex) 165"
          {...register('height' as Path<T>)}
        />
        {heightError && <ErrorText>{heightError.message}</ErrorText>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="weight">몸무게</Label>
        <StyledInput
          id="weight"
          type="number"
          placeholder="ex) 55"
          {...register('weight' as Path<T>)}
        />
        {weightError && <ErrorText>{weightError.message}</ErrorText>}
      </FormGroup>
    </FormRow>
  );
};

export default BodyInfo;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
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
