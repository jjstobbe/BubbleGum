import repoService from '../services/repoService'

export const REFRESH_BRANCHES = 'REFRESH_BRANCHES';
export const SET_BRANCH = 'SET_BRANCH';

export const changeToLocalBranch = (branchName) => {
  return async (dispatch, getState) => {
    // await repoService.changeToLocalBranch(branchName);

    // await repoService.stashLocalChanges
  }
}

export const changeToRemoteBranch = (branchName) => {
  return async (dispatch, getState) => {
    // await repoService.changeToRemoteBranch(branchName);

    // await repoService.stashLocalChanges
  }
}

export const refreshBranches = () => {
  return async (dispatch, getState) => {
    await repoService.repoFetch()
    const branchDictionaries = await repoService.getAllBranches()

    console.log(await repoService.getStatus())

    dispatch({
      type: REFRESH_BRANCHES,
      branchDictionaries
    })

  }
}

export const setBranch = (branchName) => {
  return {
    type: SET_BRANCH,
    branchName // or some kind of branch object or something idk..
  }
}
