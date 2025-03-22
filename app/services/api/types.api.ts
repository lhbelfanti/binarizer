// APIResponse represent the generic JSON structure of the API responses
export interface APIResponse<T = unknown> {
  code: number;
  message: string;
  error?: string;
  data?: T;
}
