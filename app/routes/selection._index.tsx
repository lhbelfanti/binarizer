import { Trans } from 'react-i18next';

import { ActionFunction, ActionFunctionArgs, LoaderFunction, LoaderFunctionArgs, redirect } from '@remix-run/node';

import CriteriaSelector from 'app/components/CriteriaSelector';
import searchCriteria from 'app/data/search_criteria_examples.json';

import { getDataFromSession } from '@services/api/session.server';
import { SessionData } from '@services/api/types.server';
import log from '@services/utils/logger';

export const loader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const sessionData: SessionData | null = await getDataFromSession(request);
  log.loader('selection._index.tsx', 'called', { sessionData: JSON.stringify(sessionData) });

  if (!sessionData || sessionData?.hasTokenExpired) {
    log.loader('selection._index.tsx', 'inside first condition', {
      hasTokenExpired: sessionData?.hasTokenExpired,
      justLoggedIn: sessionData?.justLoggedIn,
    });
    log.redirection('/selection', '/login');
    return redirect('/login');
  }

  return null;
};

export const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {};

const SelectionPage = () => {
  return (
    <div className="flex items-center justify-center mt-16">
      <div className="flex flex-col">
        <div className="flex flex-col items-center gap-4 mt-4">
          <div className="flex flex-col">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              <Trans i18nKey="selection_title" />
            </h2>
            <p className="text-lg text-gray-300 mt-1 font-thin opacity-80">
              <Trans i18nKey="selection_description" />
            </p>
            <div className="mt-8" />
          </div>
          <CriteriaSelector criteria={searchCriteria} />
        </div>
      </div>
    </div>
  );
};

export default SelectionPage;
