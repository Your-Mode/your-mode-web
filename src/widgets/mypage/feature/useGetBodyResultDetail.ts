import { useQuery } from "@tanstack/react-query";
import { getMySurveyResultDetail } from "@/src/shared/api/survey";

export const useGetBodyResultDetail = (resultId: number) => {
  return useQuery({
    queryKey: ["surveyResults", resultId],
    queryFn: () => getMySurveyResultDetail(resultId).then(res => res.result),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!resultId, // resultId가 있을 때만 쿼리 실행
  })
}
