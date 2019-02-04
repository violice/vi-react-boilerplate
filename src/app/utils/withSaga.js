import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default (key, saga) => (WrappedComponent) => {
  class WithSaga extends Component {
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

  WithSaga.contextTypes = {
    store: PropTypes.shape({}),
  };

  return WithSaga;
};
