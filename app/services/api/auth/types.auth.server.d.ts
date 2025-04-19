import { CamelizeKeys } from '@services/utils/camelize';

// SessionData represents the information saved in the cookies
export interface SessionData {
  token: string;
  hasTokenExpired: boolean;
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

export type LogInResponse = CamelizeKeys<LogInResponseDTO>;

// SignUpRequestBodyDTO represents the request body sent to the signup endpoint
export type SignUpRequestBodyDTO = {
  username: string;
  password: string;
};
