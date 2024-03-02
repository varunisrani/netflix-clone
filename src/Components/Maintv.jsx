import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";
import movieTrailer from "movie-trailer";

const Maintv = () => {
  const [show, setShow] = useState({});
  const apiKey = "b1666d3d17f247efa7f49e045debdf4a";
  const { tid } = useParams();

  useEffect(() => {
    // Fetch TV show details
    fetch(`https://api.themoviedb.org/3/tv/${tid}?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        setShow(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [tid]);

  const playTrailer = async () => {
    try {
      const trailer = await movieTrailer(show.name || "", {
        id: true,
      });

      const videoId = trailer || ""; // If a trailer is found, use it; otherwise, an empty string
      window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  return (
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
            src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
            alt={show.name}
            className="h-1/1 w-full"
          />
        </div>
        <div className="flex flex-col ml-10">
          <h1 className="text-white text-5xl lg:text-6xl xl:text-7xl font-bold mt-5">
            {show.name}
          </h1>
          <p className="text-white text-base md:text-lg lg:text-xl mt-10 mr-10">
            {show.overview}
          </p>

          <p className="text-white text-base md:text-lg mt-10">
            <strong className="text-[#E50914]">Release Year:</strong>{" "}
            {show.first_air_date ? show.first_air_date.split("-")[0] : "N/A"}
          </p>
          <p className="text-white text-base md:text-lg">
            <strong className="text-[#E50914]">Category:</strong>{" "}
            {show.genres
              ? show.genres.map((genre) => genre.name).join(", ")
              : "N/A"}
          </p>
          <p className="text-white text-base md:text-lg">
            <strong className="text-[#E50914]">Seasons:</strong>{" "}
            {show.number_of_seasons || "N/A"}
          </p>
          <div>
            <button
              className="w-60 p-5 border-4 border-[#E50914] mt-20 rounded-full text-white hover:bg-[#E50914]"
              onClick={playTrailer}
            >
              Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintv;
