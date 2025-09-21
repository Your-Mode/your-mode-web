import { useMutation } from "@tanstack/react-query";
import { updatePassword, UpdatePasswordRequest } from "@/src/shared/api/user";

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (password: string) => {
      const request: UpdatePasswordRequest = {
        newPassword: password
      }
      return updatePassword(request)
    }
  })
};
