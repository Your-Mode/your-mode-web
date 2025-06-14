import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

// Zod 스키마 정의
const contactSchema = z.object({
  name: z.string().min(2, "이름은 2자 이상 입력해주세요."),
  email: z.string().email("유효한 이메일을 입력해주세요."),
  subject: z.string().min(2, "제목을 입력해주세요."),
  message: z.string().min(5, "문의 내용을 5자 이상 입력해주세요."),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const useContactForm = () => {
  return useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });
}
