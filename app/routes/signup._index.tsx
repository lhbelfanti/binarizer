import { LinksFunction, ActionFunction, ActionFunctionArgs } from "@remix-run/node";

import { APIError } from "~/services/api/api.server";
import { signup } from "~/services/api/auth.server";
import { validateCredentials } from "~/services/api/validation.server";

import AuthForm from 'app/components/AuthForm';
import { AuthFormCredentials } from "~/components/AuthForm/types";
import { links as buttonLinks } from 'app/components/Button';

const SignUpPage = () => {
	return (
		<div className="flex items-center justify-center h-screen">
			<div className="transform translate-y-[-20%]">
				<AuthForm authType={"signup"}/>
			</div>
		</div>
	)
}

export default SignUpPage;

export const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
	const formData: FormData = await request.formData();
	const username: string = formData.get("username") as string;
	const password: string = formData.get("password") as string;
	const credentials: AuthFormCredentials = {username: username, password: password};

	try {
		validateCredentials(credentials);
	} catch (error) {
		return error;
	}

	try {
		return await signup(credentials);
	} catch (error) {
		if (error instanceof APIError) {
			return { success: false, message: error.message, code: error.code };
		}

		return { success: false, message: "An unexpected error occurred." };
	}
};

export const links: LinksFunction = () => {
	return [...buttonLinks()];
}