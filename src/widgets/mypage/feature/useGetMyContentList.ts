import { useInfiniteQuery } from "@tanstack/react-query";
import { getMyContentList } from "@/src/shared/api/content";

export type UseMyContentInfiniteQueryOptions = {
  size?: number;          // 페이지 크기
  sort?: string[];
  enabled?: boolean;      // 조건부 실행
};

export const useGetMyContentList = (opt?: UseMyContentInfiniteQueryOptions) => {
  const pageSize = opt?.size ?? 6;
  const sort = opt?.sort ?? [""];


  return useInfiniteQuery({
    queryKey: ['my-content', { size: pageSize, sort }],
    initialPageParam: 0,
    enabled: opt?.enabled ?? true,
    queryFn: ({ pageParam }) => getMyContentList({
      page: pageParam as number,
      size: pageSize,
      sort,
    }),
    getNextPageParam: (lastPage) => (lastPage.last ? undefined : lastPage.number + 1),
    getPreviousPageParam: (firstPage) => (firstPage.first ? undefined : firstPage.number - 1),
    select: (data) => ({
      ...data,
      flat: data.pages.flatMap((p) => p.content),
    }),
    staleTime: 60_000,
  });
};
