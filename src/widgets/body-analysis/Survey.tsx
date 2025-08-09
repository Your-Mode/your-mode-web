import { Heart, Loader2, Send } from "lucide-react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import { useEffect, useRef, useState } from "react";
import { ChatResponse } from "@/src/shared/types/body-type";
import { useChat } from "@/src/widgets/body-analysis/feature/mutation/useChat";
import { CardContent, CardHeader, CardTitle } from "@/src/shared/components/ui/card";

export const surveyQuestions = [
  {
    id: 1,
    question: "피부는 어떤 느낌인가요?",
    options: [
      { value: "A", label: "피부가 탄탄하고 쫀쫀한 탄력감이 느껴진다", type: "straight" },
      { value: "B", label: "피부가 부드럽고 말랑말랑하다", type: "wave" },
      { value: "C", label: "피부가 얇고 건조한 느낌이다", type: "natural" },
    ],
    chatbotResponse: {
      A: "건강하고 탄탄한 골격을 가지고 계시는군요! 💪 직선적인 매력이 느껴져요.",
      B: "부드럽고 여성스러운 곡선미를 가지고 계시네요! ✨ 우아한 느낌이에요.",
      C: "세련되고 날씬한 골격이시군요! 🌟 자연스러운 매력이 있어요.",
    },
  },
  {
    id: 2,
    question: "몸의 전체적인 느낌은 어떠한가요?",
    options: [
      { value: "A", label: "전체적으로 근육이 잘 느껴지고, 근육이 잘 붙는 편이다", type: "straight" },
      { value: "B", label: "전체적으로 지방이 잘 느껴지고, 근육이 잘 붙지 않는 편이다", type: "wave" },
      { value: "C", label: "근육이나 지방이 잘 붙지 않는 편이다", type: "natural" },
    ],
    chatbotResponse: {
      A: "운동 효과가 잘 나타나는 체질이시군요! 활동적인 분이시네요 💪",
      B: "부드러운 라인을 자연스럽게 유지하는 체질이에요! 😌",
      C: "자연스럽게 슬림한 라인을 유지하시는군요! 부러워요 🌟",
    },
  },
  {
    id: 3,
    question: "살찌는 순서는 어떠한가요?",
    options: [
      { value: "A", label: "상체 (얼굴, 팔뚝, 배)에 살이 먼저 붙는 편이다", type: "straight" },
      { value: "B", label: "하체 (허벅지, 배, 특히 승마살)에 살이 먼저 붙는 편이다", type: "wave" },
      { value: "C", label: "살이나 근육이 잘 붙지 않으며, 몸 전체에 고르게 살이 붙는 편이다", type: "natural" },
    ],
    chatbotResponse: {
      A: "운동 효과가 잘 나타나는 체질이시군요! 활동적인 분이시네요 💪",
      B: "부드러운 라인을 자연스럽게 유지하는 체질이에요! 😌",
      C: "자연스럽게 슬림한 라인을 유지하시는군요! 부러워요 🌟",
    },
  },
  {
    id: 4,
    question: "목 길이와 두께는 어떠한가요?",
    options: [
      { value: "A", label: "목이 짧은 편이며, 승모근이 부각되는 편이다", type: "straight" },
      { value: "B", label: "목이 가늘고 긴 편이며 승모근이 크게 부각되지 않는 편이다", type: "wave" },
      { value: "C", label: "목이 길고 가늘며, 힘줄이나 뼈가 부각되는 편이다", type: "natural" },
    ],
    chatbotResponse: {
      A: "안정감 있는 목 라인이시네요! 든든한 느낌이에요 👍",
      B: "우아하고 긴 목 라인이 정말 멋져요! 백조 같아요 ✨",
      C: "강인하고 개성있는 목 라인이군요! 카리스마가 느껴져요 💫",
    },
  },
  {
    id: 5,
    question: "쇄골은 어떠한가요?",
    options: [
      { value: "A", label: "쇄골이 전체적으로 거의 보이지 않는 편이다", type: "straight" },
      { value: "B", label: "쇄골이 가늘고 자연스럽게 보이는 편이다", type: "wave" },
      { value: "C", label: "쇄골이 뚜렷하게 보이고 뼈가 도드라지는 편이다", type: "natural" },
    ],
    chatbotResponse: {
      A: "부드럽고 자연스러운 쇄골 라인이네요! 포근한 느낌이 들어요 😊",
      B: "우아하고 섬세한 쇄골이에요! 목걸이가 잘 어울릴 것 같아요 ✨",
      C: "세련되고 개성있는 쇄골 라인이군요! 시크한 매력이 있어요 💫",
    },
  },
  {
    id: 6,
    question: "어깨는 어떠한가요?",
    options: [
      { value: "A", label: "어깨가 넓고 직선적인 느낌이며, 탄탄한 편이다", type: "straight" },
      { value: "B", label: "어깨가 좁고 둥글며 좁은 편이다", type: "wave" },
      { value: "C", label: "어깨가 넓은 편이고, 어깨 뼈가 부각되는 편이다", type: "natural" },
    ],
    chatbotResponse: {
      A: "당당하고 강인한 어깨 라인이네요! 리더십이 느껴져요 💪",
      B: "부드럽고 여성스러운 어깨 라인이에요! 온화한 매력이 있어요 💕",
      C: "개성있고 모던한 어깨 라인이군요! 독특한 매력이 있어요 ✨",
    },
  },
  {
    id: 7,
    question: "바스트는 어떠한가요?",
    options: [
      { value: "A", label: "바스트탑이 높고, 볼륨감과 탄력이 있는 편이다", type: "straight" },
      { value: "B", label: "바스트탑이 낮고 볼륨감이 적으며, 부드러운 편이다", type: "wave" },
      { value: "C", label: "바스트보다 가슴 주변(쇄골, 갈비뼈 등) 뼈가 부각되는 편이다", type: "natural" },
    ],
    chatbotResponse: {
      A: "볼륨감 있고 당당한 라인이시네요! 자신감이 느껴져요 😊",
      B: "자연스럽고 부드러운 라인이에요! 우아한 매력이 있어요 💫",
      C: "세련되고 모던한 실루엣이군요! 고급스러운 느낌이에요 ✨",
    },
  },
  {
    id: 8,
    question: "허리 길이나 라인은 어떠한가요?",
    options: [
      { value: "A", label: "허리가 짧고 직선적인 느낌이며 굴곡이 적다", type: "straight" },
      { value: "B", label: "허리가 길고 자연스럽게 잘록한 느낌이 있다", type: "wave" },
      { value: "C", label: "허리가 길고 굴곡이 거의 없이 일자로 뻗은 느낌이다", type: "natural" },
    ],
    chatbotResponse: {
      A: "탄탄하고 안정적인 허리 라인이네요! 건강미가 넘쳐요 💪",
      B: "자연스럽고 아름다운 허리 곡선이에요! 완벽한 실루엣이네요 💕",
      C: "깔끔하고 모던한 허리 라인이군요! 세련된 느낌이에요 ✨",
    },
  },
  {
    id: 9,
    question: "엉덩이의 실루엣은 어떠한가요?",
    options: [
      { value: "A", label: "엉덩이가 크고 볼륨감이 있으며 탄력이 있다", type: "straight" },
      { value: "B", label: "입체감이 적고, 근육이 부족해 아래로 쳐진 편이다", type: "wave" },
      { value: "C", label: "입체감이 적고 납작한 편이다", type: "natural" },
    ],
    chatbotResponse: {
      A: "건강하고 탄력있는 힙 라인이시네요! 활력이 넘쳐요 🍑",
      B: "부드럽고 자연스러운 힙 라인이에요! 편안한 느낌이 좋아요 😌",
      C: "슬림하고 깔끔한 힙 라인이군요! 모델 같은 느낌이에요 ✨",
    },
  },
  {
    id: 10,
    question: "허벅지의 실루엣은 어떠한가요?",
    options: [
      { value: "A", label: "허벅지가 탄탄하고 근육이 많아 탄력이 있다", type: "straight" },
      { value: "B", label: "허벅지 바깥쪽 (승마살)에 살이 잘 붙는 편이다", type: "wave" },
      { value: "C", label: "허벅지 굵기가 전체적으로 얇은 편이다", type: "natural" },
    ],
    chatbotResponse: {
      A: "탄탄하고 건강한 허벅지 라인이네요! 운동을 좋아하시나봐요 💪",
      B: "부드럽고 곡선적인 허벅지 라인이에요! 여성스러운 매력이 있어요 💫",
      C: "슬림하고 우아한 허벅지 라인이군요! 발레리나 같아요 ✨",
    },
  },
  {
    id: 11,
    question: "무릎 뼈의 모양은 어떠한가요?",
    options: [
      { value: "A", label: "무릎 뼈가 작고 둥글며, 뼈가 눈에 잘 띄지 않는 편이다", type: "straight" },
      { value: "B", label: "무릎 뼈는 보통이고 약간 눈에 띄는 편이다", type: "wave" },
      { value: "C", label: "무릎 뼈가 뚜렷하고 큰 편이다", type: "natural" },
    ],
    chatbotResponse: {
      A: "깔끔하고 예쁜 무릎이시네요! 미니스커트가 잘 어울릴 것 같아요 😊",
      B: "부드럽고 자연스러운 무릎 라인이에요! 여성스러운 매력이 있어요 💫",
      C: "개성있고 모던한 무릎 라인이군요! 독특한 아름다움이 있어요 ✨",
    },
  },
  {
    id: 12,
    question: "팔의 모양은 어떠한가요?",
    options: [
      { value: "A", label: "손목이 가늘지만 팔 근육이 탄탄한 편이다", type: "straight" },
      { value: "B", label: "팔이 부드럽게 이어지는 느낌이며 말랑한 편이다", type: "wave" },
      { value: "C", label: "팔이 가늘고 어깨, 팔꿈치, 손목뼈가 부각되는 편이다", type: "natural" },
    ],
    chatbotResponse: {
      A: "근육이 느껴지는 건강한 팔 라인이에요! 파워풀한 매력이 있어요 💪",
      B: "부드럽고 자연스러운 팔 라인이네요! 여리여리한 인상이에요 😊",
      C: "가늘고 길어 보이는 팔 라인이에요! 모델 같은 인상이 있어요 ✨",
    },
  },
  {
    id: 13,
    question: "손의 모양은 어떠한가요?",
    options: [
      { value: "A", label: "손 크기는 작은 편이고, 손바닥에 두께감이 있다", type: "straight" },
      { value: "B", label: "손 크기는 보통이며, 손가락이 가늘고 얇은 편이다", type: "wave" },
      { value: "C", label: "손가락이 길고 가늘며, 뼈와 핏줄 등이 눈에 띄는 편이다", type: "natural" },
    ],
    chatbotResponse: {
      A: "아담하고 귀여운 손이시네요! 포근한 느낌이 들어요 👐",
      B: "섬세하고 우아한 손이에요! 예술가 같은 손이네요 ✋",
      C: "길고 세련된 손가락이군요! 피아니스트 같은 손이에요 💅",
    },
  },
  {
    id: 14,
    question: "한 쪽 손목을 다른 한손으로 감쌌을때 어떤 느낌인가요?",
    options: [
      { value: "A", label: "손목이 가늘고 동그란 느낌이다", type: "straight" },
      { value: "B", label: "손목이 타원형 같거나 납작한 느낌이다", type: "wave" },
      { value: "C", label: "손목의 뼈나 힘줄이 잘 느껴진다", type: "natural" },
    ],
    chatbotResponse: {
      A: "가늘고 예쁜 손목이시네요! 팔찌가 잘 어울릴 것 같아요 💫",
      B: "자연스럽고 부드러운 손목이에요! 편안한 느낌이 좋아요 😊",
      C: "개성있고 세련된 손목 라인이군요! 독특한 매력이 있어요 ✨",
    },
  },
  {
    id: 15,
    question: "전체적인 체형의 느낌은 어떠한가요?",
    options: [
      { value: "A", label: "상체가 발달한 느낌이며 허리가 짧고 탄탄한 느낌이다", type: "straight" },
      { value: "B", label: "하체가 상대적으로 부각되며 전체적으로 여리여리한 느낌이다", type: "wave" },
      { value: "C", label: "전체적으로 뼈가 도드라져보이고 직선적인 느낌이 강하다", type: "natural" },
    ],
    chatbotResponse: {
      A: "건강하고 든든한 체형이시군요! 활력이 느껴져요 💪",
      B: "여리여리하고 부드러운 인상이세요! 포근한 매력이 있어요 🌸",
      C: "세련되고 시크한 체형이에요! 모델 포스가 넘쳐요 ✨",
    },
  },
];


