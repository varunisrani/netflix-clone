// useMovieData.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovies, setRandomMovie } from "../Components/redux/actions";

const useMovieData = (apiKey) => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const randomMovie = useSelector((state) => state.randomMovie);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`
        );
        const data = await response.json();
        if (data.results) {
          dispatch(setMovies(data.results));
          const randomIndex = Math.floor(Math.random() * data.results.length);
          dispatch(setRandomMovie(data.results[randomIndex]));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [apiKey, dispatch]);

  return { movies, randomMovie };
};

export default useMovieData;
