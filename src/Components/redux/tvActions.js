// tvActions.js
export const SET_TV_SHOWS = "SET_TV_SHOWS";
export const SET_RANDOM_TV_SHOW = "SET_RANDOM_TV_SHOW";

export const setTvShows = (tvShows) => ({
  type: SET_TV_SHOWS,
  payload: tvShows,
});

export const setRandomTvShow = (tvShow) => ({
  type: SET_RANDOM_TV_SHOW,
  payload: tvShow,
});
