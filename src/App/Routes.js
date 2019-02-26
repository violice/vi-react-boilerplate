import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Feature from 'Feature';

export default () => (
  <Switch>
    <Route exact path="/" component={Feature} />
  </Switch>
);
