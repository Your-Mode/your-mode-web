import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const infoSchema = z.object({
    name: z.string().min(1, '이름을 입력하세요'),
    phone: z
      .string()
      .regex(/^01[016789]-?\d{3,4}-?\d{4}$/, '유효한 전화번호를 입력하세요'),
    height: z
      .string()
      .regex(/^\d+$/, '키를 숫자로 입력하세요')
      .transform(val => Number(val)),
    weight: z
      .string()
      .regex(/^\d+$/, '몸무게를 숫자로 입력하세요')
      .transform(val => Number(val)),
    gender: z.enum(['male', 'female'], {
      errorMap: () => ({ message: '성별을 선택하세요' }),
    }),
    bodyType: z.enum(['straight', 'wave', 'natural', 'unknown'], {
      errorMap: () => ({ message: '체형을 선택하세요' }),
    }),
    termsAgreed: z.literal(true, {
      errorMap: () => ({ message: '이용약관에 동의해야 합니다' }),
    }),
    privacyAgreed: z.literal(true, {
      errorMap: () => ({ message: '개인정보 수집·이용에 동의해야 합니다' }),
    }),
    marketingAgreed: z.boolean(),
  })
;

// 2) 스키마에서 타입 추론
export type InfoForm = z.infer<typeof infoSchema>

export const useHandleAdditionalInfo = () => {
  return useForm<InfoForm>({
    resolver: zodResolver(infoSchema),
    mode: 'onBlur',
  });
};
