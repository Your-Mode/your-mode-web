import { useMutation } from "@tanstack/react-query";
import { logout } from "@/src/shared/api/auth";
import { useAuthStore } from "@/src/shared/store/auth";
import { useRouter } from "next/navigation";

export const usePostLogout = () => {
  const { logout: logoutStore } = useAuthStore();
  const router = useRouter();
  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      logoutStore();
      router.push("/");
    },
    onError: () => {
      logoutStore();
    }
  });
};
