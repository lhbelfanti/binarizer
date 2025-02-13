import {
  ActionFunction,
  ActionFunctionArgs,
  LoaderFunction,
  LoaderFunctionArgs,
  redirect,
  data
} from '@remix-run/node';

import AuthForm from '@components/AuthForm';
import { LOGIN } from '@components/AuthForm/constants';
import { AuthFormActionResult, AuthFormCredentials } from '@components/AuthForm/types';

import i18next from '@localization/i18n.server';

import { APIError } from '@services/api/api.server';
import { login } from '@services/api/auth.server';
import { getDataFromSession } from '@services/api/session.server';
import { LogInResponseDTO, SessionData } from '@services/api/types.server';

export const loader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const sessionData: SessionData | null = await getDataFromSession(request);

  console.log(`login._index.tsx sessionData ${JSON.stringify(sessionData)}`);

  if (!sessionData || sessionData?.hasTokenExpired || sessionData?.justLoggedIn) {
    console.log(`login page return null hasTokenExpired - ${sessionData?.hasTokenExpired} -- justLoggedIn - ${sessionData?.justLoggedIn}`);
    return null
  }

  console.log(`login page redirect to app`);
  return redirect('/app');
};

export const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  const formData: FormData = await request.formData();
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
    const logInResponse: LogInResponseDTO = await login(credentials);
    return data(actionResponse, { status: 200, headers: logInResponse.headers });
  } catch (error) {
    actionResponse.success = false;

    if (error instanceof APIError) {
      actionResponse.errors.api = error.message;
      return data(actionResponse, { status: 400 });
    }

    actionResponse.errors.unexpected = t('auth_unexpected_error');
    return data(actionResponse, { status: 500 });
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
