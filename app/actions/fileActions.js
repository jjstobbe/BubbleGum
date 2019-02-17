import repoService from "../services/repoService";

export const GET_STATUS = 'GET_STATUS';

export const getStatus = () => {
  return async (dispatch, getState) => {
    repoService.getStatus();
  }
}
