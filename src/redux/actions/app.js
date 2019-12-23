import { ADD_APP } from '../action-types';

let nextAppId = 0;

export const addApp = (content) => {
  return {
    type: ADD_APP,
    payload: {
      id: nextAppId++,
      content
    }
  }
};
