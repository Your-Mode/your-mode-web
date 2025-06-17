import { Label } from "@/src/shared/components/ui/label";
import type React from "react";
import styled from "@emotion/styled";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { SignUpForm } from "@/src/widgets/auth/feature/hooks/useHandleSighup";

interface GenderProps {
  control: Control<SignUpForm>;
  errors?: FieldErrors<SignUpForm>;
}

const Gender = ({ control, errors }: GenderProps) => {
  return (
    <Controller
      name="gender"
      control={control}
      render={({ field }) => (
        <FormGroup>
          <Label>성별</Label>
          <ButtonGroup>
            <SelectionButton
              type="button"
              selected={field.value === "male"}
              onClick={() => field.onChange('male')}
            >
              남성
            </SelectionButton>
            <SelectionButton
              type="button"
              selected={field.value === "female"}
              onClick={() => field.onChange('female')}
            >
              여성
            </SelectionButton>
          </ButtonGroup>
          {errors?.gender && <ErrorText>{errors.gender.message}</ErrorText>}
        </FormGroup>
      )} />
  );
};

export default Gender;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-top: 0.5rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
`;

const SelectionButton = styled.button<{ selected: boolean }>`
  padding: 0.75rem 1rem;
  border: 1px solid ${(props) => (props.selected ? "#ff3e6c" : "#d1d5db")};
  border-radius: 0.375rem;
  background-color: ${(props) => (props.selected ? "#ff3e6c" : "white")};
  color: ${(props) => (props.selected ? "white" : "#374151")};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #ff3e6c;
    color: ${(props) => (props.selected ? "white" : "#ff3e6c")};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 62, 108, 0.1);
  }
`;

const ErrorText = styled.p`
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;
