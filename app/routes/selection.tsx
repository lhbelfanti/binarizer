import { Outlet } from '@remix-run/react';

import Header from '@components/Header';

const SelectionLayout = () => {
  return (
    <>
      <Header isLoggedIn={true} />
      <Outlet />
    </>
  );
};

export default SelectionLayout;
