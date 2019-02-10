import { Switch, Route } from 'react-router-dom';

export default () => (
  <Switch>
    <Route exact path="/" render={() => <div>/root</div>} />
  </Switch>
);
