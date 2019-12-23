import { ADD_APP } from '../action-types/app';

const initialState = {
  allAppIds: [],
  byAppIds: {}
}

export default function(state = initialState, action) {
  switch(action.type) {
    case ADD_APP: {
      const { id, app } = action.payload;
      return {
        ...state,
        allAppIds: [...state.allAppIds, id],
        byAppIds: {
          ...state.byAppIds,
          [id]: {
            content: {
              ...app,
              containerId: null
            }
          }
        }
      };
    }

    default: {
      return state;
    }
  }
}
