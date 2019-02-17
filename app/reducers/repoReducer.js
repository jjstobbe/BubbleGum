import { ADD_REPO, FETCH_REMOTES, SET_CURRENT_REPO, REMOVE_REPO } from '../actions/repoActions';

export default function repo(state = {}, action) {
  switch (action.type) {
    case ADD_REPO:
      let repos = state.repos || [];
      if (!action.repo || !action.repoName) {
        return state;
      }

      const newRepo = {
        repoName: action.repoName,
        repoObject: action.repo,
      };

      return {
        ...state,
        repos: [ ...repos, newRepo ],
        selectedRepo: newRepo
      }
    case SET_CURRENT_REPO:
      console.log("SETTING REPO TO = ", action.repoName)
      if (!state.repos || !action.repoName) {
        return state;
      }

      const repoToSelect = state.repos.find((repo) => repo.repoName == action.repoName)

      return {
        ...state,
        selectedRepo: repoToSelect,
      }
    case REMOVE_REPO:
      if (!state.repos || !action.repoName) {
        return state;
      }

      const reposToKeep = state.repos.filter(repo => repo.repoName !== action.repoName);

      return {
        ...state,
        repos: reposToKeep
      }
    default:
      return state;
  }
}
