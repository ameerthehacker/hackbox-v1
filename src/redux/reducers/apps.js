import { ADD_APP } from '../action-types';

const initialState = {
  allAppIds: [],
  byAppIds: {}
}

export default function(state = initialState, action) {
  switch(action.type) {
    case ADD_APP: {
      const { id, content } = action.payload;
      return {
        ...state,
        allAppIds: [...state.allAppIds, id],
        byAppIds: {
          ...state.byAppIds,
          [id]: {
            content
          }
        }
      };
    }

    default: {
      return state;
    }
  }
}
