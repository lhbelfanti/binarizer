import { createAuthSession, destroyAuthSession } from "~/services/api/session.server";
import { APIError, fetchFromAPI } from "~/services/api/api.server";
import { APIResponse, LogInRequestBodyDTO, LogInResponse, LogInResponseDTO, SignUpRequestBodyDTO } from "~/services/api/types.server";
import { recursiveToCamel } from "~/services/utils/camelize";
import { redirect } from "@remix-run/node";


export const signup = async (requestBody: SignUpRequestBodyDTO) => {
    const response: APIResponse = await fetchFromAPI("auth/signup/v1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
    });

    if (response.code >= 400) {
        throw new APIError(response);
    }

    return redirect('/login');
}

export const login = async (requestBody: LogInRequestBodyDTO) => {
    const response: APIResponse<LogInResponseDTO> = await fetchFromAPI<LogInResponseDTO>("auth/login/v1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
    });

    if (response.code >= 400 || !response.data) {
        throw new APIError(response);
    }

    const res: LogInResponse = recursiveToCamel(response.data);

    return createAuthSession(res.token, res.expiresAt, '/app');
}

export const logout = async (request: Request, authToken: string) => {
    const response: APIResponse = await fetchFromAPI("auth/logout/v1", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Session-Token": authToken
        },
    });

    if (response.code >= 400) {
        throw new APIError(response);
    }

    return destroyAuthSession(request);
}