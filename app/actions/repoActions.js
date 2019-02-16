import repoService from '../services/repoService'

export const FETCH_REMOTES = 'FETCH_REMOTES';
export const IMPORT_REPO = 'IMPORT_REPO';

export const importRepo = (workingDirectory) => {
  return async (dispatch, getState) => {
    await repoService.openRepo(workingDirectory);
    const branchDictionaries = await repoService.getAllBranches()

    dispatch(addBranches(branchDictionaries));
  }
}

export const changeToLocalBranch = (target) => {
  return async (dispatch, getState) => {
    const state = getState()

    console.log(state);

    // await repoService.stashLocalChanges
  }
}

export const changeToRemoteBranch = (target) => {
  return async (dispatch, getState) => {
    const state = getState()

    console.log(state);

    // await repoService.stashLocalChanges
  }
}

export const addBranches = (branchDictionaries) => {
  return {
    type: FETCH_REMOTES,
    branchDictionaries
  }
}
