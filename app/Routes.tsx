/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  Backdrop,
  CircularProgress,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';

import routes from './constants/routes.json';
import App from './containers/App';

// import HomePage from './containers/HomePage';

// Lazily load routes and code split with webpacck
const LazyCounterPage = React.lazy(() =>
  import(/* webpackChunkName: "CounterPage" */ './containers/CounterPage')
);

const LazyHomePage = React.lazy(() =>
  import(/* webpackChunkName: "HomePage" */ './containers/HomePage')
);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  })
);

const LoadingComponent = () => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

const CounterPage = (props: Record<string, any>) => (
  <React.Suspense fallback={<LoadingComponent />}>
    <LazyCounterPage {...props} />
  </React.Suspense>
);

const HomePage = (props: Record<string, any>) => (
  <React.Suspense fallback={<LoadingComponent />}>
    <LazyHomePage {...props} />
  </React.Suspense>
);

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.COUNTER} component={CounterPage} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </App>
  );
}
