import { Label } from "@/src/shared/components/ui/label";
import type React from "react";
import styled from "@emotion/styled";
import { Control, Controller, FieldError, FieldErrors, Path } from "react-hook-form";
import { SignUpForm } from "@/src/widgets/auth/feature/hooks/useHandleSighup";
import { InfoForm } from "@/src/widgets/auth/feature/hooks/useHandleAdditionalInfo";

interface BodyTypeProps<T extends SignUpForm | InfoForm> {
  control: Control<T>;
  errors?: FieldErrors<T>;
}

const BodyType = <T extends SignUpForm | InfoForm>({ control, errors }: BodyTypeProps<T>) => {
  const bodyTypeError = errors?.bodyType as FieldError | undefined;
  return (
    <Controller
      name={"bodyType" as Path<T>}
      control={control}
      render={({ field }) => (
        <FormGroup>
          <Label>체형 타입</Label>
          <ButtonGrid>
            <GridSelectionButton
              type="button"
              selected={field.value === 'straight'}
              onClick={() => field.onChange('straight')}
            >
              스트레이트
            </GridSelectionButton>
            <GridSelectionButton
              type="button"
              selected={field.value === 'wave'}
              onClick={() => field.onChange('wave')}
            >
              웨이브
            </GridSelectionButton>
            <GridSelectionButton
              type="button"
              selected={field.value === 'natural'}
              onClick={() => field.onChange('natural')}
            >
              내추럴
            </GridSelectionButton>
            <GridSelectionButton
              type="button"
              selected={field.value === 'unknown'}
              onClick={() => field.onChange('unknown')}
            >
              잘 모르겠어요
            </GridSelectionButton>
          </ButtonGrid>
          <HelpText>
            체형 타입을 모르시나요?
            <br />
            유어모드에서 제공하는 AI 기반 체형진단을 이용해보세요
          </HelpText>
          {bodyTypeError && <ErrorText>{bodyTypeError.message}</ErrorText>}
        </FormGroup>
      )}
    />
  );
};

export default BodyType;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const GridSelectionButton = styled.button<{ selected: boolean }>`
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

const HelpText = styled.p`
  font-size: 0.75rem;
  color: #666;
  margin-top: 0.25rem;
  line-height: 1.4;
`;
