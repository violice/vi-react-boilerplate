import React, { Component } from 'react';
import { ReactReduxContext } from 'react-redux';
import hoistNonReactStatics from 'hoist-non-react-statics';

export default (key, reducer) => (WrappedComponent) => {
  class ReducerInjector extends Component {
    static WrappedComponent = WrappedComponent;

    static contextType = ReactReduxContext;

    static displayName = `withReducer(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    constructor(props, context) {
      super(props, context);

      const {
        store: {
          injectReducer,
        },
      } = context;
      injectReducer(key, reducer);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(ReducerInjector, WrappedComponent);
};
