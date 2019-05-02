import React from 'react';
import { ReactReduxContext } from 'react-redux';

export default (key, reducer) => {
  const context = React.useContext(ReactReduxContext);

  React.useEffect(() => {
    const {
      store: {
        injectSaga,
        ejectSaga,
      },
    } = context;

    injectSaga(key, reducer);

    return () => {
      ejectSaga(key);
    };
  }, []);
};
