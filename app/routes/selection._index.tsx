import { Trans } from 'react-i18next';

import {
  ActionFunction,
  ActionFunctionArgs,
  LoaderFunction,
  LoaderFunctionArgs,
  data,
  redirect,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import CriteriaSelector from 'app/components/CriteriaSelector';

import { Criteria } from '@components/CriteriaSelector/types';

import { getDataFromSession, isAuthenticated } from '@services/api/auth/session.server';
import { SessionData } from '@services/api/auth/types.auth.server';
import { createCriteria } from '@services/api/criteria/create';
import { fetchCriteria } from '@services/api/criteria/criteria.server';
import { FetchCriteriaResponse } from '@services/api/criteria/types';
import log from '@services/utils/logger';

export const loader: LoaderFunction = async (args: LoaderFunctionArgs) => {
  const { request } = args;

  const authenticated: boolean = await isAuthenticated(request, 'selection._index.tsx');
  if (!authenticated) {
    log.redirection('/selection', '/login');
    return redirect('/login');
  }

  const sessionData: SessionData | null = await getDataFromSession(request);
  const authToken: string = sessionData?.token ?? '';

  let fetchCriteriaResponse: FetchCriteriaResponse = [];
  try {
    log.loader('selection._index.tsx', 'fetchCriteria endpoint called');
    fetchCriteriaResponse = await fetchCriteria(authToken);
  } catch (error) {
    log.withError().loader('selection._index.tsx', 'api error', { statusCode: 500 });
  }

  return data(createCriteria(fetchCriteriaResponse));
};

export const action: ActionFunction = async (args: ActionFunctionArgs) => {
  const { request } = args;

  const formData: FormData = await request.formData();
  const criteriaID: string = formData.get('criteria') as string;
  const year: string = formData.get('year') as string;
  const month: string = formData.get('month') as string;

  log.redirection('/app', '/selection', { queryParams: { criteria: criteriaID, year: year, month: month } });
  return redirect(`/app?criteria=${criteriaID}&year=${year}&month=${month}`);
};

const SelectionPage = () => {
  const criteria: Criteria[] = useLoaderData<typeof loader>();

  return (
    <div className="flex items-center justify-center mt-16">
      <div className="flex flex-col">
        <div className="flex flex-col items-center gap-4 mt-4">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              <Trans i18nKey="selection_title" />
            </h2>
            <p className="text-lg text-gray-300 mt-1 font-thin opacity-80">
              <Trans i18nKey="selection_description" />
            </p>
            <div className="mt-8" />
          </div>
          <CriteriaSelector criteria={criteria} />
        </div>
      </div>
    </div>
  );
};

export default SelectionPage;
