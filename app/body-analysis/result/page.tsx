"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import styled from "@emotion/styled"
import AuthGuard from "@/src/shared/components/auth-guard"
import { ChevronLeft, Target, Award, Sparkles, Eye, Share2, Download } from "lucide-react"

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom right, #f8fafc, #f1f5f9);
  padding-top: 4rem;
  padding-bottom: 2rem;
`

const MaxWidthContainer = styled.div`
  max-width: 48rem;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (max-width: 640px) {
    padding: 0 0.75rem;
  }
`

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: #4b5563;
  margin-bottom: 1.5rem;
  transition: color 0.3s ease;
  text-decoration: none;

  &:hover {
    color: #111827;
  }
`

const ResultIconContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  background: linear-gradient(to right, #f472b6, #ec4899);
  border-radius: 50%;
  margin-bottom: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
`

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 1rem;
`

const TitleUnderline = styled.div`
  width: 6rem;
  height: 0.25rem;
  background: linear-gradient(to right, #f472b6, #ec4899);
  margin: 0 auto;
  border-radius: 9999px;
`

const ResultCard = styled.div<{ bgGradient: string }>`
  border: none;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  background: ${(props) =>
    props.bgGradient === "from-emerald-50 to-teal-50"
      ? "linear-gradient(to bottom right, #ecfdf5, #f0fdfa)"
      : props.bgGradient === "from-blue-50 to-indigo-50"
        ? "linear-gradient(to bottom right, #eff6ff, #eef2ff)"
        : "linear-gradient(to bottom right, #fdf2f8, #fce7f3)"};
  backdrop-filter: blur(8px);
  border-radius: 0.75rem;
`

const ResultContent = styled.div`
  padding: 2rem;
  text-align: center;
`

const ResultTypeContainer = styled.div`
  margin-bottom: 2rem;
`

const ResultTypeIcon = styled.div<{ gradient: string }>`
  width: 8rem;
  height: 8rem;
  margin: 0 auto 1.5rem;
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
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transform: scale(1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`

const ResultTypeTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 0.75rem;
`

const ResultTypeDescription = styled.p`
  color: #374151;
  font-size: 1.125rem;
  text-align: center;
  margin: 0 auto 1.5rem;
  max-width: 42rem;
  line-height: 1.6;
`

const AnalysisDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 2rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 9999px;
  backdrop-filter: blur(8px);
  display: inline-flex;
`

const ResultGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
`

const ResultSection = styled.div`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  text-align: left;
  width: 100%;
`

const ResultSectionTitle = styled.h3`
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  text-align: left;
  font-size: 1.25rem;
`

const ResultSectionDot = styled.span<{ accent: string }>`
  width: 0.75rem;
  height: 0.75rem;
  background: ${(props) =>
    props.accent === "emerald-500" ? "#10b981" : props.accent === "blue-500" ? "#3b82f6" : "#f43f5e"};
  border-radius: 50%;
  margin-right: 0.5rem;
`

const ResultParagraph = styled.p`
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 1rem;
`

const ResultActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`

const ActionButton = styled(Button)<{ gradient?: string }>`
  background: ${(props) =>
    props.gradient
      ? props.gradient === "from-emerald-400 to-teal-500"
        ? "linear-gradient(to right, #34d399, #14b8a6)"
        : props.gradient === "from-blue-400 to-indigo-500"
          ? "linear-gradient(to right, #60a5fa, #6366f1)"
          : "linear-gradient(to right, #fb7185, #ec4899)"
      : "transparent"};
  color: ${(props) => (props.gradient ? "white" : "#374151")};
  border: ${(props) => (props.gradient ? "none" : "2px solid #d1d5db")};
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  transform: scale(1);
  transition: all 0.3s ease;
  box-shadow: ${(props) => (props.gradient ? "0 10px 15px -3px rgba(0, 0, 0, 0.1)" : "none")};

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    transform: scale(1.05);
    background: ${(props) => (props.gradient ? props.gradient : "#f9fafb")};
  }
`

const SecondaryActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: center;
  }
