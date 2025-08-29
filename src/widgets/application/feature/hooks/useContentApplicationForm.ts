import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  bodyFeatures: z.string().min(20, "20자 이상 입력").max(200, "200자 이하"),
  recommendedItems: z.array(z.string()).min(1, "최소 1개 이상 선택"),
  situation: z.string().min(20, "20자 이상 입력").max(200, "200자 이하"),
  preferredStyle: z.string().min(20).max(200),
  avoidStyle: z.string().min(20).max(200),
  budget: z.string().min(1, "예산을 입력해주세요."),
  uploadConsent: z.boolean().refine(v => v, { message: "동의가 필요합니다." }),
});

export type FormValues = z.infer<typeof formSchema>;

export const useContentApplicationForm = () => {
  return useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recommendedItems: [],
      uploadConsent: false,
    },
  });
};
