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

import { APIError } from '@services/api/api.server';
import { signup } from '@services/api/auth.server';
import { getDataFromSession } from '@services/api/session.server';
import { SessionData } from '@services/api/types.server';
import { validateCredentials } from '@services/api/validation.server';

export const loader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const sessionData: SessionData | null = await getDataFromSession(request);

  console.log(`signup._index.tsx sessionData ${JSON.stringify(sessionData)}`);

  if (!sessionData || sessionData?.hasTokenExpired || sessionData?.justLoggedIn) {
    console.log(
      `login page return null hasTokenExpired - ${sessionData?.hasTokenExpired} -- justLoggedIn - ${sessionData?.justLoggedIn}`
    );
    return null;
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
    authType: SIGNUP,
    success: true,
    errors: {},
  };

  const locale = await i18next.getLocale(request);
  const t = await i18next.getFixedT(locale);

  try {
    await validateCredentials(credentials, locale);
    await signup(credentials);
    return data(actionResponse, { status: 200 });
  } catch (error) {
    actionResponse.success = false;

    if (error instanceof ValidationError) {
      actionResponse.errors = error.authValidationErrors;
      return data(actionResponse, { status: 400 });
    } else if (error instanceof APIError) {
      actionResponse.errors.api = error.message;
      return data(actionResponse, { status: 400 });
    }

    actionResponse.errors.unexpected = t('auth_unexpected_error_during_validation');
    return data(actionResponse, { status: 500 });
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
