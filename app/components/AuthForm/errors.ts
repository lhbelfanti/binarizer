import { AuthFormActionErrors } from '@components/AuthForm/types';

export class ValidationError extends Error {
  public authValidationErrors: AuthFormActionErrors;

  constructor(authFormActionErrors: AuthFormActionErrors) {
    super('validation error');
    this.authValidationErrors = authFormActionErrors;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
