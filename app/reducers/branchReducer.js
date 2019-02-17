import { REFRESH_BRANCHES, SET_BRANCH } from '../actions/branchActions';

export default function branch(state = {}, action) {
  switch (action.type) {
    case REFRESH_BRANCHES:
      return {
        ...state,
        branchDict: action.branchDictionaries.branchDict,
        remoteDict: action.branchDictionaries.remoteDict,
      };
    case SET_BRANCH:
      return {
        ...state,
        currentBranch: action.branchName,
      }
    default:
      return state;
  }
}
