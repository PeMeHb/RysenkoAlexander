import React from 'react';
import './date.scss'

export const Date = () => {
    const date = new Date().toLocaleDateString();

      return <div>{date}</div>

};
