/*import React from 'react';
import { hydrateRoot } from 'react-dom/client';

import { AppProvider, SiteProvider } from '@app/context';


const RenderView = (Component, options: any = {}) => {
  const fullProps: ViewProps = {
    ...props,
    ...options,
    i18n,
  };

  hydrateRoot(
    <AppProvider state={fullProps}>
      <SiteProvider state={fullProps.site.id}>
        <I18nProvider i18n={i18n}>
          <ImageProvider prefix={imagesPrefix}>
            <Component {...fullProps} />
          </ImageProvider>
        </I18nProvider>
      </SiteProvider>
    </AppProvider>,
    document.getElementById('root-app')
  );
};

export default RenderView;*/
