import React from 'react';
import { decYear, incYear } from '../store/actions';


import './buttons.scss';


export const Buttons = ({ update }) => {
  const click = (add) => {
    if (add) {
      update(incYear());
    } else {
      update(decYear());
    }
  };

  return (
    <React.Fragment>
      <button onClick={() => click()}>Decrease year</button>&nbsp;
      <button onClick={() => click(true)}>Increase year</button>
    </React.Fragment>
  );
};


/* const items = [
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
); */
