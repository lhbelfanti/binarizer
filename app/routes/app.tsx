import { LoaderFunction, LoaderFunctionArgs, data, redirect } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';

import Header from '@components/Header';

import { fetchTweets } from '@services/api/tweets/tweets.server';
import { FetchTweetsBodyDTO, FetchTweetsResponse } from '@services/api/tweets/types.tweets';
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

  const fetchTweetsBodyDTO: FetchTweetsBodyDTO = {
    criteria_id: Number(criteriaID),
    month: Number(month),
    year: Number(year),
  };
  const fetchTweetsResponse: FetchTweetsResponse = await fetchTweets(fetchTweetsBodyDTO);

  return data(fetchTweetsResponse);
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
