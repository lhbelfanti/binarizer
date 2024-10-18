import { LinksFunction } from '@remix-run/node';

import AuthForm from '~/components/auth/form';
import { links as buttonLinks } from '~/components/button';


const LoginPage = () => {
	return (
		<div className="flex items-center justify-center h-screen bg-white dark:bg-gray-950">
			<div className="transform translate-y-[-20%]">
				<AuthForm/>
			</div>
		</div>
	)
}

export default LoginPage;

export const links: LinksFunction = () => {
	return [...buttonLinks()];
}