import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { ViewProps } from '@app-types/prop.types';

const { ...props } = window.__PRELOADED_STATE__;

const RenderView = (Component, options: any = {}) => {
  const fullProps: ViewProps = {
    ...props,
    ...options,
  };


  hydrateRoot(
    document.getElementById('root-app'), 
    <Component {...fullProps} />
  );
};

export default RenderView;
