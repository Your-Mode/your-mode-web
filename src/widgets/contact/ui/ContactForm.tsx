"use client";

import styled from "@emotion/styled";
import { Input } from "@/src/shared/components/ui/input";
import { Textarea } from "@/src/shared/components/ui/textarea";
import { Button } from "@/src/shared/components/ui/button";
import { useState } from "react";
import { ContactFormData, useContactForm } from "@/src/widgets/contact/feature/hooks/useContactForm";
import FormGroup from "@/src/widgets/contact/ui/FormGroup";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useContactForm()

  const onSubmit = async (data: ContactFormData) => {
    setSent(true);
    reset();
  };

  if (sent) {
    return <SuccessMsg>문의가 접수되었습니다.<br />빠른 시일 내에 답변드리겠습니다.</SuccessMsg>;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup
        label="이름"
        htmlFor="name"
        error={errors.name?.message}
      >
        <StyledInput
          id="name"
          placeholder="이름을 입력해주세요"
          {...register("name")}
          aria-invalid={!!errors.name}
        />
      </FormGroup>
      <FormGroup
        label="이메일"
        htmlFor="email"
        error={errors.email?.message}
      >
        <StyledInput
          id="email"
          type="email"
          placeholder="이메일을 입력해주세요"
          {...register("email")}
          aria-invalid={!!errors.email}
        />
      </FormGroup>
      <FormGroup
        label="제목"
        htmlFor="subject"
        error={errors.subject?.message}
      >
        <StyledInput
          id="subject"
          placeholder="문의 제목을 입력해주세요"
          {...register("subject")}
          aria-invalid={!!errors.subject}
        />
      </FormGroup>
      <FormGroup
        label="문의 내용"
        htmlFor="message"
        error={errors.message?.message}
      >
        <StyledTextarea
          id="message"
          placeholder="문의 내용을 자세히 입력해주세요"
          {...register("message")}
          aria-invalid={!!errors.message}
        />
      </FormGroup>
      <SubmitButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? "전송 중..." : "문의 보내기"}
      </SubmitButton>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const StyledInput = styled(Input)`
  &:focus {
    border-color: #ff3e6c;
    box-shadow: 0 0 0 2px rgba(255, 62, 108, 0.1);
  }
`;

const StyledTextarea = styled(Textarea)`
  min-height: 120px;
  &:focus {
    border-color: #ff3e6c;
    box-shadow: 0 0 0 2px rgba(255, 62, 108, 0.1);
  }
`;

const SubmitButton = styled(Button)`
  background-color: #ff3e6c;
  &:hover { background-color: #e62e5c; }
`;

const SuccessMsg = styled.div`
  padding: 3rem 1rem;
  text-align: center;
  font-size: 1.3rem;
  color: #26a69a;
  font-weight: 700;
`;
