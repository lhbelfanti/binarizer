import { APIResponse } from './types.server';

export const API_BASE_URL = process.env.AHBCC_API_URL ?? 'http://localhost:3000';

export async function fetchFromAPI<T = unknown>(
  endpoint: string,
  options: RequestInit
): Promise<APIResponse<T>> {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`, options);
  const clonedResponse = response.clone(); // Clone the response to avoid the consumption of the body
  const responseText = await clonedResponse.text();

  let responseBody: APIResponse<T>;
  try {
    responseBody = await response.json();
  } catch (error) {
    throw new APIError({
      code: response.status,
      message: `Invalid JSON response: ${responseText}`,
    });
  }

  if (!response.ok) {
    throw new APIError(responseBody);
  }

  return responseBody;
}

export class APIError extends Error {
  public code: number;
  public details: string | undefined;

  constructor(response: APIResponse) {
    super(response.message);
    this.code = response.code;
    this.details = response.error;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
