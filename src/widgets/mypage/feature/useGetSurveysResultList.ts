import { useQuery } from "@tanstack/react-query";
import { getMySurveyResults } from "@/src/shared/api/survey";

export const useGetSurveysResultList = () => {
  return useQuery({
    queryKey: ["surveyResults"],
    queryFn: () => getMySurveyResults().then(results => results),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
