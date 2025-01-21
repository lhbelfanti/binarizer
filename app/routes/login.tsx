import { Outlet } from '@remix-run/react';

import Header from 'app/components/Header';

const LogInLayout = () => {
	return (
		<>
			<Header />
			<Outlet/>
		</>
	);
}

export default LogInLayout;