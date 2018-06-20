import React from 'react';

import { classToggle } from '../store/actions';

import './class.scss';
import { connect } from 'react-redux';


export const ClassToggle = ({ update, classInit }) => {
  const click = () => {
    if (!classInit) {
      update(classToggle());
    }
    console.log(classInit);
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
);

const mapDispatchToProps = dispatch => ({
  updateDate(add) {
    dispatch(add ? incYear() : decYear());
  },
  updateTodo(value) {
    dispatch(addTodo(value));
  }
});

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent); */

