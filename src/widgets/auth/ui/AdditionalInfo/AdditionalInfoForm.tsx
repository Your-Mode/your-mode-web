import { Button } from "@/src/shared/components/ui/button";
import type React from "react";
import styled from "@emotion/styled";
import Agreement from "@/src/widgets/auth/ui/sign-up/Agreement";
import { useRouter } from "next/navigation";
import { useHandleAdditionalInfo } from "@/src/widgets/auth/feature/hooks/useHandleAdditionalInfo";
import BodyType from "@/src/widgets/auth/ui/sign-up/BodyType";
import Gender from "@/src/widgets/auth/ui/sign-up/Gender";
import BodyInfo from "@/src/widgets/auth/ui/sign-up/BodyInfo";
import CustomFormGroup from "@/src/widgets/auth/ui/sign-up/CustomFormGroup";

const AdditionalInfoForm = () => {
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useHandleAdditionalInfo();

  const onSubmit = () => {
    // Success - redirect to success page
    router.push("/signup/success");
  };

  return (
    <FormContainer>
      <Title>추가 정보 입력</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <CustomFormGroup
            id="name"
            label="이름"
            register={register}
            errors={errors}
            name="name"
            type="text"
            htmlFor="name"
            placeholder="ex) 김모드"
          />
          <CustomFormGroup
            id="phone"
            label="휴대폰 번호"
            register={register}
            errors={errors}
            name="phone"
            type="text"
            htmlFor="phone"
            placeholder="ex) 010-1234-5678"
          />
        </FormGroup>
        <BodyInfo register={register} errors={errors} />
        <Gender control={control} errors={errors} />
        <BodyType control={control} errors={errors} />
        <Agreement control={control} errors={errors} />
        <SubmitButton type="submit">가입하기</SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default AdditionalInfoForm;

const FormContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 4rem;

  @media (max-width: 640px) {
    padding: 1.5rem;
    margin: 0 1rem 3rem 1rem;
  }
`;

const Title = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: #333;

  @media (max-width: 640px) {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SubmitButton = styled(Button)`
  background-color: #ff3e6c;

  &:hover {
    background-color: #e62e5c;
  }
`;
