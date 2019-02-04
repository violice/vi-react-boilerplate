import React, { Component, Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import { createStore } from 'utils';
import { theme, GlobalStyle } from 'theme';

const history = createBrowserHistory();
const store = createStore(history);

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Fragment>
          <Provider store={store}>
            <ConnectedRouter history={history}>
              <Switch>
                <Route exact path="/" render={() => <div>/root</div>} />
              </Switch>
            </ConnectedRouter>
          </Provider>
          <GlobalStyle />
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default App;
