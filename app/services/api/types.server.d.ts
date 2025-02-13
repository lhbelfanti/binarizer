// APIResponse represent the generic JSON structure of the API responses
export interface APIResponse<T = unknown> {
  code: number;
  message: string;
  error?: string;
  data?: T;
}

// SessionData represents the information saved in the cookies
export interface SessionData {
  token: string;
  hasTokenExpired: boolean;
  justLoggedIn: boolean;
}

// LogInRequestBodyDTO represents the request body sent to the login endpoint
export type LogInRequestBodyDTO = {
  username: string;
  password: string;
};

// LogInResponseDTO represents the data returned by the API upon successful login
export type LogInResponseDTO = {
  token: string;
  expires_at: string;
  headers: Record<string, string>;
};

export type LogInResponse = Camelize<LogInResponseDTO>;

// SignUpRequestBodyDTO represents the request body sent to the signup endpoint
export type SignUpRequestBodyDTO = {
  username: string;
  password: string;
};
