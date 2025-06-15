"use client";

import { Controller } from "react-hook-form";
import styled from "@emotion/styled";
import { Input } from "@/src/shared/components/ui/input";
import { Textarea } from "@/src/shared/components/ui/textarea";
import { Button } from "@/src/shared/components/ui/button";
import { Checkbox } from "@/src/shared/components/ui/checkbox";
import ApplicationFormGroup from "./ApplicationFormGroup";
import { useRouter } from "next/navigation";
import {
  FormValues,
  useContentApplicationForm,
} from "@/src/widgets/application/feature/hooks/useContentApplicationForm";

const itemOptions = ["아우터", "상의", "하의", "가방", "신발", "악세서리", "기타"];

export default function ApplicationForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting }, control } = useContentApplicationForm();

  const onSubmit = (data: FormValues) => {
    // 실제 제출 로직 (ex. API 연동)
    console.log("신청 데이터:", data);
    router.push("/content-application/success");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <ApplicationFormGroup label="이름" htmlFor="name" error={errors.name?.message}>
        <StyledInput id="name" readOnly style={{ background: "#f5f5f5" }} {...register("name")} />
      </ApplicationFormGroup>
      <ApplicationFormGroup label="체형" htmlFor="bodyType" error={errors.bodyType?.message}>
        <StyledInput id="bodyType" readOnly style={{ background: "#f5f5f5" }} {...register("bodyType")} />
      </ApplicationFormGroup>
      <ApplicationFormGroup label="키" htmlFor="height" error={errors.height?.message}>
        <StyledInput id="height" type="number" placeholder="cm 단위" {...register("height")} />
      </ApplicationFormGroup>
      <ApplicationFormGroup label="몸무게" htmlFor="weight" error={errors.weight?.message}>
        <StyledInput id="weight" type="number" placeholder="kg 단위" {...register("weight")} />
      </ApplicationFormGroup>
      <ApplicationFormGroup
        label="체형적 특징"
        htmlFor="bodyFeatures"
        helpText="본인 실루엣 및 체형적 특징을 알려주세요."
        error={errors.bodyFeatures?.message}
      >
        <StyledTextarea
          id="bodyFeatures"
          placeholder="20자 이상 200자 이하로 작성"
          {...register("bodyFeatures")}
        />
      </ApplicationFormGroup>
      <ApplicationFormGroup label="추천 받고 싶은 아이템" error={errors.recommendedItems?.message}>
        <CheckboxGrid>
          {itemOptions.map((item) => (
            <Controller
              key={item}
              control={control}
              name="recommendedItems"
              render={({ field }) => (
                <CheckboxItem>
                  <Checkbox
                    checked={field.value?.includes(item) ?? false}
                    onCheckedChange={(checked) => {
                      const arr = Array.isArray(field.value) ? field.value : [];
                      if (checked) field.onChange([...arr, item]);
                      else field.onChange(arr.filter((i) => i !== item));
                    }}
                  />
                  <label>{item}</label>
                </CheckboxItem>
              )}
            />
          ))}
        </CheckboxGrid>
      </ApplicationFormGroup>
      <ApplicationFormGroup
        label="어떤 상황에서 입고 싶은 옷인가요?"
        htmlFor="situation"
        helpText="출근복, 약속, 소개팅 등 자세히"
        error={errors.situation?.message}
      >
        <StyledTextarea
          id="situation"
          placeholder="20자 이상 200자 이하로 작성"
          {...register("situation")}
        />
      </ApplicationFormGroup>
      <ApplicationFormGroup
        label="추천받고 싶은 스타일"
        htmlFor="preferredStyle"
        helpText="예: 미니멀, 캐주얼, 오피스룩 등"
        error={errors.preferredStyle?.message}
      >
        <StyledTextarea
          id="preferredStyle"
          placeholder="20자 이상 200자 이하로 작성"
          {...register("preferredStyle")}
        />
      </ApplicationFormGroup>
      <ApplicationFormGroup
        label="피하고 싶은 스타일"
        htmlFor="avoidStyle"
        helpText="예: 화려한 패턴, 짧은 치마 등"
        error={errors.avoidStyle?.message}
      >
        <StyledTextarea
          id="avoidStyle"
          placeholder="20자 이상 200자 이하로 작성"
          {...register("avoidStyle")}
        />
      </ApplicationFormGroup>
      <ApplicationFormGroup
        label="예산"
        htmlFor="budget"
        helpText="예: 30만원 이내, 50만원 정도"
        error={errors.budget?.message}
      >
        <StyledInput
          id="budget"
          placeholder="예: 30만원 이내, 50만원 정도"
          {...register("budget")}
        />
      </ApplicationFormGroup>
      <ApplicationFormGroup
        label="웹사이트 내 콘텐츠 업로드 동의"
        error={errors.uploadConsent?.message}
      >
        <Controller
          control={control}
          name="uploadConsent"
          render={({ field }) => (
            <CheckboxItem style={{ marginTop: "0.5rem" }}>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                id="uploadConsent"
              />
              <label htmlFor="uploadConsent">동의합니다</label>
            </CheckboxItem>
          )}
        />
      </ApplicationFormGroup>
      <SubmitButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? "신청 중..." : "스타일링 콘텐츠 신청하기"}
      </SubmitButton>
    </Form>
  );
}

// 스타일 (기존 코드 재활용)
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
  min-height: 100px;

  &:focus {
    border-color: #ff3e6c;
    box-shadow: 0 0 0 2px rgba(255, 62, 108, 0.1);
  }
`;
const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  margin-top: 0.5rem;
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;
const CheckboxItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const SubmitButton = styled(Button)`
  background-color: #ff3e6c;

  &:hover {
    background-color: #e62e5c;
  }
`;
