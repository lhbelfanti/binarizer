import { Outlet } from '@remix-run/react';

import Header from 'app/components/Header';

const SignUpLayout = () => {
	return (
		<>
			<Header />
			<Outlet/>
		</>
	);
}

export default SignUpLayout;