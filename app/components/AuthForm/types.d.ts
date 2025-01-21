export type ValidationErrors = {
	[key: string]: string;
};

export interface AuthFormCredentials {
	username: string;
	password: string;
}

export interface AuthFormProps {
	authType: 'login' | 'signup';
}