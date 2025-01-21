import { LinksFunction, ActionFunction, ActionFunctionArgs } from "@remix-run/node";

import { APIError } from "~/services/api/api.server";
import { login } from "~/services/api/auth.server";
import { validateCredentials } from "~/services/api/validation.server";

import AuthForm from 'app/components/AuthForm';
import { AuthFormCredentials } from "~/components/AuthForm/types";
import { links as buttonLinks } from 'app/components/Button';

const LogInPage = () => {
	return (
		<div className="flex items-center justify-center h-screen">
			<div className="transform translate-y-[-20%]">
				<AuthForm authType={"login"}/>
			</div>
		</div>
	)
}

export default LogInPage;

export const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
	const formData: FormData = await request.formData();
	const username: string = formData.get("username") as string;
	const password: string = formData.get("password") as string;

	const credentials: AuthFormCredentials = { username, password };

	try {
		validateCredentials(credentials);
	} catch (authFormErrors) {
		return authFormErrors;
	}

	try {
		return await login(credentials);
	} catch (error) {
		if (error instanceof APIError) {
			return { unexpected: error.message };
		}

		return { unexpected: "An unexpected error occurred." };
	}
};

export const links: LinksFunction = () => {
	return [...buttonLinks()];
}