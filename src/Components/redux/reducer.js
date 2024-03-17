// reducers.js
import { SET_MOVIES, SET_RANDOM_MOVIE } from "./actions";

const initialState = {
  movies: [],
  randomMovie: null,
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIES:
      return {
        ...state,
        movies: action.payload,
      };
    case SET_RANDOM_MOVIE:
      return {
        ...state,
        randomMovie: action.payload,
      };
    default:
      return state;
  }
};

export default movieReducer;
