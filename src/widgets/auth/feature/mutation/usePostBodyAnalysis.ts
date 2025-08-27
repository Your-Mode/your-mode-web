import { useMutation } from "@tanstack/react-query";
import { postBodyAnalysis } from "@/src/shared/api/body";
import { BodyResultRequest } from "@/src/shared/types/body-type";
import { useRouter } from "next/navigation";
import { useBodyResultStore } from "@/src/widgets/auth/feature/hooks/useBodyResultStore";
import { useGetMyProfile } from "@/src/widgets/mypage/feature/useGetMyProfile";

export const usePostBodyAnalysis = () => {
  const { data: userInfo } = useGetMyProfile();
  const { setBodyResult } = useBodyResultStore();
  const router = useRouter();
  const result = useMutation({
    mutationFn: (answers: string[]) => {
      if (userInfo) {
        const req: BodyResultRequest = {
          answers: answers,
          gender: userInfo?.gender,
          height: userInfo?.height,
          weight: userInfo.weight,
        };
        return postBodyAnalysis(req);
      }
      throw new Error("User information is not available");
    },
    onSuccess: (data) => {
      if (data) {
        setBodyResult(data);
        router.push("/body-analysis/result");
      }
    },
    retry: 3,
    retryDelay: 1000,
  });
  return result;
};
