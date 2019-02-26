import React, { Component, Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from 'theme';
import Routes from './Routes';

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Fragment>
          {Routes()}
          <GlobalStyle />
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default App;
