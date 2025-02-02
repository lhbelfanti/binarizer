import { ActionFunction, ActionFunctionArgs } from "@remix-run/node";
import i18next from '@localization/i18n.server';

import { APIError } from "@services/api/api.server";
import { login } from "@services/api/auth.server";

import AuthForm from '@components/AuthForm';
import { LOGIN } from "@components/AuthForm/constants";
import { AuthFormCredentials, AuthFormActionResult } from "@components/AuthForm/types";

const LogInPage = () => {
	return (
		<div className="flex items-center justify-center h-screen">
			<div className="transform translate-y-[-20%]">
				<AuthForm authType={LOGIN}/>
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

	const actionResponse: AuthFormActionResult = {
		authType: LOGIN,
		success: true,
		errors: {},
	}

	const locale = await i18next.getLocale(request);
	const t = await i18next.getFixedT(locale);

	try {
		return await login(credentials);
	} catch (error) {
		actionResponse.success = false;

		if (error instanceof APIError) {
			actionResponse.errors.api = error.message;
			return actionResponse;
		}

		actionResponse.errors.unexpected = t("auth_unexpected_error");
		return actionResponse;
	}
};