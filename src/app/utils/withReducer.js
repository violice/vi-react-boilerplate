import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default (key, reducer) => (WrappedComponent) => {
  class WithReducer extends Component {
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

  WithReducer.contextTypes = {
    store: PropTypes.object.isRequired,
  };

  return WithReducer;
};
