import React from 'react';
import './aside.scss';

const items = [
  'Topic title',
  'Some info',
  'Random text',
];

export const Aside = () => (
  <aside className="aside">
    <ul className="aside__list">
      {
         items.map((item, index) => (
           <li key={index} className="aside__list-item">
             <a href={'#'} className="aside__list-link">{item}</a>
           </li>
              ))
          }
    </ul>
  </aside>
);
