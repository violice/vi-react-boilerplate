import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default (key, reducer) => (WrappedComponent) => {
  class ReducerInjector extends Component {
    componentWillMount() {
      const {
        store: {
          injectReducer,
        },
      } = this.context;
      injectReducer(key, reducer);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  ReducerInjector.contextTypes = {
    store: PropTypes.object.isRequired,
  };

  return ReducerInjector;
};
