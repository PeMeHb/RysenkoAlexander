import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';

import { addTodo, removeTodo } from '../store/actions';

import './todo.scss';


export const TodoApp = (props) => {
  let id = 0;
  const task = 'Walk dog';
  const click = () => {
    console.log(props);
    props.dispatch(addTodo(id++, task));
  };

  return (
    <React.Fragment>
      <button onClick={() => click()}>Add todo</button>&nbsp;
      <button onClick={() => removeTodo(1, 'Walk dog')}>Remove todo</button>&nbsp;
      <ReactCSSTransitionGroup
        component="ul"
        transitionName="add_item"
        transitionAppear={false}
        transitionEnterTimeout={500}
        transitionEnter
        transitionLeave={false}
      >
{/* { this.state.map(task => <li key={task.id}>{task.task}</li>) } */}
      </ReactCSSTransitionGroup>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  tasks: state.tasks,
  id: state.id
});


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
