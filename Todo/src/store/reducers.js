import { ADD_TASK, REMOVE_TASK, SET_USER, SET_INFO, ADD_GAME } from './actions';

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

export const gameCount = (state = null, action) => {
  switch (action.type) {
    case ADD_GAME: {
      return action.payload;
    }
  }

  return state;
};
