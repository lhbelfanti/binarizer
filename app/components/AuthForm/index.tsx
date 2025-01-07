import { Form, useActionData, useNavigation } from '@remix-run/react';
import { Trans, useTranslation } from "react-i18next";
import Button from 'app/components/Button';

import { ValidationErrors } from '~/components/AuthForm/types';


const AuthForm = () => {
	const navigation = useNavigation()
	const { t } = useTranslation();
	const validationErrors = useActionData<ValidationErrors>();

	const isSubmitting = navigation.state !== 'idle';

	return (
		<div className="flex flex-col">
			<div className="flex flex-col items-center gap-4 mt-4">
				<div className="flex flex-col w-96">
					<h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
						<Trans i18nKey="login_title" />
					</h2>

					<p className="text-lg text-gray-300 mt-1 font-thin opacity-80">
						<Trans i18nKey="login_description" />
					</p>

					<div className="mt-8"/>
				</div>
			</div>

			<Form method="post" action="/login?index" className="flex flex-col items-center gap-4 mt-4" id="auth-form">
				<div className="flex flex-col w-96">
					<label htmlFor="username" className="text-gray-300 text-lg">
						<Trans i18nKey="login_username" />
					</label>
					<input
						type="text"
						id="username"
						name="username"
						className="mt-1 p-2 border font-thin rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 bg-gray-700 border-gray-700 text-gray-100"
						placeholder={t("login_username_placeholder")}
						required
					/>
				</div>
				<div className="flex flex-col w-96">
					<label htmlFor="password" className="text-gray-300 text-lg">
						<Trans i18nKey="login_password" />
					</label>
					<input
						type="password"
						id="password"
						name="password"
						className="mt-1 p-2 border font-thin rounded-md shadow-sm focus:outline-none focus:ring focus:ring-purple-400 bg-gray-700 border-gray-700 text-gray-100"
						placeholder={t("login_password_placeholder")}
						required
					/>
				</div>
				{ validationErrors && (
					<ul>
						{ Object.values(validationErrors).map((error: any) => (
							<li key={ error }>{ error }</li>
						)) }
					</ul>
				) }
				<div className="form-actions">
					<Button type="submit" disabled={ isSubmitting }>
						{ isSubmitting ?
							<Trans i18nKey="login_button_authenticating_state" /> :
							<Trans i18nKey="login_button" />
						}
					</Button>
				</div>
			</Form>
		</div>
	);
}

export default AuthForm;