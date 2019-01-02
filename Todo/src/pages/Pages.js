import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Main } from '../partials/main';
import { Login } from '../pages/login';
import { UpdateUser } from '../pages/updateUser';
import { CreateUser } from '../pages/createUser';
import { Success } from '../pages/success';
import { Table } from '../pages/table';
import { Game } from '../pages/game';

export const Pages = ({ user, setLoginState }) => {
  if (!user) {
    return (
      <Switch>
        <Route
          path="/login"
          render={() => <Login login={setLoginState} />}
        />
        <Route
          path="/user"
          render={({ history }) => (
            <CreateUser
              user={user}
              setLoginState={setLoginState}
              history={history}
            />
          )}
        />
        <Route path="/success" component={Success} />
        <Redirect to="/login" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/home" exact component={Main} />
      <Route path="/user" render={() => <UpdateUser user={user} />} />
      <Route path="/table results" exact component={Table} />
      <Route path="/game" exact component={Game} />
      <Redirect from="/login" to="/" />
    </Switch>
  );
};
