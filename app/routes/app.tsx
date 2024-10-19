import { Outlet } from '@remix-run/react';

import Header from '~/components/navigation/header';

const AppLayout = () => {
	return (
		<>
			<Header />
			<Outlet/>
		</>
	);
}

export default AppLayout;