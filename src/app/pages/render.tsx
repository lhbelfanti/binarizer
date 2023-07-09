import React from 'react';
import { HttpRequest, HttpResponse } from '@app-types/http.types';
import { ViewProps } from '@app-types/prop.types';
import ErrorScreen from '@pages/error/view';

export const ServerRenderView = (req: HttpRequest, res: HttpResponse, Component, props: any) => {
  const fullProps: ViewProps = {
    locals: res.locals,
    ...props,
  };

  const View: React.FC<ViewProps> = (props?: ViewProps) => {
    const { cookies, ...restProps } = props;
    const newProps = { ...restProps, cookies: {} };

    return (
        <Component {...newProps} />
    );
  };

  res.render(View, fullProps);
};

export const ErrorView = async (req: HttpRequest, res: HttpResponse) => {
  ServerRenderView(req, res, ErrorScreen, {});
};

export default ServerRenderView;
