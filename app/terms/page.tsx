"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/src/shared/components/ui/button"
import styled from "@emotion/styled"

const MainContainer = styled.div`
  min-height: 100vh;
  background-color: #fafafa;
  padding: 2rem 0;
`

const MainContent = styled.main`
  max-width: 48rem;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (min-width: 640px) {
    padding: 0 2rem;
  }
`

const ContentContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  
  @media (max-width: 640px) {
    padding: 1.5rem;
    margin: 0 1rem;
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
`

const Title = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.875rem;
  font-weight: 700;
  color: #333;
  
  @media (max-width: 640px) {
    font-size: 1.5rem;
  }
`

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
`

const LastUpdated = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
`

export default function TermsPage() {
  return (
    <MainContainer>
      <MainContent>
        <ContentContainer>
          <Header>
            <Link href="/signup">
              <Button variant="ghost" size="sm">
                <ArrowLeft size={16} style={{ marginRight: "0.5rem" }} />
                돌아가기
              </Button>
            </Link>
            <Title>서비스 이용약관</Title>
          </Header>

          <Content>
            <h2>제1조 (목적)</h2>
            <p>
              이 약관은 유어모드(이하 "회사")가 제공하는 패션 스타일링 서비스(이하 "서비스")의 이용과 관련하여 회사와
              이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
            </p>

            <h2>제2조 (정의)</h2>
            <p>이 약관에서 사용하는 용어의 정의는 다음과 같습니다:</p>
            <ul>
              <li>"서비스"란 회사가 제공하는 패션 스타일링 관련 모든 서비스를 의미합니다.</li>
              <li>"이용자"란 이 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.</li>
              <li>
                "회원"이란 회사에 개인정보를 제공하여 회원등록을 한 자로서, 회사의 정보를 지속적으로 제공받으며, 회���가
                제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.
              </li>
              <li>"비회원"이란 회원에 가입하지 않고 회사가 제공하는 서비스를 이용하는 자를 말합니다.</li>
            </ul>

            <h2>제3조 (약관의 효력 및 변경)</h2>
            <h3>1. 약관의 효력</h3>
            <p>이 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력을 발생합니다.</p>
            <h3>2. 약관의 변경</h3>
            <p>
              회사는 필요하다고 인정되는 경우 이 약관을 변경할 수 있으며, 변경된 약관은 제1항과 같은 방법으로 공지 또는
              통지함으로써 효력을 발생합니다.
            </p>

            <h2>제4조 (서비스의 제공 및 변경)</h2>
            <p>회사가 제공하는 서비스는 다음과 같습니다:</p>
            <ul>
              <li>개인 맞춤형 패션 스타일링 추천</li>
              <li>체형별 스타일링 가이드</li>
              <li>패션 트렌드 정보 제공</li>
              <li>스타일링 관련 커뮤니티 서비스</li>
              <li>기타 회사가 정하는 서비스</li>
            </ul>

            <h2>제5조 (서비스 이용계약의 성립)</h2>
            <h3>1. 이용계약의 성립</h3>
            <p>
              서비스 이용계약은 이용자가 이 약관에 동의하고 회원가입 신청을 하면 회사가 이를 승낙함으로써 성립합니다.
            </p>
            <h3>2. 회원가입 신청</h3>
            <p>
              회원가입을 희망하는 자는 회사가 정한 양식에 따라 회원정보를 기입하고 이 약관에 동의한다는 의사표시를
              함으로써 회원가입을 신청합니다.
            </p>

            <h2>제6조 (회원정보의 변경)</h2>
            <p>
              회원은 개인정보관리화면을 통하여 언제든지 본인의 개인정보를 열람하고 수정할 수 있습니다. 다만, 서비스
              관리를 위해 필요한 실명, 아이디 등은 수정이 불가능합니다.
            </p>

            <h2>제7조 (개인정보보호)</h2>
            <p>
              회사는 이용자의 개인정보를 보호하기 위해 개인정보처리방침을 수립하여 공지하고 있으며, 관련 법령에 따라
              이용자의 개인정보를 보호합니다.
            </p>

            <h2>제8조 (회사의 의무)</h2>
            <ul>
              <li>
                회사는 법령과 이 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며, 이 약관이 정하는 바에 따라
                지속적이고, 안정적으로 서비스를 제공하기 위해서 노력합니다.
              </li>
              <li>
                회사는 이용자가 안전하게 인터넷 서비스를 이용할 수 있도록 이용자의 개인정보보호를 위한 보안 시스템을
                구축합니다.
              </li>
              <li>
                회사는 서비스 이용과 관련하여 이용자로부터 제기된 의견이나 불만이 정당하다고 객관적으로 인정될 경우에는
                적절한 절차를 거쳐 즉시 처리하여야 합니다.
              </li>
            </ul>

            <h2>제9조 (이용자의 의무)</h2>
            <p>이용자는 다음 행위를 하여서는 안 됩니다:</p>
            <ul>
              <li>신청 또는 변경 시 허위내용의 등록</li>
              <li>타인의 정보 도용</li>
              <li>회사가 게시한 정보의 변경</li>
              <li>회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
              <li>회사 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
              <li>회사 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
              <li>
                외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는 행위
              </li>
            </ul>

            <h2>제10조 (저작권의 귀속 및 이용제한)</h2>
            <h3>1. 저작권의 귀속</h3>
            <p>회사가 작성한 저작물에 대한 저작권 기타 지적재산권은 회사에 귀속합니다.</p>
            <h3>2. 이용제한</h3>
            <p>
              이용자는 서비스를 이용함으로써 얻은 정보 중 회사에게 지적재산권이 귀속된 정보를 회사의 사전 승낙 없이
              복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는
              안됩니다.
            </p>

            <h2>제11조 (계약해지 및 이용제한)</h2>
            <h3>1. 계약해지</h3>
            <p>
              회원이 이용계약을 해지하고자 하는 때에는 언제든지 서비스 내 회원탈퇴 메뉴를 이용하여 이용계약 해지를
              신청할 수 있습니다.
            </p>
            <h3>2. 이용제한</h3>
            <p>
              회사는 회원이 이 약관의 의무를 위반하거나 서비스의 정상적인 운영을 방해한 경우, 경고, 일시정지,
              영구이용정지 등으로 서비스 이용을 단계적으로 제한할 수 있습니다.
            </p>

            <h2>제12조 (손해배상)</h2>
            <p>
              회사는 무료로 제공되는 서비스와 관련하여 회원에게 어떠한 손해가 발생하더라도 동 손해가 회사의 고의 또는
              중대한 과실에 의한 경우를 제외하고는 이에 대하여 책임을 부담하지 아니합니다.
            </p>

            <h2>제13조 (면책조항)</h2>
            <ul>
              <li>
                회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한
                책임이 면제됩니다.
              </li>
              <li>회사는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.</li>
              <li>
                회사는 회원이 서비스를 이용하여 기대하는 수익을 상실한 것에 대하여 책임을 지지 않으며, 그 밖의 서비스를
                통하여 얻은 자료로 인한 손해에 관하여 책임을 지지 않습니다.
              </li>
            </ul>

            <h2>제14조 (재판권 및 준거법)</h2>
            <p>
              이 약관에 명시되지 않은 사항은 대한민국의 관계법령과 상관례에 따르며, 서비스 이용으로 발생한 분쟁에 대해
              소송이 제기되는 경우 민사소송법상의 관할법원에 제기합니다.
            </p>

            <LastUpdated>최종 업데이트: 2024년 1월 1일</LastUpdated>
          </Content>
        </ContentContainer>
      </MainContent>
    </MainContainer>
  )
}
