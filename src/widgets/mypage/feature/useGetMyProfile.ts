import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "@/src/shared/api/user";
import { userQueryKeys } from "@/src/shared/const/queryKeys";

export const useGetMyProfile = () => {
  return useQuery({
    queryKey: userQueryKeys.user,
    queryFn: () => getMyProfile().then(response => response?.result),
  });
};
