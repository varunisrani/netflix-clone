import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

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
        {/* Header */}
        <Navbar />

        {/* Main poster */}
        <div className="relative w-screen h-[56.25vw] md:h-[37.5vw] lg:h-[30vw]">
          <Link to={`/mainmovie/${randomMovie?.id}`}>
            {randomMovie?.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/original${randomMovie.poster_path}`}
                className="w-full h-full object-cover brightness-[60%] transition duration-500"
                alt={randomMovie.title}
              />
            ) : (
              <p className="text-white">Image not available</p>
            )}
            <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
              <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
                {randomMovie?.title}
              </p>
              <div className="flex flex-row items-center mt-3 md:mt-4 gap-3"></div>
            </div>
          </Link>
        </div>

        {/* Top 8 TV Shows */}
        <h2 className="text-white text-2xl font-bold ml-10 mt-5">
          Top 8 TV Shows
        </h2>
        <div className="flex flex-row overflow-x-auto p-4 mt-5 ml-5 md:flex-row lg:justify-start">
          {tv && tv.length > 0 ? (
            <div className="flex flex-row space-x-4">
              {tv.slice(0, 8).map((tvShow) => (
                <div
                  key={tvShow.id}
                  className="flex-shrink-0 w-1/4 md:w-1/5 lg:w-1/6 last:mr-0 last:mb-0"
                >
                  <Link
                    to={`/maintv/${tvShow.id}`}
                    className="block w-full h-full"
                  >
                    <div className="w-full h-56 overflow-hidden rounded-lg">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                        alt={tvShow.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading TV shows...</p>
          )}
        </div>

        {/* Top 8 Movies */}
        <h2 className="text-white text-2xl font-bold ml-10">Top 8 Movies</h2>
        <div className="flex flex-row overflow-x-auto p-4 mt-6 ml-5 md:flex-row lg:justify-start">
          {movies && movies.length > 0 ? (
            <div className="flex flex-row space-x-4">
              {movies.slice(0, 8).map((movie) => (
                <div
                  key={movie.id}
                  className="flex-shrink-0 w-1/4 md:w-1/5 lg:w-1/6 last:mr-0 last:mb-0"
                >
                  <Link
                    to={`/mainmovie/${movie.id}`}
                    className="block w-full h-full"
                  >
                    <div className="w-full h-56 overflow-hidden rounded-lg">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading movies...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
