import { ValidationError } from '@components/AuthForm/errors';
import { AuthFormActionErrors, AuthFormCredentials } from '@components/AuthForm/types';

import i18next from '@localization/i18n.server';

const isValidUsername = (value: string) => {
  return value && value.trim().length >= 5;
};

const isValidPassword = (value: string) => {
  return value && value.trim().length >= 7;
};

export const validateCredentials = async (
  input: AuthFormCredentials,
  locale: string
): Promise<AuthFormActionErrors> => {
  const authFormActionErrors: AuthFormActionErrors = {};
  const t = await i18next.getFixedT(locale);

  if (!isValidUsername(input.username)) {
    authFormActionErrors.username = t('auth_credentials_error_invalid_username', { quantity: 5 });
  }

  if (!isValidPassword(input.password)) {
    authFormActionErrors.password = t('auth_credentials_error_invalid_password', { quantity: 7 });
  }

  if (Object.keys(authFormActionErrors).length > 0) {
    throw new ValidationError(authFormActionErrors);
  }

  return authFormActionErrors;
};
