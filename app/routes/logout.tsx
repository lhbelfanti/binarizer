import { ActionFunction, ActionFunctionArgs, redirect } from '@remix-run/node';

import { logout } from '@services/api/auth.server';
import { getDataFromSession } from '@services/api/session.server';
import { SessionData } from '@services/api/types.auth.server';
import log from '@services/utils/logger';

export const action: ActionFunction = async (args: ActionFunctionArgs) => {
  const { request } = args;

  const sessionData: SessionData | null = await getDataFromSession(request);
  const authToken: string = sessionData?.token ?? '';
  let destroyedSession: string = '';

  try {
    log.action('logout.tsx', 'logout endpoint called');
    destroyedSession = await logout(request, authToken);
  } catch (error) {
    log.withError().action('logout.tsx', 'api error', { statusCode: 500 });
  }

  return redirect('/login', {
    headers: {
      'Set-Cookie': destroyedSession,
    },
  });
};

export default function Logout() {
  return null;
}
