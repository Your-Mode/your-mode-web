import { useQueries } from "@tanstack/react-query";
import { getMyPageComponent, getMyProfile } from "@/src/shared/api/user";
import { getContentRequestsList } from "@/src/shared/api/content";

export const useGetMyPageInfo = () => {
  const results = useQueries({
    queries: [
      {
        queryKey: ["user"],
        queryFn: () => getMyProfile().then(response => response?.result),
      },
      {
        queryKey: ["contents-application-list"],
        queryFn: () => getContentRequestsList().then(response => response?.result),
      },
      {
        queryKey: ["user-component"],
        queryFn: () => getMyPageComponent().then(response => response?.result),
      }
    ]
  })
  return {
    userQuery: results[0],
    contentApplicationListQuery: results[1],
    userComponentQuery: results[2],
  }
};
