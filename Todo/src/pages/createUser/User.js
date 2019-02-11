import React from 'react';

import { Form } from '../../components/Form';
import { create, login } from '../../services/userService';

export const CreateUser = (props) => {
  const userHandler = (data) => {
    create(data).then(() => {
      props.setLoginState(data);
      login(data);
      props.history.push('/login');
    });
  };

  return (
    <Form
      disabled={props.user ? ['email'] : []}
      submit={userHandler}
      data={props.user}
    />
  );
};
