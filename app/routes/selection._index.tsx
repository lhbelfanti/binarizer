import { ActionFunction, ActionFunctionArgs, LoaderFunction, LoaderFunctionArgs, redirect } from '@remix-run/node';

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
    <div className="flex items-center justify-center h-screen">
      <div className="transform translate-y-[-20%]"></div>
    </div>
  );
};

export default SelectionPage;
