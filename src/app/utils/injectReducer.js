import React, { Component } from 'react';
import { ReactReduxContext } from 'react-redux';

export default (key, reducer) => (WrappedComponent) => {
  class ReducerInjector extends Component {
    static contextType = ReactReduxContext;

    constructor(props, context) {
      super(props, context);
      this.firstRender = true;
      const {
        store: {
          injectReducer,
        },
      } = context;
      injectReducer(key, reducer);
    }

    render() {
      // TODO: will be removed after react-boilerplate utils or redux-reducers-injector update
      if (this.firstRender) {
        this.firstRender = false;
        return (
          <ReactReduxContext.Consumer>
            {reduxContext => (
              <ReactReduxContext.Provider
                value={{
                  ...reduxContext,
                  storeState: reduxContext.store.getState(),
                }}
              >
                <WrappedComponent {...this.props} />
              </ReactReduxContext.Provider>
            )}
          </ReactReduxContext.Consumer>
        );
      }
      return <WrappedComponent {...this.props} />;
    }
  }

  return ReducerInjector;
};
