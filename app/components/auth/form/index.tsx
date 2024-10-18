import { Form, useActionData, useNavigation } from '@remix-run/react';

import { ValidationErrors } from '~/components/auth/form/types';
import Button from 'app/components/button';

const AuthForm = () => {
	const navigation = useNavigation()
	const validationErrors = useActionData<ValidationErrors>();

	const isSubmitting = navigation.state !== 'idle';

	return (
		<div className="flex flex-col">
			<div className="flex flex-col items-center gap-4 mt-4">
				<div className="flex flex-col w-96">
					<h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500">
						Welcome Back!
					</h2>

					<p className="text-lg text-gray-600 dark:text-gray-300 mt-1 font-thin opacity-80">
						Please enter your username and password
					</p>

					<div className="mt-8"/>
				</div>
			</div>

			<Form method="post" className="flex flex-col items-center gap-4 mt-4" id="auth-form">
				<div className="flex flex-col w-96">
					<label htmlFor="username" className="text-gray-700 text-lg dark:text-gray-300">
						Username
					</label>
					<input
						type="text"
						id="username"
						className="mt-1 p-2 border font-thin rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
						placeholder="Enter your username"
						required
					/>
				</div>
				<div className="flex flex-col w-96">
					<label htmlFor="password" className="text-gray-700 text-lg dark:text-gray-300">
						Password
					</label>
					<input
						type="password"
						id="password"
						className="mt-1 p-2 border font-thin rounded-md shadow-sm focus:outline-none focus:ring focus:ring-purple-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
						placeholder="Enter your password"
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
						{ isSubmitting ? 'Authenticating...' : 'Login' }
					</Button>
				</div>
			</Form>
		</div>
	);
}

export default AuthForm;