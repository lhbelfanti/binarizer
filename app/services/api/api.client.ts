import { fetchFromAPI } from '@services/api/api';
import { APIResponse } from '@services/api/types.api';

const API_BASE_URL: string = import.meta.env.VITE_CORPUS_CREATOR_API_URL ?? (() => {
  console.warn('Client: ⚠️ VITE_CORPUS_CREATOR_API_URL not defined, using localhost fallback');
  return 'http://localhost:3000';
})();

export async function clientFetch<T = unknown>(endpoint: string, options: RequestInit): Promise<APIResponse<T>> {
  return fetchFromAPI<T>(`${API_BASE_URL}/${endpoint}`, options);
}
