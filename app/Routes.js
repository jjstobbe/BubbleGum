import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import BasePage from './containers/BasePage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.BASEPAGE} component={BasePage} />
    </Switch>
  </App>
);
