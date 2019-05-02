import React from 'react';
import { ReactReduxContext } from 'react-redux';

export default (key, reducer) => {
  const context = React.useContext(ReactReduxContext);

  React.useEffect(() => {
    const {
      store: {
        injectReducer,
      },
    } = context;

    injectReducer(key, reducer);
  }, []);
};
