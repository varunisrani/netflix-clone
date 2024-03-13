import { useEffect, useState } from "react";

const useMovieData = (apiKey) => {
  const [movies, setMovies] = useState([]);
  const [randomMovie, setRandomMovie] = useState(null); // Renamed loading to get
  const [, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.results) {
            setMovies(data.results);
            // Select a random movie from the list
            const randomIndex = Math.floor(Math.random() * data.results.length);
            setRandomMovie(data.results[randomIndex]);
          }
        })
        .catch((err) => {
          setError(err);
          console.log(err);
        });
    };

    fetchData();
  }, [apiKey]);

  return { movies, randomMovie }; // Renamed loading to get
};

export default useMovieData;
