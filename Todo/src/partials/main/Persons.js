import React from 'react';
import PropTypes from 'prop-types';

export const Persons = ({ users, clickHandler }) => (
  <ul>{users.map(user => (
    <li
      key={user.name}
      onClick={() => clickHandler(user)}
    >
      {user.name}
    </li>
  ))}
  </ul>
);

Persons.defaultProps = {
  users: []
};

const userType = PropTypes.shape({
  name: PropTypes.string
});

Persons.propTypes = {
  users: PropTypes.arrayOf(userType)
};

