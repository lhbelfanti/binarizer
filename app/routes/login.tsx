import { Outlet } from '@remix-run/react';

import Header from 'app/components/Header';

const LoginLayout = () => {
	return (
		<>
			<Header />
			<Outlet/>
		</>
	);
}

export default LoginLayout;