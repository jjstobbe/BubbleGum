import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import repo from './repoReducer';

export default function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    repo
  });
}
