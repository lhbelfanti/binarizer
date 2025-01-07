import { PassThrough } from "node:stream";
import { resolve } from "node:path";

import type { EntryContext } from "@remix-run/node";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { Response } from "@remix-run/web-fetch";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { I18nextProvider, initReactI18next } from "react-i18next";
import Backend from "i18next-fs-backend";
import { createInstance } from "i18next";

import i18next from "~/localization/i18n.server";
import i18n from "~/localization/i18n";


// Reject/cancel all pending promises after 5 seconds
export const streamTimeout = 5000;

export default async function handleRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    remixContext: EntryContext
) {
  const callbackName = isbot(request.headers.get("user-agent")) ? "onAllReady" : "onShellReady";
  const instance = createInstance();
  const lng = await i18next.getLocale(request);
  const ns = i18next.getRouteNamespaces(remixContext);

  await instance
      .use(initReactI18next) // Tell our instance to use react-i18next
      .use(Backend) // Setup our backend
      .init({
        ...i18n, // spread the configuration
        lng, // The locale we detected above
        ns, // The namespaces the routes about to render wants to use
        backend: { loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json") },
      });

  return new Promise((resolve, reject) => {
    let didError = false;
    let shellRendered = false;

    const { pipe, abort } = renderToPipeableStream(
        <I18nextProvider i18n={instance}>
          <RemixServer context={remixContext} url={request.url} />
        </I18nextProvider>,
        {
          [callbackName]: () => {
            const body = new PassThrough();
            const stream = createReadableStreamFromReadable(body);
            responseHeaders.set("Content-Type", "text/html");

            shellRendered = callbackName === "onShellReady";

            resolve(
                new Response(stream, {
                  headers: responseHeaders,
                  status: didError ? 500 : responseStatusCode,
                })
            );

            pipe(body);
          },
          onShellError(error: unknown) {
            reject(error);
          },
          onError(error: unknown) {
            didError = true;

            // Log streaming rendering errors from inside the shell.  Don't log
            // errors encountered during initial shell rendering since they'll
            // reject and get logged in handleDocumentRequest.
            if (shellRendered) {
              console.error(error);
            }
          },
        }
    );

    // Automatically timeout the React renderer after 6 seconds, which ensures
    // React has enough time to flush down the rejected boundary contents
    setTimeout(abort, streamTimeout + 1000);
  });
}