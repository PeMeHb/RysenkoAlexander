
export const INCREASE_YEAR = 'Make plus one year';
export const DECREASE_YEAR = 'Make minus one year';
export const incYear = () => ({ type: INCREASE_YEAR });
export const decYear = () => ({ type: DECREASE_YEAR });

export const TOGGLE_CLASS = 'Toggle class';
export const classToggle = activeClass => ({ type: TOGGLE_CLASS, activeClass });


/*
export const ADD_TASK = 'Add new task';
export const addTodo = payload => ({ type: ADD_TASK, payload });

export const REMOVE_TASK = 'Remove task';
export const removeTodo = payload => ({ type: REMOVE_TASK, payload }); // payload = {day: 0, index: 1}

export const SET_USER = 'Set new user';
export const setUser = payload => ({ type: SET_USER, payload });

export const SET_INFO = 'Set tasks info';
export const setInfo = payload => ({ type: SET_INFO, payload });
*/
