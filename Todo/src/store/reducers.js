import { SET_USER, ADD_INFO} from './actions';

export const user = (state = null, action) => {
  switch (action.type) {
    case SET_USER: {
      return action.payload;
    }
    case ADD_INFO: {
      return  Object.assign( ...state, { ...action.payload });
    }
  }

  return state;
};
