import React from 'react';
import { NavLink } from 'react-router-dom';

import './navigation.scss';

const items = [
  { label: 'Home', id: 'home' },
  { label: 'User', id: 'user', auth: true },
  { label: 'Table Results', id: 'table', auth: true },
  { label: 'Game', id: 'game', auth: true }
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
