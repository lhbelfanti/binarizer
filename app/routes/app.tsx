import { Outlet } from '@remix-run/react';

import Header from 'app/components/Header';

const AppLayout = () => {
	return (
		<>
			<Header />
			<Outlet/>
		</>
	);
}

export default AppLayout;