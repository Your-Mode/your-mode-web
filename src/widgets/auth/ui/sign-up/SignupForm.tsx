import BodyInfo from "@/src/widgets/auth/ui/sign-up/BodyInfo";
import Gender from "@/src/widgets/auth/ui/sign-up/Gender";
import BodyType from "@/src/widgets/auth/ui/sign-up/BodyType";
import Agreement from "@/src/widgets/auth/ui/sign-up/Agreement";
import type React from "react";
import styled from "@emotion/styled";
import { Button } from "@/src/shared/components/ui/button";
import { SignUpForm, useHandleSighup } from "@/src/widgets/auth/feature/hooks/useHandleSighup";
import CustomFormGroup from "@/src/widgets/auth/ui/sign-up/CustomFormGroup";
import Password from "@/src/widgets/auth/ui/sign-up/Password";
import { usePostSignUp } from "@/src/widgets/auth/feature/mutation/usePostSignUp";

const SignupForm = () => {
  const { watch, register, control, handleSubmit, formState: { errors }, getValues } = useHandleSighup();
  const { mutate, isPending, isError } = usePostSignUp();

  const onSubmit = (formData: SignUpForm) => {
    console.log(formData);
  };

  return (
    <FormContainer>
      <Title>회원가입</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <CustomFormGroup
          id="email" register={register}
          label="이메일"
          errors={errors}
          name="email"
          type="email"
          placeholder="yourmode@naver.com"
          htmlFor="email"
        />
        <Password register={register} errors={errors} watch={watch} />
        <CustomFormGroup
          id="confirmPassword"
          label="비밀번호 확인"
          register={register}
          errors={errors}
          name="confirmPassword"
          type="password"
          placeholder="••••••••••••"
          htmlFor="confirmPassword"
        />
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
        <BodyInfo register={register} errors={errors} />
        <Gender control={control} errors={errors} />
        <BodyType control={control} errors={errors} />
        <Agreement control={control} errors={errors} />
        <SubmitButton type="submit" onClick={() => mutate(getValues())} disabled={isPending}>{isPending ? '회원가입중...' : '가입하기'}</SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default SignupForm;

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

const SubmitButton = styled(Button)`
  background-color: #ff3e6c;

  &:hover {
    background-color: #e62e5c;
  }
`;
