
import { INCREASE_YEAR, DECREASE_YEAR, TOGGLE_CLASS } from './actions';

// it is typical reducer
// action should be an object with next pattern:
// { type: 'ACTION_NAME', payload?: any_js_value }
export const date = (state = new Date().getFullYear(), action) => {
  switch (action.type) {
    case INCREASE_YEAR: {
      return state + 1;
    }
    case DECREASE_YEAR:
      return state - 1;
  }
  return state;
};

export const toggle = (state = [], action) => {
  switch (action.type) {
    case TOGGLE_CLASS: {
      const newState = [...state, action];
      console.log(newState);
      return newState;
    }
  }
  return state;
};


/* buttonClass: this.state.classActive ? 'active' : '',
   buttonText: this.state.classActive ? 'Hide' : 'Show', */


/*

import { ADD_TASK, REMOVE_TASK, SET_USER, SET_INFO } from './actions';

export const todo = (state = [], action) => {
  switch (action.type) {
    case ADD_TASK: {
      const newState = [...state, action.task];
      return newState;
    }
  }
  return state;
};

export const tasks = (state = [], action) => {
  switch (action.type) {
    case ADD_TASK: {
      return [...state, ...action.payload];
    }
    case REMOVE_TASK: {
      const { day, index } = action.payload;
      const tasks = state[day];
      const newtasks = tasks.filter((el, number) => number !== index);
      state[day] = newtasks;

      return [...state];
    }
  }

  return state;
};

export const user = (state = null, action) => {
  switch (action.type) {
    case SET_USER: {
      return action.payload;
    }
  }

  return state;
};

export const info = (state = null, action) => {
  switch (action.type) {
    case SET_INFO: {
      return action.payload;
    }
  }

  return state;
};
*/
