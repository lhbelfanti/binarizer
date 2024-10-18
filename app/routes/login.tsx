import { Outlet } from '@remix-run/react';

import Header from '~/components/navigation/header';

const LoginLayout = () => {
	return (
		<>
			<Header />
			<Outlet/>
		</>
	);
}

export default LoginLayout;