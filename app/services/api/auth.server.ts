import { APIError, fetchFromAPI } from '@services/api/api.server';
import { createAuthSession, destroyAuthSession } from '@services/api/session.server';
import {
  APIResponse,
  LogInRequestBodyDTO,
  LogInResponse,
  LogInResponseDTO,
  SignUpRequestBodyDTO,
} from '@services/api/types.server';
import { recursiveToCamel } from '@services/utils/camelize';

export const signup = async (requestBody: SignUpRequestBodyDTO) => {
  const signUpAPIResponse: APIResponse = await fetchFromAPI('auth/signup/v1', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  });

  if (signUpAPIResponse.code >= 400) {
    throw new APIError(signUpAPIResponse);
  }

  return signUpAPIResponse;
};

export const login = async (requestBody: LogInRequestBodyDTO): Promise<LogInResponseDTO> => {
  const logInAPIResponse: APIResponse<LogInResponseDTO> = await fetchFromAPI<LogInResponseDTO>('auth/login/v1', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  });

  if (logInAPIResponse.code >= 400 || !logInAPIResponse.data) {
    throw new APIError(logInAPIResponse);
  }

  const logInResponse: LogInResponse = recursiveToCamel(logInAPIResponse.data);
  const { headers } = await createAuthSession(logInResponse.token, logInResponse.expiresAt);
  logInResponse.headers = headers;

  return logInResponse;
};

export const logout = async (request: Request, authToken: string) => {
  const response: APIResponse = await fetchFromAPI('auth/logout/v1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Session-Token': authToken,
    },
  });

  if (response.code >= 400) {
    throw new APIError(response);
  }

  return destroyAuthSession(request);
};
