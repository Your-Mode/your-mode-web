import { useMutation } from "@tanstack/react-query";
import { SignUpForm } from "@/src/widgets/auth/feature/hooks/useHandleSighup";
import { LocalSignUpRequest } from "@/src/shared/types/auth";
import { signupLocal } from "@/src/shared/api/auth";
import { useRouter } from "next/navigation";

export const usePostSignUp = () => {
  const router = useRouter();

  const result = useMutation({
    mutationFn: (signUpForm: SignUpForm) => {
      const signUpRequest: LocalSignUpRequest = {
        email: signUpForm.email,
        password: signUpForm.password,
        name: signUpForm.name,
        phoneNumber: signUpForm.phone.replaceAll("-", ""),
        isTermsAgreed: signUpForm.termsAgreed,
        isPrivacyPolicyAgreed: signUpForm.privacyAgreed,
        isMarketingAgreed: signUpForm.marketingAgreed,
        height: signUpForm.height,
        weight: signUpForm.weight,
        gender: signUpForm.gender,
        bodyTypeId: signUpForm.bodyType === 'unknown' ? 4 : signUpForm.bodyType === 'straight' ? 1 : signUpForm.bodyType === 'wave' ? 2 : 3,
      };
      return signupLocal(signUpRequest);
    },
    onSuccess: (data) => {
      if (data?.result) {
        router.push("/signup/success");
      }
    },
    onError: (error) => {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    }
  });

  return result;
};