`

export default function BodyAnalysisResultPage() {
  // 실제로는 사용자의 체형분석 결과를 API에서 가져와야 합니다
  const bodyAnalysisResult = {
    type: "wave" as const,
    analysisDate: "2025년 6월 10일",
  }

  const getResultInfo = (type: "natural" | "straight" | "wave") => {
    const info = {
      natural: {
        title: "내추럴 타입",
        description:
          "자연스럽고 건강한 매력을 가진 체형입니다. 탄탄한 골격과 근육질 체형으로 캐주얼하고 편안한 스타일이 잘 어울립니다.",
        detailedDescription:
          "내추럴 타입은 골격이 탄탄하고 근육이 발달하기 쉬운 체형으로, 자연스러운 건강미가 돋보이는 것이 특징입니다. 어깨가 넓고 직선적이며, 전체적으로 안정감 있는 실루엣을 가지고 있습니다.",
        characteristics:
          "내추럴 타입의 가장 큰 특징은 탄탄하고 넓은 어깨 라인과 근육이 발달하기 쉬운 체질입니다. 직선적이고 각진 골격 구조를 가지고 있으며, 자연스러운 건강미와 활동적인 인상을 줍니다. 상체가 발달한 느낌의 체형으로, 전체적으로 균형 잡힌 실루엣을 보여줍니다. 피부는 탄탄하고 쫀득한 편이며, 근육이 붙기 쉬운 체질적 특성을 가지고 있습니다.",
        strengths:
          "내추럴 타입의 매력 포인트는 건강하고 활력 넘치는 이미지입니다. 스포티하고 캐주얼한 룩이 자연스럽게 어울리며, 자신감 있고 당당한 인상을 줍니다. 다양한 활동복이 잘 어울리고, 편안하면서도 세련된 스타일을 쉽게 소화할 수 있습니다. 특히 자연스러운 소재와 실루엣이 체형의 장점을 더욱 부각시켜 줍니다.",
        recommendations:
          "내추럴 타입에게는 오버사이즈 핏의 편안한 실루엣과 자연스러운 소재(코튼, 리넨, 데님)가 잘 어울립니다. 미니멀하고 심플한 디자인과 스트레이트 핏의 바지와 스커트가 체형을 돋보이게 합니다. 캐주얼한 니트와 셔츠, 편안한 스니커즈와 플랫슈즈 등이 추천 아이템입니다. 자연스러운 컬러와 패턴을 활용하면 건강한 매력을 더욱 강조할 수 있습니다.",
        avoidItems:
          "내추럴 타입은 과도하게 타이트한 핏이나 지나치게 화려한 패턴, 장식이 많은 디자인은 피하는 것이 좋습니다. 너무 여성스럽고 프릴이 많은 디자인이나 얇고 투명한 소재, 과도한 레이어링은 체형의 자연스러운 매력을 가릴 수 있습니다. 대신 체형의 건강한 라인을 살릴 수 있는 심플하고 편안한 스타일을 선택하세요.",
        improvements:
          "내추럴 타입의 체형을 더욱 돋보이게 하려면 허리 라인을 살려주는 벨트를 활용하고, 상체와 하체의 균형을 맞추는 스타일링을 추천합니다. 부드러운 곡선을 만들어주는 아이템을 선택하고, 목선을 부드럽게 보이게 하는 네크라인을 활용하면 더욱 세련된 이미지를 연출할 수 있습니다. 직선적인 실루엣에 부드러운 요소를 더해 균형감을 높이는 것이 중요합니다.",
        stylingTips:
          "내추럴 타입을 위한 스타일링 팁으로는 자연스러운 웨이스트 마크로 여성스러움을 강조하고, 부드러운 소재와 하드한 소재를 적절히 믹스하는 것이 좋습니다. 심플한 액세서리로 포인트를 주고, 편안하면서도 세련된 룩을 연출하세요. 자연스러운 헤어스타일과 메이크업으로 건강한 이미지를 완성하면 내추럴 타입의 매력을 극대화할 수 있습니다.",
        gradient: "from-emerald-400 to-teal-500",
        bgGradient: "from-emerald-50 to-teal-50",
        accent: "emerald-500",
      },
      straight: {
        title: "스트레이트 타입",
        description:
          "깔끔하고 시크한 매력을 가진 체형입니다. 직선적이고 각진 골격으로 모던하고 세련된 스타일이 잘 어울립니다.",
        detailedDescription:
          "스트레이트 타입은 골격이 직선적이고 각진 것이 특징으로, 날카롭고 세련된 인상을 줍니다. 뼈대가 뚜렷하고 근육이나 지방이 잘 붙지 않아 슬림한 실루엣을 가지고 있습니다.",
        characteristics:
          "스트레이트 타입은 직선적이고 각진 골격 라인이 특징적입니다. 뚜렷하게 드러나는 뼈대와 근육이나 지방이 잘 붙지 않는 체질로, 날카롭고 시크한 인상을 줍니다. 슬림하고 길어 보이는 실루엣을 가지고 있으며, 쇄골이나 어깨뼈 등의 골격이 두드러지게 보이는 경향이 있습니다. 피부는 얇고 건조한 느낌이며, 전체적으로 직선적인 라인이 강조됩니다.",
        strengths:
          "스트레이트 타입의 매력 포인트는 모던하고 세련된 이미지입니다. 시크하고 쿨한 매력이 돋보이며, 구조적인 디자인이 특히 잘 어울립니다. 미니멀한 스타일을 완벽하게 소화할 수 있으며, 날렵하고 세련된 실루엣이 강점입니다. 특히 깔끔한 라인의 의상과 모던한 디자인이 체형의 장점을 더욱 부각시켜 줍니다.",
        recommendations:
          "스트레이트 타입에게는 구조적이고 테일러드한 핏과 깔끔한 라인의 재킷, 코트가 잘 어울립니다. 모던한 실루엣의 원피스와 스트레이트 핏의 팬츠, 미니멀한 디자인의 상의가 체형을 돋보이게 합니다. 구두나 부츠 등 정형화된 신발도 추천합니다. 모노톤이나 차분한 컬러를 활용하면 세련된 이미지를 더욱 강조할 수 있습니다.",
        avoidItems:
          "스트레이트 타입은 과도하게 볼륨감 있는 디자인이나 너무 부드럽고 흘러내리는 소재는 피하는 것이 좋습니다. 지나치게 화려한 패턴이나 프릴, 러플이 많은 디자인, 과도한 레이어링은 체형의 시크한 매력을 가릴 수 있습니다. 대신 체형의 직선적인 라인을 살릴 수 있는 깔끔하고 구조적인 스타일을 선택하세요.",
        improvements:
          "스트레이트 타입의 체형을 더욱 돋보이게 하려면 부드러운 곡선을 만들어주는 아이템을 추가하고, 따뜻한 느낌의 컬러나 소재를 활용하는 것이 좋습니다. 적절한 볼륨감으로 여성스러움을 연출하고, 액세서리로 포인트와 온화함을 더하면 균형 잡힌 이미지를 만들 수 있습니다. 직선적인 라인에 부드러운 요소를 더해 조화를 이루는 것이 중요합니다.",
        stylingTips:
          "스트레이트 타입을 위한 스타일링 팁으로는 하드한 라인을 부드럽게 중화시키는 스타일링과 모노톤 컬러로 세련된 룩을 완성하는 것이 좋습니다. 심플한 실루엣에 포인트 액세서리를 활용하고, 깔끔한 헤어스타일로 전체적인 조화를 이루세요. 미니멀한 디자인과 구조적인 아이템을 중심으로 스타일링하면 스트레이트 타입의 매력을 극대화할 수 있습니다.",
        gradient: "from-blue-400 to-indigo-500",
        bgGradient: "from-blue-50 to-indigo-50",
        accent: "blue-500",
      },
      wave: {
        title: "웨이브 타입",
        description:
          "우아하고 여성스러운 매력을 가진 체형입니다. 부드러운 곡선과 유연한 라인으로 로맨틱하고 페미닌한 스타일이 잘 어울립니다.",
        detailedDescription:
          "웨이브 타입은 부드럽고 곡선적인 라인이 특징으로, 자연스러운 여성스러움이 돋보이는 체형입니다. 전체적으로 유연하고 부드러운 인상을 주며, 하체 쪽에 볼륨감이 있는 것이 특징입니다.",
        characteristics:
          "웨이브 타입은 부드럽고 곡선적인 바디 라인이 특징입니다. 자연스러운 웨이스트 곡선과 하체에 볼륨감이 있는 체형으로, 유연하고 여성스러운 실루엣을 가지고 있습니다. 부드러운 피부 질감을 지니고 있으며, 어깨가 좁고 둥글게 떨어지는 형태가 많습니다. 목이 길고 부드러운 곡선을 이루며, 전체적으로 부드럽고 유연한 인상을 줍니다.",
        strengths:
          "웨이브 타입의 매력 포인트는 자연스러운 여성스러운 매력입니다. 우아하고 로맨틱한 이미지가 돋보이며, 부드러운 곡선미가 특히 매력적입니다. 페미닌한 스타일을 완벽하게 소화할 수 있으며, 드레이프되는 소재와 유연한 실루엣이 체형의 장점을 더욱 부각시켜 줍니다. 특히 부드러운 라인과 여성스러운 디테일이 잘 어울립니다.",
        recommendations:
          "웨이브 타입에게는 플로우하고 드레이프한 핏과 부드러운 소재(실크, 쉬폰, 저지)가 잘 어울립니다. 곡선을 살려주는 A라인 실루엣과 웨이스트를 강조하는 디자인, 로맨틱한 블라우스와 원피스가 체형을 돋보이게 합니다. 하이힐이나 여성스러운 신발도 추천합니다. 부드러운 컬러와 유연한 라인의 의상을 선택하면 웨이브 타입의 매력을 더욱 강조할 수 있습니다.",
        avoidItems:
          "웨이브 타입은 과도하게 구조적이고 딱딱한 디자인이나 너무 타이트하거나 몸에 달라붙는 핏은 피하는 것이 좋습니다. 지나치게 하드한 소재나 각진 라인이 강조되는 디자인, 과도하게 캐주얼한 스타일은 체형의 여성스러운 매력을 가릴 수 있습니다. 대신 체형의 부드러운 곡선을 살릴 수 있는 유연하고 여성스러운 스타일을 선택하세요.",
        improvements:
          "웨이브 타입의 체형을 더욱 돋보이게 하려면 상체 볼륨을 늘려 균형감을 맞추고, 어깨 라인을 강조하는 디자인을 선택하는 것이 좋습니다. 상의에 포인트를 주어 시선을 분산시키고, 세로 라인을 강조하는 스타일링으로 비율을 더 좋아 보이게 할 수 있습니다. 하체의 볼륨과 상체의 균형을 맞추는 것이 중요합니다.",
        stylingTips:
          "웨이브 타입을 위한 스타일링 팁으로는 웨이스트 마크로 곡선미를 강조하고, 부드러운 컬러와 패턴을 활용하는 것이 좋습니다. 레이어링으로 상체 볼륨을 연출하고, 여성스러운 액세서리로 완성도를 높이세요. 부드러운 웨이브 헤어스타일과 자연스러운 메이크업으로 여성스러운 이미지를 완성하면 웨이브 타입의 매력을 극대화할 수 있습니다.",
        gradient: "from-rose-400 to-pink-500",
        bgGradient: "from-rose-50 to-pink-50",
        accent: "rose-500",
      },
    }
    return info[type]
  }

  const resultInfo = getResultInfo(bodyAnalysisResult.type)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `나의 체형분석 결과: ${resultInfo.title}`,
          text: resultInfo.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log("공유 취소됨")
      }
    } else {
      // 웹 공유 API를 지원하지 않는 경우 클립보드에 복사
      navigator.clipboard.writeText(window.location.href)
      alert("링크가 클립보드에 복사되었습니다!")
    }
  }

  const handleDownload = () => {
    // PDF 다운로드 기능 구현 (실제로는 PDF 생성 라이브러리 사용)
    alert("PDF 다운로드 기능은 준비 중입니다!")
  }

  return (
    <AuthGuard requireAuth={true} message="체형분석 결과를 보려면 로그인이 필요합니다.">
      <Container>
        <MaxWidthContainer>
          <HeaderSection>
            <BackLink href="/mypage">
              <ChevronLeft size={20} style={{ marginRight: "0.5rem" }} />
              마이페이지로 돌아가기
            </BackLink>
            <ResultIconContainer>
              <Award size={32} color="white" />
            </ResultIconContainer>
            <Title>체형 분석 결과</Title>
            <TitleUnderline />
          </HeaderSection>

          <ResultCard bgGradient={resultInfo.bgGradient}>
            <ResultContent>
              <ResultTypeContainer>
                <ResultTypeIcon gradient={resultInfo.gradient}>
                  <Target size={64} color="white" />
                </ResultTypeIcon>
                <ResultTypeTitle>{resultInfo.title}</ResultTypeTitle>
                <AnalysisDate>
                  <Eye size={16} />
                  분석일: {bodyAnalysisResult.analysisDate}
                </AnalysisDate>
                <ResultTypeDescription>{resultInfo.detailedDescription}</ResultTypeDescription>
              </ResultTypeContainer>

              <ResultGrid>
                <ResultSection>
                  <ResultSectionTitle>
                    <ResultSectionDot accent={resultInfo.accent} />
                    상세 체형 특징
                  </ResultSectionTitle>
                  <ResultParagraph>{resultInfo.characteristics}</ResultParagraph>
                </ResultSection>

                <ResultSection>
                  <ResultSectionTitle>
                    <ResultSectionDot accent={resultInfo.accent} />
                    매력 포인트
                  </ResultSectionTitle>
                  <ResultParagraph>{resultInfo.strengths}</ResultParagraph>
                </ResultSection>

                <ResultSection>
                  <ResultSectionTitle>
                    <ResultSectionDot accent={resultInfo.accent} />
                    추천 스타일 & 아이템
                  </ResultSectionTitle>
                  <ResultParagraph>{resultInfo.recommendations}</ResultParagraph>
                </ResultSection>

                <ResultSection>
                  <ResultSectionTitle>
                    <ResultSectionDot accent={resultInfo.accent} />
                    피해야 할 스타일
                  </ResultSectionTitle>
                  <ResultParagraph>{resultInfo.avoidItems}</ResultParagraph>
                </ResultSection>

                <ResultSection>
                  <ResultSectionTitle>
                    <ResultSectionDot accent={resultInfo.accent} />
                    보완 포인트
                  </ResultSectionTitle>
                  <ResultParagraph>{resultInfo.improvements}</ResultParagraph>
                </ResultSection>

                <ResultSection>
                  <ResultSectionTitle>
                    <ResultSectionDot accent={resultInfo.accent} />
                    스타일링 팁
                  </ResultSectionTitle>
                  <ResultParagraph>{resultInfo.stylingTips}</ResultParagraph>
                </ResultSection>
              </ResultGrid>

              <ResultActions>
                <Link href="/content-application">
                  <ActionButton gradient={resultInfo.gradient}>
                    <Sparkles size={20} style={{ marginRight: "0.5rem" }} />
                    맞춤 스타일링 신청하기
                  </ActionButton>
                </Link>
                <Link href="/body-analysis">
                  <ActionButton>다시 진단하기</ActionButton>
                </Link>
              </ResultActions>

              <SecondaryActions>
                <ActionButton onClick={handleShare}>
                  <Share2 size={16} style={{ marginRight: "0.5rem" }} />
                  결과 공유하기
                </ActionButton>
                <ActionButton onClick={handleDownload}>
                  <Download size={16} style={{ marginRight: "0.5rem" }} />
                  PDF 다운로드
                </ActionButton>
              </SecondaryActions>
            </ResultContent>
          </ResultCard>
        </MaxWidthContainer>
      </Container>
    </AuthGuard>
  )
}
