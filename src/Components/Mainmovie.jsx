import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";
import movieTrailer from "movie-trailer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Auth/Login/firebase";

const Mainmovie = () => {
  const [movie, setMovie] = useState({});
  const apiKey = "b1666d3d17f247efa7f49e045debdf4a";
  const { mid } = useParams();
  const [user] = useAuthState(auth);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${mid}?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [mid]);

  const playVideo = async () => {
    try {
      const trailer = await movieTrailer(movie.title || "", {
        id: true,
      });

      const videoId = trailer || "";
      window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  return (
    <div className="bg-[#141414] h-screen">
      {user ? (
        <>
          <Navbar />
          <Link to="/search">
            <button className="border-4 border-[#E50914] text-white font-medium w-20 p-2 ml-10 mt-10 rounded-lg hover:bg-[#E50914]">
              Back
            </button>
          </Link>
          <div className="flex flex-row absolute ml-10 mt-10">
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="h-1/1 w-full"
              />
            </div>
            <div className="flex flex-col ml-10">
              <div className="flex items-center mb-5"></div>
              <h1 className="text-white text-5xl lg:text-6xl xl:text-7xl font-bold mt-5">
                {movie.title}
              </h1>
              <p className="text-white text-base md:text-lg lg:text-xl mt-10 mr-10">
                {movie.overview}
              </p>
              <p className="text-white text-base md:text-lg mt-10">
                <strong className="text-[#E50914]">Release Year:</strong>{" "}
                {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
              </p>
              <p className="text-white text-base md:text-lg">
                <strong className="text-[#E50914]">Category:</strong>{" "}
                {movie.genres
                  ? movie.genres.map((genre) => genre.name).join(", ")
                  : "N/A"}
              </p>
              <p className="text-white text-base md:text-lg">
                <strong className="text-[#E50914]">Runtime:</strong>{" "}
                {movie.runtime ? `${movie.runtime} mins` : "N/A"}
              </p>
              <button
                className="w-60 p-5 border-4 border-[#E50914] mt-20 rounded-full text-white hover:bg-[#E50914]"
                onClick={playVideo}
              >
                Play
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center font-bold text-5xl inset-0 absolute">
          Please Login to Access this Page
          <button className="text-xl bg-[#E50914] text-white w-20 p-4 flex justify-center items-center rounded-full">
            <Link to="/login">Login</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Mainmovie;
