import type { ReactNode } from 'react';

import { useTranslation } from 'react-i18next';

import { LinksFunction, LoaderFunction, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData, useMatches } from '@remix-run/react';

import { useChangeLanguage } from 'remix-i18next/react';

import i18next from '@localization/i18n.server';

import styles from './tailwind.css?url';

interface DocumentProps {
  title?: string;
  children: ReactNode;
}

interface RouteHandle {
  title?: string;
  disableJS?: boolean;
}

export const meta: MetaFunction = () => {
  return [
    { title: 'Binarizer' },
    { property: 'og:title', content: 'Binarizer: binary dataset creator' },
    {
      name: 'description',
      content: 'Tool for manual creation of a dataset to be used in a binary classification algorithm.',
    },
  ];
};

export const handle = {
  // In the handle export, we can add an i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  // TIP: In most cases, you should set this to your defaultNS from your i18n config
  // or if you did not set one, set it to the i18next default namespace "translation"
  i18n: 'common',
};

const Document = (props: DocumentProps) => {
  const { title, children } = props;

  const matches = useMatches() as Array<{ handle?: RouteHandle }>;
  const disableJS = matches.some((match) => match.handle?.disableJS);
  const { locale } = useLoaderData<typeof loader>();
  const { i18n } = useTranslation();
  useChangeLanguage(locale);

  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        {!disableJS && <Scripts />}
      </body>
    </html>
  );
};

const App = () => {
  const matches = useMatches() as Array<{ handle?: RouteHandle }>;

  const currentTitle = matches.find((match) => match.handle?.title)?.handle?.title;

  return (
    <Document title={currentTitle || 'Binarizer'}>
      <Outlet />
    </Document>
  );
};

export default App;

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap',
  },
];

export const loader: LoaderFunction = async (args: LoaderFunctionArgs) => {
  const { request } = args;

  const locale = await i18next.getLocale(request);
  return { locale };
};
