import { APIResponse } from "./types.server";

export const API_BASE_URL = process.env.AHBCC_API_URL ?? "http://localhost:3000/api";

export async function fetchFromAPI<T = unknown>(endpoint: string, options: RequestInit): Promise<APIResponse<T>> {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, options);
    return await response.json();
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