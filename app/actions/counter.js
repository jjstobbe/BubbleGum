import repoService from '../services/repoService'

export const FETCH_REMOTES = 'FETCH_REMOTES';
export const IMPORT_REPO = 'IMPORT_REPO';

export const importRepo = (workingDirectory) => {
  return async (dispatch, getState) => {
    await repoService.openRepo(workingDirectory);
    return dispatch(fetchRemotes());
  }
}

export const fetchRemotes = () => {
  console.log("Fetching remotes?")

  return async (dispatch, getState) => {
    console.log("Fetching inside");

    const remotes = await repoService.getReferences()

    console.log(remotes)

    if (remotes.length > 0) {
      console.log(remotes[0])
    }
    return {
      type: "FETCH_REMOTES"
    }
  }
}
