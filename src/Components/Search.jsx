import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Auth/Login/firebase";

const Search = () => {
  const [data, setData] = useState([]);
  const apiKey = "b1666d3d17f247efa7f49e045debdf4a";
  const [search, setSearch] = useState("");
  const [user] = useAuthState(auth);

  useEffect(() => {
    // Fetch movies and TV shows based on the search query
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
      {user ? (
        // User is authenticated
        <>
          <Navbar />
          <div className="bg-[#141414] min-h-screen">
            <div className="flex items-center justify-center flex-col">
              <h1 className="text-5xl font-bold mt-10 text-white phone:text-3xl phone:p-4 mid:text-4xl mid:mt-10 mid:m-4">
                Search Movies & TV Shows
              </h1>
              <div>
                <input
                  value={search}
                  type="text"
                  placeholder="Search Movies or TV Shows"
                  onChange={(e) => setSearch(e.target.value)}
                  className="p-5 mt-10 bg-[#141414] border-4 border-[#E50914] text-white rounded-full"
                />
              </div>
            </div>
            <div className="flex flex-row flex-wrap overflow-x-auto p-4 mt-5 ml-5 md:flex-wrap lg:justify-start phone:flex phone:flex-wrap phone:mr-5">
              <div className="flex flex-wrap space-x-4 phone:flex phone:flex-wrap phone:mr-5">
                {data.map((datas) => (
                  <div
                    key={datas.id}
                    className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 last:mr-0 last:mb-0 mt-5 ml-5 phone:mr-5"
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
      ) : (
        // User is not authenticated
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

export default Search;
