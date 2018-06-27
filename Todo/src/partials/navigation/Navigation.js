import React from 'react';
import { NavLink } from 'react-router-dom';

import './navigation.scss';

const items = [
  { label: 'Home', id: 'home' },
  { label: 'Tasks', id: 'tasks', auth: true },
  { label: 'User', id: 'user' },
  { label: 'Register new', id: 'registernew', nonauth: true },
  { label: 'Game', id: 'game'}
];

export const Navigation = ({ user }) => {
  let filteredItems = items.filter(item => !item.auth);

  if (user) {
    filteredItems = items.filter(item => !item.nonauth);
  }

  return (
    <nav className="main-nav">
      <ul>
        {
          filteredItems
            .map(item => (
              <li
                key={item.id}
                className="item"
              >
                <NavLink
                  activeClassName="active"
                  to={`/${item.label.toLowerCase()}`}
                >
                  {item.label}
                </NavLink>
              </li>
            ))
        }
      </ul>
    </nav>
  );
};
