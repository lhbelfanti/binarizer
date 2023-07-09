import React from 'react';
import { ServerRenderView, ErrorView } from '@pages/render';
import { HttpRequest, HttpResponse, HttpNext } from '@app-types/http.types';
import UsersService from 'services/usersService';
import View from './view';

/**
 * Fetch Configuration data
 */
export const fetchUserInfo = async (req: HttpRequest, res: HttpResponse, next: HttpNext) => {
  try {
    //const { user_id } = req.params;
    const user_id = 123;

    const [ userInfo ] = await Promise.all([UsersService.getUserInfo(user_id)]);

    res.locals.userInfo = userInfo;
    next();
  } catch (error) {
    ErrorView(req, res);
  }
};

/**
 * Render Page
 */
export const render = async (req: HttpRequest, res: HttpResponse) => {
  const props = {
    userInfo: res.locals.userInfo,
  };

  /**
   * Render View
   */
  ServerRenderView(req, res, View, props);
};
