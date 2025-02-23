import {
  ActionFunction,
  ActionFunctionArgs,
  LoaderFunction,
  LoaderFunctionArgs,
  data,
  redirect,
} from '@remix-run/node';

import AuthForm from '@components/AuthForm';
import { LOGIN } from '@components/AuthForm/constants';
import { AuthFormActionResult, AuthFormCredentials } from '@components/AuthForm/types';

import i18next from '@localization/i18n.server';

import { APIError } from '@services/api/api.server';
import { login } from '@services/api/auth.server';
import { getDataFromSession } from '@services/api/session.server';
import { LogInResponseDTO, SessionData } from '@services/api/types.server';
import log from '@services/utils/logger';

export const loader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const sessionData: SessionData | null = await getDataFromSession(request);
  log.loader('login._index.tsx', 'called', { sessionData: JSON.stringify(sessionData) });

  if (!sessionData || sessionData?.hasTokenExpired || sessionData?.justLoggedIn) {
    log.loader('login._index.tsx', 'inside first condition', {
      hasTokenExpired: sessionData?.hasTokenExpired,
      justLoggedIn: sessionData?.justLoggedIn,
    });
    return null;
  }

  log.redirection('/login', '/app');
  return redirect('/app');
};

export const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  const formData: FormData = await request.formData();
  const flow: string = formData.get('flow') as string;

  log.action('login._index.tsx', 'called', { flow });
  switch (flow) {
    case 'login': {
      const username: string = formData.get('username') as string;
      const password: string = formData.get('password') as string;

      const credentials: AuthFormCredentials = { username, password };

      const actionResponse: AuthFormActionResult = {
        authType: LOGIN,
        success: true,
        errors: {},
      };

      const locale = await i18next.getLocale(request);
      const t = await i18next.getFixedT(locale);

      try {
        log.action('login._index.tsx', 'login endpoint called');
        const logInResponse: LogInResponseDTO = await login(credentials);
        log.action('login._index.tsx', 'return data', {
          actionResponse: actionResponse,
          logInResponse: JSON.stringify(logInResponse),
          statusCode: 200,
        });
        return data(actionResponse, { status: 200, headers: logInResponse.headers });
      } catch (error) {
        actionResponse.success = false;

        if (error instanceof APIError) {
          actionResponse.errors.api = error.message;
          log.withError().action('login._index.tsx', 'api error', { actionResponse: actionResponse, statusCode: 400 });
          return data(actionResponse, { status: 400 });
        }

        log.withError().action('login._index.tsx', 'unexpected error', {
          actionResponse: actionResponse,
          statusCode: 500,
        });
        actionResponse.errors.unexpected = t('auth_unexpected_error');
        return data(actionResponse, { status: 500 });
      }
    }
    case 'login_success': {
      const cookie: string = request.headers.get('Cookie') ?? '';
      log.redirection('/login', '/app');
      return redirect('/app', { headers: { 'Set-Cookie': cookie } });
    }
    default: {
      break;
    }
  }
};

const LogInPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="transform translate-y-[-20%]">
        <AuthForm authType={LOGIN} />
      </div>
    </div>
  );
};

export default LogInPage;
