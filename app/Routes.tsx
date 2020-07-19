/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { LoadingComponent } from './features';
import routes from './constants/routes.json';
import App from './containers/App';

// Lazily load routes and code split with webpacck
const LazyHomePage = React.lazy(() =>
  import(/* webpackChunkName: "HomePage" */ './containers/HomePage')
);

const LazyMultipleSizePage = React.lazy(() =>
  import(/* webpackChunkName: "HomePage" */ './containers/MultipleSizePage')
);

const LazyAppSettingsPage = React.lazy(() =>
  import(/* webpackChunkName: "HomePage" */ './containers/AppSettingsPage')
);

const HomePage = (props: Record<string, any>) => (
  <React.Suspense fallback={<LoadingComponent mode="auto" />}>
    <LazyHomePage {...props} />
  </React.Suspense>
);

const MultipleSizePage = (props: Record<string, any>) => (
  <React.Suspense fallback={<LoadingComponent mode="auto" />}>
    <LazyMultipleSizePage {...props} />
  </React.Suspense>
);

const AppSettingsPage = (props: Record<string, any>) => (
  <React.Suspense fallback={<LoadingComponent mode="auto" />}>
    <LazyAppSettingsPage {...props} />
  </React.Suspense>
);

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.MULTIPLESIZE} component={MultipleSizePage} />
        <Route path={routes.APPSETTINGS} component={AppSettingsPage} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </App>
  );
}
