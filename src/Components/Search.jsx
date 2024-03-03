import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
const Search = () => {
  const [data, setData] = useState([]);
  const apiKey = "b1666d3d17f247efa7f49e045debdf4a"; // Replace with your actual API key
  const [search, setSearch] = useState("");
  useEffect(() => {
    // Fetch movies
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}`
    )
      .then((res) => res.json())
      .then((data) => setData(data.results))
      .catch((err) => console.log(err));
    fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${search}`
    )
      .then((res) => res.json())
      .then((data) => setData(data.results))
      .catch((err) => console.log(err));
  }, [search]);

  return (
    <>
      <Navbar />
      <div className="bg-[#141414] min-h-screen">
        <div className="flex items-center justify-center flex-col">
          <h1 className="text-5xl font-bold mt-10 text-white">
            Search Movies & Tvshow
          </h1>
          <div>
            <input
              value={search}
              type="text"
              placeholder="Search Movies or Tvshow"
              onChange={(e) => setSearch(e.target.value)}
              className="p-5 mt-10   bg-[#141414] border-4 border-[#E50914] text-white rounded-full"
            />
          </div>
        </div>
        <div className="flex flex-row overflow-x-auto p-4 mt-5 ml-5 md:flex-wrap lg:justify-start">
          <div className="flex flex-wrap space-x-4">
            {data.map((datas) => (
              <div
                key={datas.id}
                className="flex-shrink-0 w-1/4 md:w-1/5 lg:w-1/6 last:mr-0 last:mb-0 mt-5 ml-5"
              >
                <Link
                  to={`/mainsearch/${datas.id}`}
                  className="block w-full h-full"
                >
                  <div className="w-full h-56 overflow-hidden rounded-lg">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${datas.poster_path}`}
                      alt={datas.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
