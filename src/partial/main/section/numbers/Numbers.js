import React from 'react';
import './numbers.scss';

export const Numbers = (props) => {

  let from = +props.from,
    to = +props.to,
    numbers = [],
    odd = '',
    even = '';

  if (props.odd) {
    odd = 2;
  } else if (props.even) {
    even = 2;
  }

  for (; from <= to; from++) {
    if (odd && from % odd === 0) {
      numbers.push(from);
    } else if (even && from % even === 1) {
      numbers.push(from);
    } else if (!odd && !even) {
      numbers.push(from);
    }
  }

  return (
    <ul className='numbers__list'>
      {
        numbers.map((item, index) => (
          <li key={index} className='numbers__list-item'>{item}</li>
        ))
      }
    </ul>
  )
};
