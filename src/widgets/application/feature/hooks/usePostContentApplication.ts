import { useMutation } from "@tanstack/react-query";
import { ContentCreateRequest, createContentRequest } from "@/src/shared/api/content";
import { useRouter } from "next/navigation";

export const usePostContentApplication = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (request: ContentCreateRequest) => createContentRequest(request),
    onSuccess: () => {
      router.push("/content-application/success");
    },
    onError: (error) => {
      alert(error.message);
    },
  })
};
