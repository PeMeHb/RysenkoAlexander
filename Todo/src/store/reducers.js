import { SET_USER, GET_ALL } from './actions';

export const user = (state = null, action) => {
  switch (action.type) {
    case SET_USER: {
      return action.payload;
    }
  }

  return state;
};

export const allUsers = (state = [], action) => {
  switch (action.type) {
    case GET_ALL: {
      return action.payload;
    }
  }

  return state;
};