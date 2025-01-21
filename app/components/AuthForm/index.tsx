import { Form, useActionData, useNavigation } from '@remix-run/react';
import { Trans, useTranslation } from "react-i18next";

import Button from 'app/components/Button';

import { AuthFormProps, ValidationErrors } from './types';
import { useEffect, useState } from "react";

const AuthForm = (props: AuthFormProps) => {
	const { authType } = props;

	const navigation = useNavigation()
	const { t } = useTranslation();
	const validationErrors = useActionData<ValidationErrors>();
	const [usernameError, setUsernameError] = useState<string | undefined>();
	const [passwordError, setPasswordError] = useState<string | undefined>();

	const isSubmitting: boolean = navigation.state !== 'idle';

	useEffect(() => {
		if (validationErrors) {
			setUsernameError(validationErrors.username || undefined);
			setPasswordError(validationErrors.password || undefined);
		}
	}, [validationErrors]);

	return (
		<div className="flex flex-col">
			<div className="flex flex-col items-center gap-4 mt-4">
				<div className="flex flex-col w-96">
					<h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
						<Trans i18nKey={`${authType}_title`} />
					</h2>

					<p className="text-lg text-gray-300 mt-1 font-thin opacity-80">
						<Trans i18nKey={`${authType}_description`} />
					</p>

					<div className="mt-8"/>
				</div>
			</div>

			<Form method="post" action="/login?index" className="flex flex-col items-center gap-4 mt-4" id="auth-form">
				<div className="flex flex-col w-96">
					<label htmlFor="username" className="text-gray-300 text-lg">
						<Trans i18nKey="auth_username" />
					</label>
					<input
						type="text"
						id="username"
						name="username"
						className="mt-1 p-2 border font-thin rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 bg-gray-700 border-gray-700 text-gray-100"
						placeholder={t("auth_username_placeholder")}
						required
					/>
					{usernameError && <p className="text-sm text-red-500 mt-1">{usernameError}</p>}
				</div>
				<div className="flex flex-col w-96">
					<label htmlFor="password" className="text-gray-300 text-lg">
						<Trans i18nKey="auth_password" />
					</label>
					<input
						type="password"
						id="password"
						name="password"
						className="mt-1 p-2 border font-thin rounded-md shadow-sm focus:outline-none focus:ring focus:ring-purple-400 bg-gray-700 border-gray-700 text-gray-100"
						placeholder={t("auth_password_placeholder")}
						required
					/>
					{passwordError && <p className="text-sm text-red-500 mt-1">{passwordError}</p>}
				</div>
				<div className="form-actions">
					<Button type="submit" disabled={ isSubmitting }>
						{ isSubmitting ?
							<Trans i18nKey="auth_button_authenticating_state" /> :
							<Trans i18nKey={`${authType}_button`} />
						}
					</Button>
				</div>
			</Form>
		</div>
	);
}

export default AuthForm;