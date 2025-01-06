import { LinksFunction } from '@remix-run/node';

import AuthForm from 'app/components/Form';
import { links as buttonLinks } from 'app/components/Button';

const LoginPage = () => {
	return (
		<div className="flex items-center justify-center h-screen">
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