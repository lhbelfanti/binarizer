import { createCookieSessionStorage } from '@remix-run/node';

import { SessionData } from '@services/api/types.server';
import log from '@services/utils/logger';

const SESSION_SECRET = process.env.SESSION_SECRET as string;
const SESSION_REFRESH_THRESHOLD_MS: number = 5 * 60 * 1000; // 5 minutes
const COOKIE_SESSION_STORAGE_MAX_AGE: number = 30 * 24 * 60 * 60; // 30 days

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: 'binarizer_session',
    secure: process.env.NODE_ENV === 'production',
    secrets: [SESSION_SECRET], // Secrets with which my cookies will be signed to avoid showing
    // them as plain text in the frontend
    sameSite: 'lax', // Add protection against potential attacks where malicious requests from third-party
    // site codes lead our users to make requests they don't want to make
    maxAge: COOKIE_SESSION_STORAGE_MAX_AGE,
    httpOnly: true, // To ensure Javascript client side code can access to this cookie
  },
});

export const createAuthSession = async (token: string, expiresAt: string) => {
  const session = await sessionStorage.getSession();
  session.set('token', token);
  session.set('expiresAt', expiresAt);

  return {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  };
};

export const getDataFromSession = async (request: Request): Promise<SessionData | null> => {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'));

  if (!session.has('token') || !session.has('expiresAt')) {
    return null;
  }

  // Retrieve values from session
  const token: string = session.get('token');
  const expiresAt: string = session.get('expiresAt');

  // Date now
  const dateNow = Date.now();

  // Evaluate hasTokenExpired
  const expiresAtDate = new Date(expiresAt);
  const hasTokenExpired: boolean = expiresAtDate.getTime() - dateNow < SESSION_REFRESH_THRESHOLD_MS;

  return { token, hasTokenExpired };
};

export const destroyAuthSession = async (request: Request) => {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'));
  return await sessionStorage.destroySession(session);
};

export const isAuthenticated = async (request: Request, file: string): Promise<boolean> => {
  const sessionData: SessionData | null = await getDataFromSession(request);
  const sessionString: string = JSON.stringify(sessionData);
  log.info(file, 'called', { sessionData: sessionString });

  if (!sessionData || sessionData?.hasTokenExpired) {
    log.info(file, 'not authenticated', { sessionData: sessionString });

    return false;
  }

  return true;
};
