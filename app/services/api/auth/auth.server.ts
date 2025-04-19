import { APIError } from '@services/api/api';
import { serverFetch } from '@services/api/api.server';
import { createAuthSession, destroyAuthSession } from '@services/api/auth/session.server';
import {
  LogInRequestBodyDTO,
  LogInResponse,
  LogInResponseDTO,
  SignUpRequestBodyDTO,
} from '@services/api/auth/types.auth.server';
import { APIResponse } from '@services/api/types.api';
import { recursiveToCamel } from '@services/utils/camelize';
import log from '@services/utils/logger';

export const signup = async (requestBody: SignUpRequestBodyDTO) => {
  const endpoint = 'auth/signup/v1';
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  };
  log.api('signup', 'called', { endpoint: endpoint, requestOptions: requestOptions });

  const signUpAPIResponse: APIResponse = await serverFetch(endpoint, requestOptions);
  if (signUpAPIResponse.code >= 400) {
    throw new APIError(signUpAPIResponse);
  }

  log.api('signup', 'response', { response: signUpAPIResponse });

  return signUpAPIResponse;
};

export const login = async (requestBody: LogInRequestBodyDTO): Promise<LogInResponse> => {
  const endpoint = 'auth/login/v1';
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  };
  log.api('login', 'called', { endpoint: endpoint, requestOptions: requestOptions });

  const logInAPIResponse: APIResponse<LogInResponseDTO> = await serverFetch<LogInResponseDTO>(endpoint, requestOptions);
  if (logInAPIResponse.code >= 400 || !logInAPIResponse.data) {
    throw new APIError(logInAPIResponse);
  }

  const logInResponse: LogInResponse = recursiveToCamel(logInAPIResponse.data);
  const { headers } = await createAuthSession(logInResponse.token, logInResponse.expiresAt);
  logInResponse.headers = headers;

  log.api('login', 'response', { response: logInResponse });

  return logInResponse;
};

export const logout = async (request: Request, authToken: string) => {
  if (!authToken) {
    log.api('logout', 'token not available');
    return destroyAuthSession(request);
  }

  const endpoint = 'auth/logout/v1';
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Session-Token': authToken,
    },
  };
  log.api('logout', 'called', { endpoint: endpoint, requestOptions: requestOptions });

  const logOutResponse: APIResponse = await serverFetch(endpoint, requestOptions);
  if (logOutResponse.code >= 400) {
    throw new APIError(logOutResponse);
  }

  log.api('logout', 'response', { response: logOutResponse });

  return destroyAuthSession(request);
};