const Survey = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  /*const { gender, height, weight } = useApplyUserInfoStore();*/
  const [answers, setAnswers] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"online" | "offline">("online");
  const [lastResponseStatus, setLastResponseStatus] = useState<"success" | "failed" | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  /*const { mutate: postResult } = usePostResult();*/

  // useChat 훅 사용
  const initialMessage = `안녕하세요! 당신만의 완벽한 스타일을 찾아드릴게요 ✨

총 17개의 질문을 통해 당신의 골격 타입을 정확히 분석해드릴게요.

옵션을 선택하거나 자유롭게 대화하듯 답변해주세요.

첫 번째 질문입니다:
${surveyQuestions[0].question}
- ${surveyQuestions[0].options[0].label}
- ${surveyQuestions[0].options[1].label}
- ${surveyQuestions[0].options[2].label}
`;

  const { messages, send, addBotMessage, isLoading, lastResponse, error, isError } = useChat(initialMessage);

  /* ---------------- effects ---------------- */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 네트워크 상태 모니터링
  useEffect(() => {
    const handleOnline = () => setConnectionStatus("online");
    const handleOffline = () => setConnectionStatus("offline");

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // 채팅 응답 처리
  useEffect(() => {
    if (lastResponse && !isLoading) {
      handleChatResponse(lastResponse);
    }
  }, [lastResponse, isLoading]);

  // 에러 처리
  useEffect(() => {
    if (isError && error) {
      console.error("Chat error:", error);
      setConnectionStatus("offline");
    } else if (!isError) {
      setConnectionStatus("online");
    }
  }, [isError, error]);

  /* ---------------- handlers ---------------- */
  const handleChatResponse = async (response: ChatResponse) => {
    setIsProcessing(true);

    // isSuccess 체크
    if (!response.isSuccess) {
      // 실패한 경우: 현재 질문에 머물고 다시 답변 요청
      setLastResponseStatus("failed");

      setTimeout(() => {
        setIsProcessing(false);
      }, 1000);

      return;
    }

    // 성공한 경우: 답변 저장하고 다음 질문으로
    setLastResponseStatus("success");
    const newAnswers = [...answers, response.selected];
    setAnswers(newAnswers);

    // 다음 질문 또는 완료 처리
    if (currentQuestion < surveyQuestions.length - 1) {
      const nextIndex = currentQuestion + 1;

      setTimeout(() => {
        setCurrentQuestion(nextIndex);

        // API에서 제공한 nextQuestion이 있으면 사용, 없으면 기본 질문 사용
        const questionText = response.nextQuestion || surveyQuestions[nextIndex].question;

        addBotMessage(`${nextIndex + 1}번째 질문이에요 💕

${questionText}

자유롭게 답변해주세요!`);
        setIsProcessing(false);
      }, 1500);
    } else {
      // 설문 완료
      try {
        const authToken = localStorage.getItem("aFfuthToken");
        if (authToken) {
          const token = JSON.parse(authToken);
          /*await saveSurveyAnswers(token.userId, token.phone, newAnswers);*/
        }
      } catch ( error ) {
        console.error("설문 답변 저장 오류:", error);
      }

      localStorage.setItem("surveyAnswers", JSON.stringify(newAnswers));

      addBotMessage(
        "모든 질문이 완료되었어요! 🎉\n\n지금 당신만의 완벽한 스타일을 분석하고 있어요. 조금만 기다려주세요... ✨\n\n📊 답변이 안전하게 저장되었습니다!",
      );

      /*const requestData: BodyResultRequest = {
        answers: newAnswers,
        gender: gender,
        height: height,
        weight: weight,
      };

      postResult(requestData);*/
    }
  };

  const handleSend = () => {
    if (!inputMessage.trim() || isProcessing || isLoading) return;

    const question = surveyQuestions[currentQuestion];
    console.log(question);
    send(question.question, inputMessage.trim());
    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const progress = ((currentQuestion + 1) / surveyQuestions.length) * 100;

  return (
    <Container>
      {/* Progress */}
      <ProgressWrap>
        <ProgressHeader>
          <ProgressTitle>
            <Heart size={24} color="#f43f5e" />
            <span>스타일 진단</span>
          </ProgressTitle>
          <ProgressCounter>
            {currentQuestion + 1}/{surveyQuestions.length}
          </ProgressCounter>
        </ProgressHeader>
        <ProgressTrack>
          <ProgressFill pct={progress} />
        </ProgressTrack>
      </ProgressWrap>

      {/* 안내 메시지 */}
      <Notice>
        <NoticeInner>
          <span style={{ fontSize: "1.125rem" }}>⚠️</span>
          <NoticeText>답변 후에는 이전 질문으로 돌아갈 수 없습니다. 신중하게 선택해주세요!</NoticeText>
        </NoticeInner>
      </Notice>

      {/* 채팅 영역 */}
      <ChatCard>
        <SurveyCardContent>
          {/* 메시지 리스트 */}
          <Messages>
            {messages.map((m, i) => (
              <Row key={i} end={m.type === "user"}>
                <Bubble variant={m.type as "bot" | "system" | "user"}>
                  <pre style={{ margin: 0, fontFamily: "inherit", whiteSpace: "pre-line" }}>{m.content}</pre>
                  <Timestamp>{m.timestamp.toLocaleTimeString()}</Timestamp>
                </Bubble>
              </Row>
            ))}
            <div ref={chatEndRef} />
          </Messages>

          {/* 입력 */}
          <InputRow>
            <Input
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={
                lastResponseStatus === "failed"
                  ? "더 구체적으로 답변해주세요..."
                  : connectionStatus === "offline"
                    ? "오프라인 모드 (기본 분석)"
                    : "대화로 답변해보세요..."
              }
              disabled={isLoading || isProcessing}
            />
            <Button onClick={handleSend} disabled={isLoading || isProcessing || !inputMessage.trim()}>
              {isLoading ? (
                <Spin>
                  <Loader2 size={16} />
                </Spin>
              ) : (
                <Send size={16} />
              )}
            </Button>
          </InputRow>

          <Hint>
            Enter 로 전송 •{" "}
            {lastResponseStatus === "failed"
              ? "답변을 다시 해주세요"
              : connectionStatus === "offline"
                ? "오프라인 모드 (기본 분석 사용)"
                : isLoading || isProcessing
                  ? "처리 중..."
                  : "AI가 답변을 분석해드려요"}
          </Hint>
        </SurveyCardContent>
      </ChatCard>
    </Container>
  );
}

export default Survey;

// 컨테이너
const Container = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 1.5rem 1rem;
`;

// 프로그레스
const ProgressWrap = styled.div`
  margin-bottom: 1.5rem;
`;

const ProgressHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ProgressTitle = styled.h1`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #1f2937;
  font-weight: 800;
  font-size: 1.25rem;

  @media (min-width: 768px) {
    font-size: 1.875rem;
  }
`;

const ProgressCounter = styled.span`
  font-size: 1.125rem;
  font-weight: 700;
  color: #f43f5e;
`;

const ProgressTrack = styled.div`
  height: 0.5rem;
  background: #e5e7eb;
  border-radius: 9999px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ pct: number }>`
  height: 100%;
  width: ${({ pct }) => `${pct}%`};
  background-image: linear-gradient(to right, #fb7185, #ec4899);
  transition: width 0.5s ease;
`;

// 안내 배너
const Notice = styled.div`
  margin-bottom: 1rem;
  padding: 0.75rem;
  background-image: linear-gradient(to right, #fff1f2, #fdf2f8);
  border: 1px solid #fecdd3;
  border-radius: 0.5rem;
`;

const NoticeInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: .5rem;
`;

const NoticeText = styled.p`
  color: #e11d48;
  font-size: .875rem;
  font-weight: 500;
  margin: 0;
`;

// 채팅 카드
const ChatCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  box-shadow:
    0 20px 25px -5px rgba(0,0,0,0.1),
    0 10px 10px -5px rgba(0,0,0,0.04);
  display: flex;
  flex-direction: column;
  height: 70vh;
  border-radius: .5rem;
  overflow: hidden;
`;

// 메시지 리스트
const Messages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: .5rem;
  display: flex;
  flex-direction: column;
  gap: .75rem;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE, Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
`;

const Row = styled.div<{ end?: boolean }>`
  display: flex;
  justify-content: ${({ end }) => (end ? "flex-end" : "flex-start")};
`;

const Bubble = styled.div<{ variant: "bot" | "system" | "user" }>`
  max-width: 80%;
  border-radius: .75rem;
  padding: .75rem;
  font-size: .875rem;
  white-space: pre-line;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";

  @media (min-width: 768px) {
    font-size: 1rem;
  }

  ${({ variant }) =>
  variant === "bot" ? `
      background-image: linear-gradient(to right, #fdf2f8, #faf5ff);
      border: 1px solid #fbcfe8;
    ` : variant === "system" ? `
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      color: #2563eb;
    ` : `
      background: #ffe4e6;
      border: 1px solid #fecdd3;
    `
}
`;

const Timestamp = styled.span`
  display: block;
  margin-top: .25rem;
  text-align: right;
  font-size: .75rem;
  color: #6b7280;
`;

// 입력영역
const InputRow = styled.div`
  margin-top: .75rem;
  display: flex;
  gap: .5rem;
  align-items: center;
`;

const Hint = styled.p`
  margin-top: .25rem;
  font-size: .75rem;
  color: #6b7280;
`;

// 아이콘 스피너 대체
const spin = keyframes`
  to { transform: rotate(360deg); }
`;
const Spin = styled.span`
  display: inline-flex;
  animation: ${spin} 1s linear infinite;
`;

const SurveyCardContent = styled(CardContent)`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem; /* p-4 */
  overflow: hidden;
`;
