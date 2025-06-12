export interface RegisterEmailParams {
  email: string;
  lang: string;
}

export interface LoginEmailParams {
  email: string;
  pincode: string;
}

export interface LoginCodeParams {
  code: string;
}

// Response Types
export interface EmptyDataResponse {
  data: [];
}

export interface RegisterCodeResponse {
  data: {
    login_code: string;
  };
}

export interface SessionResponse {
  data: {
    session: string;
  };
}

export interface ValidationError {
  error: {
    code: string;
    message: string;
    details: Array<{
      field: string;
      message: string;
    }>;
  };
}

export interface WrongPinError {
  error: {
    code: 'WRONG_PIN_CODE';
    message: string;
  };
}

export interface AuthError {
  error: {
    code: 'AUTHENTICATION_ERROR';
    message: string;
  };
}
