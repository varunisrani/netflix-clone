import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import movieTrailer from "movie-trailer";
import { useAuthState } from "react-firebase-hooks/auth";
import ClipLoader from "react-spinners/ClipLoader";
import { auth } from "./Auth/Login/firebase";

const Mainmovie = () => {
  const [movie, setMovie] = useState({});
  const [trailer, setTrailer] = useState("");
  const apiKey = "b1666d3d17f247efa7f49e045debdf4a";
  const { mid } = useParams();
  const [user, loading] = useAuthState(auth);
  const [submitting] = useState(false);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${mid}?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        return movieTrailer(data.title || "", { id: true });
      })
      .then((trailerId) => {
        setTrailer(trailerId || "");
      })
      .catch((err) => {
        console.error(err);
      });
  }, [mid]);
  if (loading) {
    return (
      <>
        <div className="flex items-center justify-center h-screen bg-[#141414]">
          <ClipLoader
            color="red"
            loading={loading || submitting}
            size={120}
            aria-label="Loading Spinner"
            className="ml-10"
            data-testid="loader"
          />
        </div>
      </>
    );
  }
  return (
    <div className="bg-[#141414] h-screen phone:h-screen mid:h-screen mid:mr-5 mid:w-full">
      {user ? (
        <>
          <Link to="/search">
            <button className="border-4 border-[#E50914] text-white font-medium w-20 p-2 ml-10 mt-10 rounded-lg hover:bg-[#E50914]">
              Back
            </button>
          </Link>
          <div className="flex flex-row absolute ml-5 mt-10 phone:flex phone:flex-col phone:h-full ">
            <div className="phone:">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="h-1/1  w-full phone:h-40 phone:w-40 object-cover phone:ml-5"
              />
            </div>
            <div className="flex flex-col ml-10 phone:ml-5">
              <div className="flex items-center mb-5"></div>
              <h1 className="text-white text-5xl lg:text-6xl xl:text-7xl font-bold mt-5 phone:text-4xl">
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
              <Link to={`/video/${trailer}`}>
                <button className="w-60 p-5 border-4 border-[#E50914] mt-20 rounded-full text-white hover:bg-[#E50914]">
                  Play
                </button>
              </Link>
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
