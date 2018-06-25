import PropTypes from 'prop-types';

export const Persons = ({ users, clickHandler }) => (
  <ul>{users.map(user => (
    <li
      key={user.age}
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
  age: PropTypes.number,
  name: PropTypes.string
});

Persons.propTypes = {
  users: PropTypes.arrayOf(userType)
};

