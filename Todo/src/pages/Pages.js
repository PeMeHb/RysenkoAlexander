import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { TaskList } from './TaskList';
import { Main } from '../partials/main';
import { Login } from '../pages/login';
import { Task } from '../pages/Task';
import { UpdateUser } from './updateUser';
import { CreateUser } from './createUser';
import { Success } from './success';

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
      <Route path="/tasks" exact component={TaskList} />
      <Route path="/tasks/:task" component={Task} />
      <Route path="/user" render={() => <UpdateUser user={user} />} />
      <Redirect from="/login" to="/" />
    </Switch>
  );
};
