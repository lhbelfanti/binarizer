import { Outlet } from '@remix-run/react';

import Header from '@components/Header';
import ToastContainerWrapper from '@components/ToastContainerWrapper';

const LogInLayout = () => {
  return (
    <>
      <Header isLoggedIn={false} />
      <Outlet />
      <ToastContainerWrapper />
    </>
  );
};

export default LogInLayout;
