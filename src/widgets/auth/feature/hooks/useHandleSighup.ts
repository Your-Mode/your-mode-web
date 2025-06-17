import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const signUpSchema = z.object({
  email: z.string().email('유효한 이메일을 입력하세요'),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, '비밀번호는 특수문자를 포함해야 합니다')
    .regex(/\d/, '비밀번호는 숫자를 포함해야 합니다')
    .regex(/[a-zA-Z]/, '비밀번호는 영문자를 포함해야 합니다'),
  confirmPassword: z.string(),
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
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다',
  });

// 2) 스키마에서 타입 추론
export type SignUpForm = z.infer<typeof signUpSchema>

export const useHandleSighup = () => {
  return useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
  });
};
