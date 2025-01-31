export interface AuthFormActionResult {
   authType: string;
   success: boolean;
   errors: AuthFormActionErrors;
}

export type AuthFormActionErrors = {
	username?: string;
	password?: string;
	unexpected?: string;
};

export interface AuthFormCredentials {
	username: string;
	password: string;
}

export interface AuthFormProps {
	authType: 'login' | 'signup';
}