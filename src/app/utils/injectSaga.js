import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default (key, saga) => (WrappedComponent) => {
  class SagaInjector extends Component {
    componentWillMount() {
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

  SagaInjector.contextTypes = {
    store: PropTypes.shape({}),
  };

  return SagaInjector;
};
