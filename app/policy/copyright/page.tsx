"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/src/shared/components/ui/button";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";

const MainContainer = styled.div`
  min-height: 100vh;
  background-color: #fafafa;
  padding: 2rem 0;
`;

const MainContent = styled.main`
  max-width: 48rem;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 640px) {
    padding: 0 2rem;
  }
`;

const ContentContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  @media (max-width: 640px) {
    padding: 1.5rem;
    margin: 0 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
`;

const Title = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.875rem;
  font-weight: 700;
  color: #333;

  @media (max-width: 640px) {
    font-size: 1.5rem;
  }
`;

const Content = styled.div`
  line-height: 1.8;
  color: #374151;

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 2rem 0 1rem 0;
    color: #1f2937;
  }

  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin: 1.5rem 0 0.75rem 0;
    color: #374151;
  }

  p {
    margin-bottom: 1rem;
  }

  ul {
    margin: 1rem 0;
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.5rem;
    }
  }

  ol {
    margin: 1rem 0;
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.5rem;
    }
  }
`;

const LastUpdated = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
`;

const ContactInfo = styled.div`
  background-color: #f9fafb;
  border-radius: 6px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  border-left: 4px solid #3b82f6;
`;

export default function CopyrightPage() {
  const router = useRouter();

  return (
    <MainContainer>
      <MainContent>
        <ContentContainer>
          <Header>
            <Button variant="ghost" size="sm" onClick={router.back}>
              <ArrowLeft size={16} style={{ marginRight: "0.5rem" }} />
              홈으로
            </Button>
            <Title>저작권 정책</Title>
          </Header>

          <Content>
            <h2>제1조 (목적)</h2>
            <p>
              이 저작권 정책은 유어모드(이하 "회사")가 제공하는 패션 스타일링 서비스에서 사용되는 모든 콘텐츠의 저작권
              보호 및 이용에 관한 사항을 규정함을 목적으로 합니다.
            </p>

            <h2>제2조 (저작권의 귀속)</h2>
            <h3>1. 회사 제작 콘텐츠</h3>
            <p>회사가 직접 제작한 다음 콘텐츠에 대한 저작권은 회사에 귀속됩니다:</p>
            <ul>
              <li>스타일링 가이드 및 추천 콘텐츠</li>
              <li>체형 분석 알고리즘 및 결과</li>
              <li>패션 트렌드 분석 자료</li>
              <li>서비스 내 모든 텍스트, 이미지, 동영상</li>
              <li>웹사이트 디자인 및 레이아웃</li>
              <li>로고, 브랜드 아이덴티티</li>
            </ul>

            <h3>2. 사용자 제작 콘텐츠</h3>
            <p>
              사용자가 서비스에 업로드하거나 제작한 콘텐츠의 저작권은 해당 사용자에게 귀속됩니다. 단, 서비스 제공을 위해
              필요한 범위 내에서 회사가 이를 이용할 수 있습니다.
            </p>

            <h3>3. 제3자 콘텐츠</h3>
            <p>
              서비스에서 사용되는 제3자의 콘텐츠는 해당 저작권자의 동의를 받아 사용하며, 관련 저작권은 원 저작권자에게
              귀속됩니다.
            </p>

            <h2>제3조 (콘텐츠 이용 허가)</h2>
            <h3>1. 개인적 이용</h3>
            <p>사용자는 서비스에서 제공되는 콘텐츠를 개인적, 비상업적 목적으로만 이용할 수 있습니다.</p>

            <h3>2. 금지 행위</h3>
            <p>다음 행위는 엄격히 금지됩니다:</p>
            <ul>
              <li>콘텐츠의 무단 복제, 배포, 전송</li>
              <li>상업적 목적의 콘텐츠 이용</li>
              <li>콘텐츠의 수정, 변형, 2차 저작물 제작</li>
              <li>저작권 표시의 제거 또는 변경</li>
              <li>리버스 엔지니어링, 디컴파일</li>
            </ul>

            <h2>제4조 (사용자 콘텐츠 업로드)</h2>
            <h3>1. 업로드 조건</h3>
            <p>사용자가 콘텐츠를 업로드할 때는 다음 조건을 준수해야 합니다:</p>
            <ol>
              <li>본인이 저작권을 보유하거나 적법한 이용 권한을 가진 콘텐츠만 업로드</li>
              <li>제3자의 저작권, 초상권, 프라이버시권을 침해하지 않는 콘텐츠</li>
              <li>음란물, 폭력적 내용, 불법적 내용이 포함되지 않은 콘텐츠</li>
            </ol>

            <h3>2. 라이선스 부여</h3>
            <p>
              사용자는 콘텐츠 업로드 시 회사에게 해당 콘텐츠를 서비스 제공 목적으로 이용할 수 있는 비독점적, 양도 가능한
              라이선스를 부여합니다.
            </p>

            <h2>제5조 (저작권 침해 신고)</h2>
            <h3>1. 신고 절차</h3>
            <p>저작권 침해를 발견한 경우, 다음 정보를 포함하여 회사에 신고할 수 있습니다:</p>
            <ul>
              <li>침해 콘텐츠의 정확한 위치 (URL 등)</li>
              <li>저작권자임을 증명하는 자료</li>
              <li>연락처 정보</li>
              <li>침해 사실에 대한 구체적 설명</li>
            </ul>

            <ContactInfo>
              <h3>저작권 침해 신고 연락처</h3>
              <p>
                <strong>이메일:</strong> copyright@yourmode.com
              </p>
              <p>
                <strong>전화:</strong> 010-1234-5678
              </p>
              <p>
                <strong>주소:</strong> 서울특별시 강남구 테헤란로 123, 유어모드 빌딩
              </p>
            </ContactInfo>

            <h3>2. 처리 절차</h3>
            <p>저작권 침해 신고 접수 후 다음과 같이 처리됩니다:</p>
            <ol>
              <li>신고 접수 확인 (24시간 이내)</li>
              <li>침해 여부 검토 (영업일 기준 3-5일)</li>
              <li>침해 확인 시 해당 콘텐츠 즉시 삭제</li>
              <li>신고자에게 처리 결과 통보</li>
            </ol>

            <h2>제6조 (반복 침해자 정책)</h2>
            <p>저작권을 반복적으로 침해하는 사용자에 대해서는 다음과 같은 조치를 취합니다:</p>
            <ul>
              <li>1차 위반: 경고 및 해당 콘텐츠 삭제</li>
              <li>2차 위반: 일시적 계정 정지 (7일)</li>
              <li>3차 위반: 계정 영구 정지</li>
            </ul>

            <h2>제7조 (면책 조항)</h2>
            <p>회사는 다음의 경우에 대해 책임을 지지 않습니다:</p>
            <ul>
              <li>사용자가 업로드한 콘텐츠로 인한 저작권 침해</li>
              <li>제3자 웹사이트로의 링크를 통한 저작권 침해</li>
              <li>사용자 간의 저작권 분쟁</li>
              <li>기술적 오류로 인한 일시적 콘텐츠 노출</li>
            </ul>

            <h2>제8조 (국제 저작권)</h2>
            <p>회사는 대한민국 저작권법뿐만 아니라 베른 협약, WIPO 저작권 조약 등 국제 저작권 협약을 준수합니다.</p>

            <h2>제9조 (정책 변경)</h2>
            <p>
              이 저작권 정책은 관련 법령의 변경이나 서비스 개선을 위해 변경될 수 있으며, 변경 시 서비스 내 공지를 통해
              사전 안내합니다.
            </p>

            <h2>제10조 (문의 및 연락처)</h2>
            <p>저작권 관련 문의사항이 있으시면 언제든지 연락주시기 바랍니다.</p>

            <ContactInfo>
              <h3>저작권 담당 부서</h3>
              <p>
                <strong>부서명:</strong> 법무팀
              </p>
              <p>
                <strong>담당자:</strong> 김저작 (저작권 담당자)
              </p>
              <p>
                <strong>이메일:</strong> legal@yourmode.com
              </p>
              <p>
                <strong>전화:</strong> 02-1234-5678
              </p>
              <p>
                <strong>팩스:</strong> 02-1234-5679
              </p>
              <p>
                <strong>운영시간:</strong> 평일 09:00 - 18:00 (점심시간 12:00-13:00 제외)
              </p>
            </ContactInfo>

            <LastUpdated>최종 업데이트: 2024년 1월 1일</LastUpdated>
          </Content>
        </ContentContainer>
      </MainContent>
    </MainContainer>
  );
}
