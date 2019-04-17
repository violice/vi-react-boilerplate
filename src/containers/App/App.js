import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <div>Start</div>} />
      </Switch>
    );
  }
}

export default App;
