import { combineReducers } from 'redux';

const nums = (state = [50, 10, 20, 40, 30, 15, 25, 35], action) => {
  switch (action.type) {
    case 'CHANGE_NUMS':
      return action.nums;
    default:
      return state;
  }
};

const current = (state = null, action) => {
  switch (action.type) {
    case 'CHANGE_CURRENT':
      return action.index;
    default:
      return state;
  }
};

const target = (state = null, action) => {
  switch (action.type) {
    case 'CHANGE_TARGET':
      return action.index;
    default:
      return state;
  }
};

const messages = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return [
        ...state,
        action.message
      ];
    case 'CLEAR_MESSAGES':
      return [];
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  nums,
  current,
  target,
  messages
});

export default rootReducer;
