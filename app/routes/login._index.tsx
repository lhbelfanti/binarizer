import { LinksFunction, ActionFunction, ActionFunctionArgs } from "@remix-run/node";
import i18next from '~/localization/i18n.server';

import { APIError } from "~/services/api/api.server";
import { login } from "~/services/api/auth.server";
import { validateCredentials } from "~/services/api/validation.server";

import AuthForm from '~/components/AuthForm';
import { LOGIN } from "~/components/AuthForm/constants";
import { ValidationError } from "~/components/AuthForm/errors";
import { AuthFormCredentials, AuthFormActionResult } from "~/components/AuthForm/types";

import { links as buttonLinks } from '~/components/Button';

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
		await validateCredentials(credentials, locale);
		return await login(credentials);
	} catch (error) {
		actionResponse.success = false;

		if (error instanceof ValidationError) {
			actionResponse.errors = error.authValidationErrors;
			return actionResponse;
		} else if (error instanceof APIError) {
			actionResponse.errors.unexpected = error.message;
			return actionResponse;
		}

		actionResponse.errors.unexpected = t("auth_unexpected_error_during_validation");
		return actionResponse;
	}
};

export const links: LinksFunction = () => {
	return [...buttonLinks()];
}