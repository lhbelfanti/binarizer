import { LoaderFunction, LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';

import Header from '@components/Header';

import { getDataFromSession } from '@services/api/session.server';
import { SessionData } from '@services/api/types.server';
import log from '@services/utils/logger';

export const loader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const sessionData: SessionData | null = await getDataFromSession(request);
  log.loader('app.tsx', 'called', { sessionData: JSON.stringify(sessionData) });
  log.loader('app.tsx', 'returns', { isLoggedIn: true });
  return { isLoggedIn: true };
};

const AppLayout = () => {
  const { isLoggedIn } = useLoaderData<typeof loader>();
  log.info('app.tsx -> useLoaderData', 'retrieving data', { isLoggedIn: isLoggedIn });

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <Outlet />
    </>
  );
};

export default AppLayout;
