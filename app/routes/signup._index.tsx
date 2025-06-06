import {
  ActionFunction,
  ActionFunctionArgs,
  LoaderFunction,
  LoaderFunctionArgs,
  data,
  redirect,
} from '@remix-run/node';

import AuthForm from '@components/AuthForm';
import { SIGNUP } from '@components/AuthForm/constants';
import { ValidationError } from '@components/AuthForm/errors';
import { AuthFormActionResult, AuthFormCredentials } from '@components/AuthForm/types';

import i18next from '@localization/i18n.server';

import { APIError } from '@services/api/api';
import { signup } from '@services/api/auth/auth.server';
import { isAuthenticated } from '@services/api/auth/session.server';
import { validateCredentials } from '@services/api/auth/validation.server';
import log from '@services/utils/logger';

export const loader: LoaderFunction = async (args: LoaderFunctionArgs) => {
  const { request } = args;

  const authenticated: boolean = await isAuthenticated(request, 'signup._index.tsx');
  if (authenticated) {
    log.redirection('/signup', '/login');
    return redirect('/login');
  }

  return null;
};

export const action: ActionFunction = async (args: ActionFunctionArgs) => {
  const { request } = args;

  const formData: FormData = await request.formData();
  const flow: string = formData.get('flow') as string;

  log.action('signup._index.tsx', 'called', { flow });
  switch (flow) {
    case 'signup': {
      const username: string = formData.get('username') as string;
      const password: string = formData.get('password') as string;

      const credentials: AuthFormCredentials = { username, password };

      const actionResponse: AuthFormActionResult = {
        authType: SIGNUP,
        success: true,
        errors: {},
      };

      const locale = await i18next.getLocale(request);
      const t = await i18next.getFixedT(locale);

      try {
        log.action('signup._index.tsx', 'validate credentials called');
        await validateCredentials(credentials, locale);
        log.action('signup._index.tsx', 'signup endpoint called');
        await signup(credentials);
        log.action('signup._index.tsx', 'return data', { actionResponse: actionResponse, statusCode: 200 });
        return data(actionResponse, { status: 200 });
      } catch (error) {
        actionResponse.success = false;

        if (error instanceof ValidationError) {
          actionResponse.errors = error.authValidationErrors;
          log.withError().action('signup._index.tsx', 'validate credentials error', {
            actionResponse: actionResponse,
            statusCode: 400,
          });
          return data(actionResponse, { status: 400 });
        } else if (error instanceof APIError) {
          actionResponse.errors.api = error.message;
          log.withError().action('signup._index.tsx', 'api error', { actionResponse: actionResponse, statusCode: 400 });
          return data(actionResponse, { status: 400 });
        }

        log
          .withError()
          .action('signup._index.tsx', 'unexpected error', { actionResponse: actionResponse, statusCode: 500 });
        actionResponse.errors.unexpected = t('auth_unexpected_error_during_validation');
        return data(actionResponse, { status: 500 });
      }
    }
    case 'signup_success': {
      const cookie: string = request.headers.get('Cookie') ?? '';
      log.redirection('/signup', '/login');
      return redirect('/login', { headers: { 'Set-Cookie': cookie } });
    }
  }
};

const SignUpPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="transform translate-y-[-20%]">
        <AuthForm authType={SIGNUP} />
      </div>
    </div>
  );
};

export default SignUpPage;
