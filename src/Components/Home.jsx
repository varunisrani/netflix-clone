import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  const [randomMovie, setRandomMovie] = useState(null);
  const apiKey = "b1666d3d17f247efa7f49e045debdf4a"; // Replace with your actual API key

  useEffect(() => {
    // Fetch movies
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.results) {
          setMovies(data.results);
          // Select a random movie from the list
          const randomIndex = Math.floor(Math.random() * data.results.length);
          setRandomMovie(data.results[randomIndex]);
        }
      })
      .catch((err) => {
        console.error(err);
      });

    // Fetch TV shows
    fetch(
      "https://api.themoviedb.org/3/discover/tv?api_key=b1666d3d17f247efa7f49e045debdf4a"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.results) {
          setTv(data.results);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [apiKey]);

  return (
    <>
      <div className="bg-[#141414] min-h-screen">
        <div className="relative flex items-center justify-between p-4 bg-[#141414] text-white">
          <div className="flex items-center">
            <img
              src="https://imagetolink.com/ib/Pl1RjQA1A3.png"
              alt="Pl1RjQA1A3"
              height={100}
              width={100}
              className="z-10"
            />
          </div>
          <div className="flex items-center">
            <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-7a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* TV Shows */}
        <div>
          {randomMovie && (
            <div className="w-full  object-top p-5 ">
              <img
                src={`https://image.tmdb.org/t/p/original${randomMovie.poster_path}`}
                alt={randomMovie.title}
                className="flex-shrink-0 w-full h-40 rounded-lg overflow-hidden shadow-lg p-1 transition-transform transform hover:scale-105 object-fill"
              />
            </div>
          )}
        </div>
        <div className="flex flex-row overflow-x-auto p-4 mt-20">
          {tv && tv.length > 0 ? (
            tv.map((tv) => (
              <div
                key={tv.id}
                className="flex-shrink-0 w-1/3 h-40 rounded-lg overflow-hidden shadow-lg p-1 transition-transform transform hover:scale-105"
              >
                <Link to={`/movie/${tv.id}`}>
                  <div className="w-full h-full overflow-hidden">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                      alt={tv.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>

        {/* Movies */}
        <div className="flex flex-row overflow-x-auto p-4 mt-4">
          {movies && movies.length > 0 ? (
            movies.map((movie) => (
              <div
                key={movie.id}
                className="flex-shrink-0 w-1/3 h-40 rounded-lg overflow-hidden shadow-lg p-1 transition-transform transform hover:scale-105"
              >
                <Link to={`/movie/${movie.id}`}>
                  <div className="w-full h-full overflow-hidden">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
