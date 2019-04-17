import React, { lazy, Suspense } from 'react';
import { LoadingIndicator } from 'components/Common';

export default (importFunc) => {
  const LazyComponent = lazy(importFunc);
  return props => (
    <Suspense fallback={<LoadingIndicator />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};
