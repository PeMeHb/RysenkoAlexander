import React from 'react';

import { classToggle } from '../store/actions';

import './class.scss';


export const ClassToggle = ({ update, clasName }) => {
  const click = () => {
    console.log(clasName);
    update(classToggle());
  };

  return (
    <button className="" onClick={() => click()}>toggle class</button>
  );
};


/* export const ClassToggle = props => (
  <React.Fragment>
    <Buttons update={props.dispatch} />&nbsp;
    <InfoYear date={props.date} />
  </React.Fragment>
); */

