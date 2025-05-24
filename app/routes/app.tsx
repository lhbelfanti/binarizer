import { LoaderFunction, LoaderFunctionArgs, data, redirect } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';

import Header from '@components/Header';

import { getDataFromSession } from '@services/api/auth/session.server';
import { SessionData } from '@services/api/auth/types.auth.server';
import { fetchCriteriaInfo } from '@services/api/criteria/criteria.server';
import { FetchCriteriaInfoResponse } from '@services/api/criteria/types';
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
  let fetchCriteriaInfoResponse: FetchCriteriaInfoResponse = {
    id: 0,
    name: '',
    year: 0,
    month: 0,
    analyzedTweets: 0,
    totalTweets: 0,
  };
  try {
    log.loader('app.tsx', 'fetchTweets endpoint called');
    fetchTweetsResponse = await fetchTweets(criteriaID, year, month, authToken);

    log.loader('app.tsx', 'fetchCriteriaInfo endpoint called');
    fetchCriteriaInfoResponse = await fetchCriteriaInfo(criteriaID, year, month, authToken);
  } catch (error) {
    log.withError().loader('app.tsx', 'api error', { statusCode: 500 });
  }

  const fetchTweetsExtendedResponse: FetchTweetsExtendedResponse = {
    criteria: {
      id: fetchCriteriaInfoResponse.id,
      name: fetchCriteriaInfoResponse.name,
      year: fetchCriteriaInfoResponse.year,
      month: fetchCriteriaInfoResponse.month,
    },
    tweets: {
      data: fetchTweetsResponse,
      total: fetchCriteriaInfoResponse.totalTweets,
      analyzed: fetchCriteriaInfoResponse.analyzedTweets,
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
