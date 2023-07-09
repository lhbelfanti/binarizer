/**
 * Module dependencies
 */
import React from 'react';

import { ErrorViewProp } from './types';

/**
 * Error View Component
 */
const View = (props: ErrorViewProp) => {
  const handleOnRetry = () => {
    document.location.reload();
  };

  return (
    <div>
        Ocurrió un error intentá recargar la página
        <button type="button" onClick={handleOnRetry}>
          Recargar
        </button>
    </div>
  );
};

/**
 * Inject i18n context as props into View.
 */
export default View;
