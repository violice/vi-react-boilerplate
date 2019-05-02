import React from 'react';
import { Switch, Route } from 'react-router-dom';


const App = () => (
  <Switch>
    <Route exact path="/" render={() => <div>Start</div>} />
  </Switch>
);

export default App;
