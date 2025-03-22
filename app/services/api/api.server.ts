import { fetchFromAPI } from '@services/api/api';

import { APIResponse } from './types.api';

const API_BASE_URL = process.env.VITE_AHBCC_API_URL ?? 'http://localhost:3000';

export async function serverFetch<T = unknown>(endpoint: string, options: RequestInit): Promise<APIResponse<T>> {
  return fetchFromAPI<T>(`${API_BASE_URL}/${endpoint}`, options);
}
