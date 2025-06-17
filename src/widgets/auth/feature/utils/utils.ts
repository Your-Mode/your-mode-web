export const getDescription = (step: number) => {
  if (step === 1) {
    return "가입하신 전화번호를 입력하시면 SMS로 인증코드를 보내드립니다.";
  } else if (step === 2) {
    return `휴대전화로 발송된 6자리 인증코드를 입력해주세요.`;
  } else {
    return "새로운 비밀번호를 설정해주세요.";
  }
};
