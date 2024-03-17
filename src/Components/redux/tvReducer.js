// tvReducer.js
import { SET_TV_SHOWS, SET_RANDOM_TV_SHOW } from "./tvActions";

const initialState = {
  tvShows: [],
  randomTvShow: null,
};

const tvReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TV_SHOWS:
      return {
        ...state,
        tvShows: action.payload,
      };
    case SET_RANDOM_TV_SHOW:
      return {
        ...state,
        randomTvShow: action.payload,
      };
    default:
      return state;
  }
};

export default tvReducer;
