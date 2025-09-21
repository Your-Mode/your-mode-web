import { useMutation } from "@tanstack/react-query";
import { updateMyProfile, UpdateMyProfileRequest } from "@/src/shared/api/user";

export const useUpdateMyInfo = () => {
  return useMutation({
    mutationFn: (request: UpdateMyProfileRequest) => updateMyProfile(request),
  })
};
