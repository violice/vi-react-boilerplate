import React, { Component } from 'react';
import { ReactReduxContext } from 'react-redux';
import hoistNonReactStatics from 'hoist-non-react-statics';

export default (key, saga) => (WrappedComponent) => {
  class SagaInjector extends Component {
    static WrappedComponent = WrappedComponent;

    static contextType = ReactReduxContext;

    static displayName = `withSaga(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    constructor(props, context) {
      super(props, context);

      const {
        store: {
          injectSaga,
        },
      } = context;

      injectSaga(key, saga);
    }

    componentWillUnmount() {
      const {
        store: {
          ejectSaga,
        },
      } = this.context;
      ejectSaga(key);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(SagaInjector, WrappedComponent);
};
