export interface RegFormProps {
  onEmailSubmit: (email: string) => Promise<void>;
  onAnonymousSubmit: () => Promise<void>;
  emailError?: string;
  anonymousError?: string;
  isEmailLoading?: boolean;
  isAnonymousLoading?: boolean;
}
