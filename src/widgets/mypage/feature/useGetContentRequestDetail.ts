import { useQuery } from "@tanstack/react-query";
import { getContentRequestDetail } from "@/src/shared/api/content";

export const useGetContentRequestDetail = (id: number) => {
  return useQuery({
    queryKey: ["contents-application-detail", id],
    queryFn: () => getContentRequestDetail(id),
  })
};
