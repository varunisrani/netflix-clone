import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Auth/Login/firebase";

const Videom = () => {
  const { mid } = useParams();
  const [user] = useAuthState(auth);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const apiKey = "b1666d3d17f247efa7f49e045debdf4a";

    // Fetch movie details
    fetch(`https://api.themoviedb.org/3/movie/${mid}?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [mid]);

  return (
    <>
      {user ? (
        <div className="flex justify-center items-center h-screen bg-gray-900 px-4">
          <div className="absolute top-4 left-4">
            {/* Back button */}
            <Link
              to={`/movie/${mid}`}
              className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
            >
              Back
            </Link>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-white text-4xl font-bold mb-4">
              {movie.title}
            </h1>
            {/* Assuming the API provides a key for the trailer URL, replace 'trailerKey' with the actual key */}
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${movie.trailerKey}`}
              width="80%"
              height="60vh"
              controls={true}
              playing={true}
              className="react-player"
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center font-bold text-5xl inset-0 absolute">
          Please Login to Access this Page
          <button className="text-xl bg-[#E50914] text-white w-20 p-4 flex justify-center items-center rounded-full">
            <Link to="/login">Login</Link>
          </button>
        </div>
      )}
    </>
  );
};

export default Videom;
