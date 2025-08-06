export interface LocalSignUpRequest {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  isTermsAgreed: boolean;
  isPrivacyPolicyAgreed: boolean;
  isMarketingAgreed: boolean;
  height: number;
  weight: number;
  gender: string;
  bodyTypeId: number;
}

export interface SignUpResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    name: string;
    role: string;
    bodyTypeId: number;
  };
  additionalInfoNeeded?: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    name: string;
    email: string;
    role: string;
    isNewUser: boolean;
  };
}
