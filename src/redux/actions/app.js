import { ADD_APP, SET_IS_APP_LOADING } from '../action-types/app';

let nextAppId = 0;

export const addApp = (app) => {
  return {
    type: ADD_APP,
    payload: {
      id: nextAppId++,
      app
    }
  }
};

export const setIsAppLoading = (isAppLoading) => {
  return {
    type: SET_IS_APP_LOADING,
    payload: {
      err: false,
      isAppLoading
    }
  }
};
