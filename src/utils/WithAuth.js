import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { LoadingIndicator } from 'components/Common';
import { KEY } from 'containers/App/constants';

const WithAuth = ({
  component: WrappedComponent,
  render,
  loading,
  user,
  ...rest
}) => (
  <Route
    render={(props) => {
      if (loading) {
        return <LoadingIndicator />;
      }
      if (user) {
        return render
          ? render(props)
          : <WrappedComponent {...props} />;
      }
      return <Redirect to="/login" push />;
    }}
    {...rest}
  />
);

WithAuth.propTypes = {
  component: PropTypes.func,
  render: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]).isRequired,
};

WithAuth.defaultProps = {
  component: null,
  render: null,
};

const mapStateToProps = ({ [KEY]: { loading, user } }) => ({ loading, user });

const withConnect = connect(mapStateToProps);

export default withConnect(WithAuth);
