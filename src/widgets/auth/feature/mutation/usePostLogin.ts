import { useMutation } from "@tanstack/react-query";
import { LoginRequest } from "@/src/shared/types/auth";
import { login } from "@/src/shared/api/auth";
import { useAuthStore } from "@/src/shared/store/auth";

export const usePostLogin = () => {
  const { login: loginStore } = useAuthStore();
  const result = useMutation({
    mutationFn: (req: LoginRequest) => login(req),
    onSuccess: (data) => {
      if (data?.result) {
        const user = {
          name: data.result.user.name,
          email: data.result.user.email,
        };
        loginStore(data.result.accessToken, user);
      }
    },
    onError: (error) => {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    },
  });

  return result;
};
