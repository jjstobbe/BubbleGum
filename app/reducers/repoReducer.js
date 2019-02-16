import { FETCH_REMOTES, IMPORT_REPO } from '../actions/repoActions';

export default function repo(state = 0, action) {
  switch (action.type) {
    case FETCH_REMOTES:
      return {
        branchDict: action.branchDictionaries.branchDict,
        remoteDict: action.branchDictionaries.remoteDict
      };
    case IMPORT_REPO:
      return state - 1;
    default:
      return state;
  }
}
