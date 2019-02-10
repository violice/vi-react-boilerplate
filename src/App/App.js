import React, { Component, Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { createStore } from 'utils';
import { theme, GlobalStyle } from 'theme';
import Routes from './Routes';

const history = createBrowserHistory();
const store = createStore(history);

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Fragment>
          <Provider store={store}>
            <ConnectedRouter history={history}>
              {Routes()}
            </ConnectedRouter>
          </Provider>
          <GlobalStyle />
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default App;
