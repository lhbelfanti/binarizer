import { useEffect } from 'react';

import { Trans, useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { Form, Link, useActionData, useNavigate, useNavigation } from '@remix-run/react';

import { LOGIN, SIGNUP } from '@components/AuthForm/constants';
import Button from '@components/Button';
import Toast from '@components/Toast';
import { ERROR, SUCCESS } from '@components/Toast/constants';

import { AuthFormActionResult, AuthFormProps } from './types';

const AuthForm = (props: AuthFormProps) => {
  const { authType } = props;

  const navigation = useNavigation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const actionData = useActionData<AuthFormActionResult>();

  const actionLink: string = `/${authType}?index`;
  const isSubmitting: boolean = navigation.state !== 'idle';
  const showSignUpLink: boolean = authType === LOGIN;

  useEffect(() => {
    if (actionData?.authType === SIGNUP) {
      if (actionData?.success) {
        toast(<Toast message={t('signup_success_toast_message')} type={SUCCESS} />);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        toast(<Toast message={t('signup_error_toast_message')} type={ERROR} />);
      }
    } else if (actionData?.authType === LOGIN) {
      if (actionData?.success) {
        toast(<Toast message={t('login_success_toast_message')} type={SUCCESS} />);
        setTimeout(() => navigate('/app'), 2000);
      } else {
        toast(<Toast message={t('login_error_toast_message')} type={ERROR} />);
      }
    }
  }, [actionData, navigate, t]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center gap-4 mt-4">
        <div className="flex flex-col w-96">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            <Trans i18nKey={`${authType}_title`} />
          </h2>

          <p className="text-lg text-gray-300 mt-1 font-thin opacity-80">
            <Trans i18nKey={`${authType}_description`} />
          </p>

          <div className="mt-8" />
        </div>
      </div>

      <Form
        method="post"
        action={actionLink}
        className="flex flex-col items-center gap-4 mt-4"
        id="auth-form">
        <div className="flex flex-col w-96">
          <label htmlFor="username" className="text-gray-300 text-lg">
            <Trans i18nKey="auth_username" />
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="mt-1 p-2 border font-thin rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 bg-gray-700 border-gray-700 text-gray-100"
            placeholder={t('auth_username_placeholder')}
            required
          />
          {actionData?.errors?.username && (
            <p className="text-sm text-red-500 mt-1">{actionData?.errors?.username}</p>
          )}
        </div>
        <div className="flex flex-col w-96">
          <label htmlFor="password" className="text-gray-300 text-lg">
            <Trans i18nKey="auth_password" />
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="mt-1 p-2 border font-thin rounded-md shadow-sm focus:outline-none focus:ring focus:ring-purple-400 bg-gray-700 border-gray-700 text-gray-100"
            placeholder={t('auth_password_placeholder')}
            required
          />
          {actionData?.errors?.password && (
            <p className="text-sm text-red-500 mt-1">{actionData?.errors?.password}</p>
          )}
        </div>
        <div className="form-actions">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <Trans i18nKey="auth_button_authenticating_state" />
            ) : (
              <Trans i18nKey={`${authType}_button`} />
            )}
          </Button>
        </div>
      </Form>

      {showSignUpLink ? (
        <div className="mt-4 text-center">
          <p className="text-gray-300 text-sm">
            <Link to="/signup" className="text-blue-500 underline hover:text-blue-300">
              <Trans i18nKey="auth_signup_link_text" />
            </Link>
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default AuthForm;
