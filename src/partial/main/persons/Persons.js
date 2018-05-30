import './persons.scss';

export const Persons = ({ users, clickHendler }) => (
  <ul>
    {users.map(user => (
      <li
        key={user.id}
        onClick={() => clickHendler(user)}
      >
        {user.name}
      </li>
    ))}
  </ul>
);
