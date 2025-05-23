import { LoaderFunction, LoaderFunctionArgs, data, redirect } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';

import Header from '@components/Header';

import { getDataFromSession } from '@services/api/auth/session.server';
import { SessionData } from '@services/api/auth/types.auth.server';
import { fetchTweets } from '@services/api/tweets/tweets.server';
import { FetchTweetsExtendedResponse, FetchTweetsResponse } from '@services/api/tweets/types';
import log from '@services/utils/logger';

import CriteriaProvider from '../context/CriteriaContext';

export const loader: LoaderFunction = async (args: LoaderFunctionArgs) => {
  const { request } = args;

  const url = new URL(request.url);
  const criteriaID: string = url.searchParams.get('criteria') as string;
  const year: string = url.searchParams.get('year') as string;
  const month: string = url.searchParams.get('month') as string;
  if (!criteriaID || !year || !month) {
    log.redirection('/app', '/selection');
    return redirect('/selection');
  }

  log.loader('app.tsx', 'called with parameters', {
    queryParams: { criteria: criteriaID, year: year, month: month },
  });

  const sessionData: SessionData | null = await getDataFromSession(request);
  const authToken: string = sessionData?.token ?? '';

  let fetchTweetsResponse: FetchTweetsResponse = [];
  try {
    log.loader('app.tsx', 'fetchTweets endpoint called');
    fetchTweetsResponse = await fetchTweets(criteriaID, year, month, authToken);
  } catch (error) {
    log.withError().loader('selection._index.tsx', 'api error', { statusCode: 500 });
  }

  const fetchTweetsExtendedResponse: FetchTweetsExtendedResponse = {
    criteria: {
      id: 1,
      name: 'test',
      month: 0,
      year: 0,
    },
    tweets: {
      data: fetchTweetsResponse,
      total: 100,
      analyzed: 2,
    },
  };

  return data(fetchTweetsExtendedResponse);
};

const AppLayout = () => {
  const { criteria, tweets } = useLoaderData<typeof loader>();

  return (
    <CriteriaProvider criteriaData={criteria} tweetsData={tweets}>
      <Header isLoggedIn={true} />
      <Outlet />
    </CriteriaProvider>
  );
};

export default AppLayout;
