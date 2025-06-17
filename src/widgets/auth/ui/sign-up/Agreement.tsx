import { Label } from "@/src/shared/components/ui/label";
import { Checkbox } from "@/src/shared/components/ui/checkbox";
import type React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { Control, Controller, FieldError, FieldErrors, Path } from "react-hook-form";
import { SignUpForm } from "@/src/widgets/auth/feature/hooks/useHandleSighup";
import { InfoForm } from "@/src/widgets/auth/feature/hooks/useHandleAdditionalInfo";

interface AgreementProps<T extends SignUpForm | InfoForm> {
  control: Control<T>
  errors: FieldErrors<T>
}

const Agreement = <T extends SignUpForm | InfoForm> ({ control, errors }: AgreementProps<T>) => {
  const termsError = errors?.termsAgreed as FieldError | undefined;
  const privacyError = errors?.privacyAgreed as FieldError | undefined;

  return (
    <FormGroup>
      <Label>약관 동의</Label>
      <AgreementSection>
        {/* 서비스 이용약관 */}
        <Controller
          name={"termsAgreed" as Path<T>}
          control={control}
          render={({ field }) => (
            <AgreementItem>
              <Checkbox
                id="termsAgreed"
                checked={!!field.value}
                onCheckedChange={(checked) => field.onChange(checked as boolean)}
              />
              <div>
                <AgreementLabel>
                  서비스 이용약관 동의
                  <RequiredBadge>(필수)</RequiredBadge>
                </AgreementLabel>
                <AgreementLinks>
                  <AgreementLink href="/policy/term">전체보기</AgreementLink>
                </AgreementLinks>
                {termsError && <ErrorText>{termsError.message}</ErrorText>}
              </div>
            </AgreementItem>
          )}
        />

        {/* 개인정보 처리방침 */}
        <Controller
          name={"privacyAgreed" as Path<T>}
          control={control}
          render={({ field }) => (
            <AgreementItem>
              <Checkbox
                id="privacyAgreed"
                checked={!!field.value}
                onCheckedChange={(checked) => field.onChange(checked as boolean)}
              />
              <div>
                <AgreementLabel>
                  개인정보 처리방침 동의
                  <RequiredBadge>(필수)</RequiredBadge>
                </AgreementLabel>
                <AgreementLinks>
                  <AgreementLink href="/policy/privacy">전체보기</AgreementLink>
                </AgreementLinks>
                {privacyError && <ErrorText>{privacyError.message}</ErrorText>}
              </div>
            </AgreementItem>
          )}
        />

        {/* 마케팅 정보 수신 */}
        <Controller
          name={"marketingAgreed" as Path<T>}
          control={control}
          render={({ field }) => (
            <AgreementItem>
              <Checkbox
                id="marketingAgreed"
                checked={!!field.value}
                onCheckedChange={(checked) => field.onChange(checked as boolean)}
              />
              <div>
                <AgreementLabel>
                  마케팅 정보 수신 동의
                  <span style={{ fontSize: '0.7rem', color: '#666', marginLeft: '0.25rem' }}>(선택)</span>
                </AgreementLabel>
                <HelpText>
                  유어모드의 다양한 소식과 혜택을 받아보실 수 있습니다.
                </HelpText>
              </div>
            </AgreementItem>
          )}
        />
      </AgreementSection>
    </FormGroup>
  );
};

export default Agreement;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const AgreementSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const AgreementItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
`;

const AgreementLabel = styled.div`
  font-size: 0.875rem;
  color: #333;

  @media (max-width: 640px) {
    font-size: 0.8rem;
  }
`;

const AgreementLinks = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.25rem;
`;

const AgreementLink = styled(Link)`
  font-size: 0.75rem;
  color: #666;
  text-decoration: underline;

  &:hover {
    color: #ff3e6c;
  }
`;

const RequiredBadge = styled.span`
  font-size: 0.7rem;
  color: #ff3e6c;
  font-weight: 500;
  margin-left: 0.25rem;
`;

const ErrorText = styled.p`
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

const HelpText = styled.p`
  font-size: 0.75rem;
  color: #666;
  margin-top: 0.25rem;
  line-height: 1.4;
`;
