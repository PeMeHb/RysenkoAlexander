import React from 'react';

import { Form } from '../../components/Form';
import { update } from '../../services/userService';

export const UpdateUser = (props) => {
  const userHandler = (data) => {
    update(data).then(props.setLoginState);
  };

  return (
    <Form
      disabled={props.user ? ['email'] : []}
      submit={userHandler}
      data={props.user}
    />
  );
};
