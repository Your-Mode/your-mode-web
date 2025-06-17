import { Card, CardContent } from "@/src/shared/components/ui/card";
import { bodyAnalysisResult } from "@/src/shared/api/mock";
import { Calendar, Eye, Sparkles, Target } from "lucide-react";
import Link from "next/link";
import { Button } from "@/src/shared/components/ui/button";
import { TabsContent } from "@/src/shared/components/ui/tabs";
import styled from "@emotion/styled";

const BodyAnalysis = () => {
  return (
    <TabsContent value="body-analysis">
      <div style={{ display: "flex", justifyContent: "center", padding: "2rem 0" }}>
        <BodyAnalysisCard style={{ maxWidth: "400px", width: "100%" }}>
          <CardContent style={{ padding: "2rem", textAlign: "center" }}>
            <BodyTypeIcon gradient={bodyAnalysisResult.gradient}>
              <Target size={32} color="white" />
            </BodyTypeIcon>

            <BodyTypeTitle>{bodyAnalysisResult.title}</BodyTypeTitle>

            <AnalysisDate>
              <Calendar size={14} />
              분석일: {bodyAnalysisResult.analysisDate}
            </AnalysisDate>

            <BodyTypeDescription>{bodyAnalysisResult.description}</BodyTypeDescription>

            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
              <Link href="/body-analysis/result" style={{ flex: 1 }}>
                <ViewResultButton>
                  <Eye size={16} style={{ marginRight: "0.5rem" }} />
                  상세 결과 보기
                </ViewResultButton>
              </Link>
            </div>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Link href="/body-analysis" style={{ flex: 1 }}>
                <Button variant="outline" style={{ width: "100%" }}>
                  <Sparkles size={16} style={{ marginRight: "0.5rem" }} />
                  다시 진단하기
                </Button>
              </Link>
            </div>
          </CardContent>
        </BodyAnalysisCard>
      </div>
    </TabsContent>
  );
};

export default BodyAnalysis;

const BodyAnalysisCard = styled(Card)`
  background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%);
  border: 1px solid #f9a8d4;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(244, 114, 182, 0.15);
  }
`;

const BodyTypeIcon = styled.div<{ gradient: string }>`
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1rem;
  background: ${(props) =>
  props.gradient === "from-emerald-400 to-teal-500"
    ? "linear-gradient(to bottom right, #34d399, #14b8a6)"
    : props.gradient === "from-blue-400 to-indigo-500"
      ? "linear-gradient(to bottom right, #60a5fa, #6366f1)"
      : "linear-gradient(to bottom right, #fb7185, #ec4899)"};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const BodyTypeTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const BodyTypeDescription = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
  text-align: center;
  margin-bottom: 1rem;
`;

const AnalysisDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #9ca3af;
  font-size: 0.75rem;
  margin-bottom: 1rem;
`;

const ViewResultButton = styled(Button)`
  width: 100%;
  background: linear-gradient(to right, #f472b6, #ec4899);
  color: white;
  border: none;

  &:hover {
    background: linear-gradient(to right, #ec4899, #db2777);
  }
`;
