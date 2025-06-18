import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, '현재 비밀번호를 입력해주세요'),
    newPassword: z
      .string()
      .min(8, '영문, 숫자, 특수문자 포함 8자 이상 입력하세요')
      .refine(val => /[a-zA-Z]/.test(val) && /\d/.test(val) && /[!@#$%^&*(),.?":{}|<>]/.test(val), {
        message: '영문, 숫자, 특수문자를 모두 포함해야 합니다',
      }),
    confirmPassword: z.string().min(1, '새 비밀번호를 다시 입력해주세요'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '새 비밀번호가 일치하지 않습니다',
  });

export type PasswordFormValues = z.infer<typeof passwordSchema>;

export const usePasswordChange = () => {
  return useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });
};
