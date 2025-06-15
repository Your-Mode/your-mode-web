import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요."),
  bodyType: z.string().min(1, "체형을 입력해주세요."),
  height: z.string().min(2, "키를 입력해주세요."),
  weight: z.string().min(2, "몸무게를 입력해주세요."),
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
      name: "김정윤",
      bodyType: "웨이브 체형",
      recommendedItems: [],
      uploadConsent: false,
    },
  });
};
