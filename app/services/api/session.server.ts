import { createCookieSessionStorage, redirect } from '@remix-run/node';

import { SessionData } from '@services/api/types.server';

const SESSION_SECRET = process.env.SESSION_SECRET as string;
const SESSION_REFRESH_THRESHOLD_MS: number = 5 * 60 * 1000; // 5 minutes
const COOKIE_SESSION_STORAGE_MAX_AGE: number = 30 * 24 * 60 * 60; // 30 days

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    secrets: [SESSION_SECRET], // Secrets with which my cookies will be signed to avoid showing
    // them as plain text in the frontend
    sameSite: 'lax', // Add protection against potential attacks where malicious requests from third-party
    // site codes lead our users to make requests they don't want to make
    maxAge: COOKIE_SESSION_STORAGE_MAX_AGE,
    httpOnly: true, // To ensure Javascript client side code can access to this cookie
  },
});

export const createAuthSession = async (token: string, expiresAt: number) => {
  const session = await sessionStorage.getSession();
  session.set('token', token);
  session.set('expiresAt', expiresAt);
  await sessionStorage.commitSession(session);
};

export const getDataFromSession = async (request: Request): Promise<SessionData | null> => {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'));

  if (!session.has('token') || !session.has('expiresAt')) {
    return null;
  }

  const token: string = session.get('token');
  const expiresAt: number = parseInt(session.get('expiresAt'));
  const isTokenExpiringSoon: boolean = expiresAt - Date.now() < SESSION_REFRESH_THRESHOLD_MS;
  if (isTokenExpiringSoon) {
    return null;
  }

  return { token, expiresAt };
};

export const destroyAuthSession = async (request: Request) => {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'));
  await sessionStorage.destroySession(session);
};

export const requiresAuthSession = async (request: Request) => {
  const sessionData = await getDataFromSession(request);

  if (!sessionData?.token) {
    throw redirect('/auth?mode=login');
  }

  return sessionData.token;
};
