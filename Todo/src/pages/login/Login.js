import React from 'react';

import { Link } from 'react-router-dom';
import { Form } from '../../components/Form';
import { login } from '../../services/userService';

import './login.scss';

export const Login = (props) => {
  const loginUser = (data) => {
    login(data)
      .then(data => props.login(data))
      /* eslint no-console: ["error", { allow: ["log"] }] */
      .catch(console.log);
  };

  return (
    props.isLoading ? <mark>Loading...</mark>
      : (
        <div className="login-page">
          <Form
            exclude={['firstName', 'lastName', 'repeat password']}
            submit={loginUser}
            data={props.user}
          />

          <p className="login-text">If you don`t have an account, click to register</p>
          <Link
            to="/User"
            className="start-button"
          >
            {'Register'}
          </Link>

        </div>
      )
  );
};
