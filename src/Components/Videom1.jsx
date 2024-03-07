import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Auth/Login/firebase";

const Videom1 = () => {
  const { _id } = useParams();
  const [user] = useAuthState(auth);
  const [, setMovie] = useState({});

  useEffect(() => {
    const apiKey = "b1666d3d17f247efa7f49e045debdf4a";

    // Fetch movie details
    fetch(`https://api.themoviedb.org/3/tv/${_id}?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
      })
      .catch((err) => {
        console.error(err);
      });
    fetch(`https://api.themoviedb.org/3/tv/${_id}?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [_id]);

  return (
    <>
      {user ? (
        <div className="flex justify-center items-center h-screen bg-gray-900 px-4">
          <div className="absolute top-4 left-4">
            {/* Back button */}
            <Link
              to="/"
              className="text-white bg-[#E50914] hover:bg-[#E50914] font-bold py-2 px-4 rounded"
            >
              Back
            </Link>
          </div>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${_id}`}
            width="100%"
            height="100%"
            controls={true}
            playing={true}
            className="react-player"
          />
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

export default Videom1;
