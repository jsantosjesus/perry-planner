import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Context } from './Context/AuthContext';

import {Login} from './pages/login';
import {Home} from './pages/home';

function CustomRoute({ isPrivate, ...rest }) {
  const { loading, authenticated } = useContext(Context);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (isPrivate && !authenticated) {
    return <Redirect to="/login" />
  }

  if (!isPrivate && authenticated) {
    return <Redirect to="/" />
  }

  return <Route {...rest} />;
}

export default function Routes() {
  return (
    <Switch>
      <CustomRoute exact path="/login" component={Login} />
      <CustomRoute isPrivate exact path="/" component={Home} />
    </Switch>
  );
}