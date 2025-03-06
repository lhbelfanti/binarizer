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
import { isAuthenticated } from '@services/api/session.server';
import { LogInResponseDTO } from '@services/api/types.server';
import log from '@services/utils/logger';

export const loader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const authenticated: boolean = await isAuthenticated(request, 'login._index.tsx');
  if (authenticated) {
    log.redirection('/login', '/selection');
    return redirect('/selection');
  }

  return null;
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
      log.redirection('/login', '/selection');
      return redirect('/selection', { headers: { 'Set-Cookie': cookie } });
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
