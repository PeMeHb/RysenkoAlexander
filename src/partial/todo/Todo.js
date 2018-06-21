import React from 'react';
import { connect } from 'react-redux';

import { addTodo, removeTodo } from '../store/actions';

import './todo.scss';


export const TodoApp = (props) => {
  const click = () => {
    props.dispatch(addTodo(1, 'Walk dog'));
  };

  return (
    <React.Fragment>
      <button onClick={() => click()}>Add todo</button>&nbsp;
      <button onClick={() => removeTodo(1, 'Walk dog')}>Remove todo</button>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  task: state.task,
});


{ /* <button onClick="dispatch(addTodo('Walk dog'))">Add Walk Dog Todo</button> */ }


/*
export const YearDate = props => (
  <React.Fragment>
    <Buttons update={props.dispatch} />&nbsp;
    <InfoYear date={props.date} />&nbsp;
    <ClassToggle
      update={props.dispatch}
      classInit=""
    />
  </React.Fragment>
);

const mapStateToProps = state => ({
  date: state.date,
  classInit: state.className,
});

export const Year = connect(mapStateToProps)(YearDate);
*/


export const Todo = connect(mapStateToProps)(TodoApp);
