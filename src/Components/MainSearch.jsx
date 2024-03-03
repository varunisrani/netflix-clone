import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";
import movieTrailer from "movie-trailer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Auth/Login/firebase";

const Mainsearch = () => {
  const [data, setData] = useState({});
  const apiKey = "b1666d3d17f247efa7f49e045debdf4a";
  const { _id } = useParams();
  const [user] = useAuthState(auth);

  useEffect(() => {
    // Fetch movie or TV show details based on the provided ID
    const fetchData = async () => {
      try {
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${_id}?api_key=${apiKey}`
        );
        const movieData = await movieResponse.json();

        if (movieData) {
          setData(movieData);
          return;
        }

        const tvResponse = await fetch(
          `https://api.themoviedb.org/3/tv/${_id}?api_key=${apiKey}`
        );
        const tvData = await tvResponse.json();

        if (tvData) {
          setData(tvData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [_id]);

  const playVideo = async () => {
    try {
      const trailer = await movieTrailer(data.title || "", {
        id: true,
      });

      const videoId = trailer || "";
      window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  return (
    <>
      {user ? (
        <div className="bg-[#141414] h-screen">
          <Navbar />
          <Link to="/">
            <button className="border-4 border-[#E50914] text-white font-medium w-20 p-2 ml-10 mt-10 rounded-lg hover:bg-[#E50914]">
              Back
            </button>
          </Link>
          <div className="flex flex-row absolute ml-10 mt-10">
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                alt={data.title}
                className="h-1/1 w-full"
              />
            </div>
            <div className="flex flex-col ml-10">
              <div className="flex items-center mb-5"></div>
              <h1 className="text-white text-5xl lg:text-6xl xl:text-7xl font-bold mt-5">
                {data.title}
              </h1>
              <p className="text-white text-base md:text-lg lg:text-xl mt-10 mr-10">
                {data.overview}
              </p>
              <p className="text-white text-base md:text-lg mt-10">
                <strong className="text-[#E50914]">Release Year:</strong>{" "}
                {data.release_date ? data.release_date.split("-")[0] : "N/A"}
              </p>
              <p className="text-white text-base md:text-lg">
                <strong className="text-[#E50914]">Category:</strong>{" "}
                {data.genres
                  ? data.genres.map((genre) => genre.name).join(", ")
                  : "N/A"}
              </p>
              <p className="text-white text-base md:text-lg">
                <strong className="text-[#E50914]">Runtime:</strong>{" "}
                {data.runtime ? `${data.runtime} mins` : "N/A"}
              </p>
              <button
                className="w-60 p-5 border-4 border-[#E50914] mt-20 rounded-full text-white hover:bg-[#E50914]"
                onClick={playVideo}
              >
                Play
              </button>
            </div>
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

export default Mainsearch;
