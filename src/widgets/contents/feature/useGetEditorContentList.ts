import { useInfiniteQuery } from "@tanstack/react-query";
import { getEditorContentList } from "@/src/shared/api/content";
import { UseMyContentInfiniteQueryOptions } from "@/src/widgets/mypage/feature/useGetMyContentList";

export const useGetEditorContentList = (ids: number | null, opt?: UseMyContentInfiniteQueryOptions) => {
  const pageSize = opt?.size ?? 6;
  const sort = opt?.sort ?? [""];


  return useInfiniteQuery({
    queryKey: ['editor-contents', { size: pageSize, sort }, ids],
    initialPageParam: 0,
    enabled: opt?.enabled ?? true,
    queryFn: ({ pageParam }) => getEditorContentList(ids, {
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
