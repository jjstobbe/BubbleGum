import repoService from '../services/repoService'
import { refreshBranches } from './branchActions'

export const ADD_REPO = 'ADD_REPO';
export const SET_CURRENT_REPO = 'SET_CURRENT_REPO';
export const REMOVE_REPO = 'REMOVE_REPO';

export const importRepo = (workingDirectory) => {
  return async (dispatch, getState) => {
    const { repo, repoName } = await repoService.openRepo(workingDirectory);

    dispatch(addRepo(repo, repoName))

    dispatch(refreshBranches());
  }
}

export const addRepo = (repo, repoName) => {
  return {
    type: ADD_REPO,
    repo,
    repoName,
  }
}

export const setCurrentRepo = (repo) => {
  return async (dispatch, getState) => {
    repoService.setCurrentRepo(repo.repoObject);

    dispatch({
      type: SET_CURRENT_REPO,
      repoName: repo.repoName,
    })

    dispatch(refreshBranches());
  }
}

export const removeRepo = (repo) => {
  return async (dispatch, getState) => {
    const { selectedRepo, repos } = getState().repo;

    if (selectedRepo && selectedRepo.repoName === repo.repoName) {
      const index = repos.map(r => r.repoName).indexOf(repo.repoName);

      if (index-1 >= 0) {
        dispatch(setCurrentRepo(repos[index-1]));
      } else if (index + 1 < repos.length) {
        dispatch(setCurrentRepo(repos[index+1]));
      } else {
        dispatch(setCurrentRepo(null))
      }
    }

    dispatch({
      type: REMOVE_REPO,
      repoName: repo.repoName
    });
  }
}
