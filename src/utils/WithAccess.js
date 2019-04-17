import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { KEY } from 'containers/App/constants';

const WithAccess = ({
  component: WrappedComponent,
  render,
  user,
  ...rest
}) => (
  <Route
    render={(props) => {
      if (user.role === 'admin') {
        return render
          ? render(props)
          : <WrappedComponent {...props} />;
      }
      return <Redirect to="/" />;
    }}
    {...rest}
  />
);

WithAccess.propTypes = {
  component: PropTypes.func,
  render: PropTypes.func,
  user: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]).isRequired,
};

WithAccess.defaultProps = {
  component: null,
  render: null,
};

const mapStateToProps = ({ [KEY]: { user } }) => ({ user });

const withConnect = connect(mapStateToProps);

export default withConnect(WithAccess);
