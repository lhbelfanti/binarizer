import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
} from "@remix-run/react";
import type { LinksFunction, MetaFunction } from '@remix-run/node';
import type { ReactNode } from 'react';

import styles from './tailwind.css?url';

interface DocumentProps {
  title?: string;
  children: ReactNode
}

interface RouteHandle {
  title?: string;
  disableJS?: boolean;
}

export const meta: MetaFunction = () => {
  return [
    {title: "Binarizer"},
    {property: "og:title", content: "Binarizer: binary dataset creator"},
    {name: "description", content: "Tool for manual creation of a dataset to be used in a binary classification algorithm."},
  ];
};

const Document = ({title, children}: DocumentProps) => {
  const matches = useMatches() as Array<{ handle?: RouteHandle }>;

  const disableJS = matches.some(match => match.handle?.disableJS);

  return (
    <html lang="en">
      <head>
        { title && <title>{ title }</title> }
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        { !disableJS && <Scripts/> }
      </body>
    </html>
  );
}

const App = () => {
  const matches = useMatches() as Array<{ handle?: RouteHandle }>;

  const currentTitle = matches.find(match => match.handle?.title)?.handle?.title;

  return (
      <Document title={currentTitle || "Binarizer"} >
        <Outlet />
      </Document>
  );
}

export default App;

export const links: LinksFunction = () => [
  {rel: 'stylesheet', href: styles},
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" },
];
