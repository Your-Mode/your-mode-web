import { z, ZodSchema } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const phoneSchema = z.object({
  phoneNumber: z.string().regex(/^01[0-9]-?\d{4}-?\d{4}$/, '올바른 전화번호 형식이 아닙니다.'),
});
export type PhoneFormValues = z.infer<typeof phoneSchema>;

export const codeSchema = z.object({
  code: z.string().length(6, '6자리 인증코드를 입력해주세요'),
});
export type CodeFormValues = z.infer<typeof codeSchema>;

export const passwordSchema = z.object({
  newPassword: z.string().min(8, '비밀번호는 8자 이상이어야 합니다'),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다',
  path: ['confirmPassword'],
});
export type PasswordFormValues = z.infer<typeof passwordSchema>;


export const usePasswordResetForm = <T extends PhoneFormValues | CodeFormValues | PasswordFormValues> (schema: ZodSchema<T>) => {
  return useForm<T>({
    resolver: zodResolver(schema)
  })
}
