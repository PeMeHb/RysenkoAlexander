import React from 'react';

import { Form } from '../../components/Form';
import { login } from '../../services/userService';

export const Login = (props) => {
  const loginUser = (data) => {
    login(data)
      .then(data => props.login(data))
      /* eslint no-console: ["error", { allow: ["log"] }] */
      .catch(console.log);
  };

  return (
    props.isLoading ? <mark>Loading...</mark> :
    <Form
      exclude={['firstName', 'lastName', 'repeat password']}
      submit={loginUser}
      data={props.user}
    />
  );
};
