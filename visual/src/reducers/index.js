import { combineReducers } from 'redux';
import sort from './sort';
import heap from './heap';

const rootReducer = combineReducers({
  sort,
  heap
});

export default rootReducer;
