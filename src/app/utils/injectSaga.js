import React, { Component } from 'react';
import { ReactReduxContext } from 'react-redux';

export default (key, saga) => (WrappedComponent) => {
  class SagaInjector extends Component {
    static contextType = ReactReduxContext;

    constructor(props, context) {
      super(props, context);
      const {
        store: {
          injectSaga,
        },
      } = this.context;
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

  return SagaInjector;
};
