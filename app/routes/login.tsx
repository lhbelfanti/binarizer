import { Outlet } from '@remix-run/react';

import Header from '~/components/Header';

const LoginLayout = () => {
	return (
		<>
			<Header />
			<Outlet/>
		</>
	);
}

export default LoginLayout;
