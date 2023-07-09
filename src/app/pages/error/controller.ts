/**
 * Module dependencies
 */
import { ServerRenderView, ErrorView } from '@pages/render';
import { HttpRequest, HttpResponse, HttpNext } from '@app-types/http.types';

import View from './view';
/**
 * Fetch Configuration data
 */
export const fetchData = async (req: HttpRequest, res: HttpResponse, next: HttpNext) => {
  try {
    // Fetch some data
  } catch (error) {
    ErrorView(req, res);
  }
};

/**
 * Render
 */
export const render = (req: HttpRequest, res: HttpResponse) => {
  /**
   * Render View
   */

  ServerRenderView(req, res, View, {});
};
