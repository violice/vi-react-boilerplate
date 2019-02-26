import React from 'react';
import { loadable } from 'utils';
import { LoadingIndicator } from 'components';

export default loadable(() => import('./App'), {
  fallback: <LoadingIndicator />,
});
