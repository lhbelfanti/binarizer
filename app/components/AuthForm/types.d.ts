export type AuthFormErrors = {
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