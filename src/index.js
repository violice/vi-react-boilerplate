import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from 'styled-components';

import createStore from 'createStore';
import theme, { GlobalStyle, ThemeLogger } from 'theme';

import { App } from 'containers';

const history = createBrowserHistory();
const store = createStore(history);

const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <Fragment>
          <App />
          <GlobalStyle />
          <ThemeLogger />
        </Fragment>
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>,
  MOUNT_NODE,
);
