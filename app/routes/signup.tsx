import { Outlet } from '@remix-run/react';

import Header from '~/components/Header';
import ToastContainerWrapper from "~/components/ToastContainerWrapper";

const SignUpLayout = () => {
	return (
		<>
			<Header />
			<Outlet/>
			<ToastContainerWrapper />
		</>
	);
}

export default SignUpLayout;