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
import log from '@services/utils/logger';

export const signup = async (requestBody: SignUpRequestBodyDTO) => {
  const endpoint = 'auth/signup/v1';
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  };
  log.api('signup', 'called', { endpoint: endpoint, requestOptions: requestOptions });

  const signUpAPIResponse: APIResponse = await fetchFromAPI(endpoint, requestOptions);
  if (signUpAPIResponse.code >= 400) {
    throw new APIError(signUpAPIResponse);
  }

  log.api('signup', 'response', { response: signUpAPIResponse });

  return signUpAPIResponse;
};

export const login = async (requestBody: LogInRequestBodyDTO): Promise<LogInResponseDTO> => {
  const endpoint = 'auth/login/v1';
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  };
  log.api('login', 'called', { endpoint: endpoint, requestOptions: requestOptions });

  const logInAPIResponse: APIResponse<LogInResponseDTO> = await fetchFromAPI<LogInResponseDTO>(
    endpoint,
    requestOptions
  );

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
  const endpoint = 'auth/logout/v1';
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Session-Token': authToken,
    },
  };
  log.api('logout', 'called', { endpoint: endpoint, requestOptions: requestOptions });

  const logOutResponse: APIResponse = await fetchFromAPI(endpoint, requestOptions);
  if (logOutResponse.code >= 400) {
    throw new APIError(logOutResponse);
  }

  log.api('logout', 'response', { response: logOutResponse });

  return destroyAuthSession(request);
};
