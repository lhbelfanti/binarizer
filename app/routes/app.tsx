import { LoaderFunction, LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';

import Header from '@components/Header';

import { getDataFromSession } from '@services/api/session.server';
import {SessionData} from "@services/api/types.server";

export const loader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const sessionData: SessionData | null = await getDataFromSession(request);

  console.log(`app.tsx sessionData ${JSON.stringify(sessionData)}`);

  return { isLoggedIn: true };
};

const AppLayout = () => {
  const { isLoggedIn } = useLoaderData<typeof loader>();
  console.log(`Fetching useLoaderData on every render ${isLoggedIn}`)

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <Outlet />
    </>
  );
};

export default AppLayout;
