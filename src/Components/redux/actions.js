// actions.js
export const SET_MOVIES = "SET_MOVIES";
export const SET_RANDOM_MOVIE = "SET_RANDOM_MOVIE";

export const setMovies = (movies) => ({
  type: SET_MOVIES,
  payload: movies,
});

export const setRandomMovie = (movie) => ({
  type: SET_RANDOM_MOVIE,
  payload: movie,
});
