import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "./Auth/Login/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./Auth/Login/firebase";
import { useParams } from "react-router-dom";
import { ProfileContext } from "./ProfileContext";

const ProfileProvider = () => {
  const [movies, setMovies] = useState([]);
  const [pname, setPname] = useState("");
  const [image, setImage] = useState("");
  console.log(pname);
  const [datas, setDatas] = useState([]);
  console.log(datas);
  const [tv, setTv] = useState([]);
  const { _id } = useParams();
  const [randomMovie, setRandomMovie] = useState(null);
  const apiKey = "b1666d3d17f247efa7f49e045debdf4a";
  const [activeLink, setActiveLink] = useState("Home");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const logout = async () => {
    auth.signOut();
  };
  const showData = async () => {
    try {
      const dataRef = doc(db, "profile", _id);
      const docSnapshot = await getDoc(dataRef);

      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setDatas([
          {
            id: docSnapshot.id,
            pname: data.pname,
            pass: data.pass,
            image: data.image,
          },
        ]);
        // Set the state for editing
        setPname(data.pname);
        setImage(data.image);
      } else {
        alert("Profile not found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    showData();
  }, [_id]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.results) {
          setMovies(data.results);
          const randomIndex = Math.floor(Math.random() * data.results.length);
          setRandomMovie(data.results[randomIndex]);
        }
      })
      .catch((err) => {
        console.error(err);
      });

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

  const [user] = useAuthState(auth);

  return (
    <>
      {!user ? (
        <div className="flex flex-col justify-center items-center font-bold text-5xl inset-0 absolute">
          Please Login to Access this Page
          <button className="text-xl bg-[#E50914] text-white w-20 p-4 flex justify-center items-center rounded-full">
            <Link to="/login">Login</Link>
          </button>
        </div>
      ) : (
        <ProfileContext.Provider value={image}>
          <div className="bg-[#141414] min-h-screen">
            <div>
              <div className="relative flex items-center justify-between p-4 bg-[#141414] text-white">
                <div className="flex items-center">
                  <Link to="/home">
                    <img
                      src="https://imagetolink.com/ib/Pl1RjQA1A3.png"
                      alt="Pl1RjQA1A3"
                      height={100}
                      width={100}
                      className="z-10"
                    />
                  </Link>
                  <ul className="flex flex-row gap-5 ml-10 ">
                    <li
                      className={`text-white ${
                        activeLink === "Home" ? "font-bold" : "text-white/50"
                      } `}
                    >
                      <Link to="/home" onClick={() => handleLinkClick("Home")}>
                        Home
                      </Link>
                    </li>
                    <li className={`text-white/50 hover hover:text-white `}>
                      <Link
                        to="/movie"
                        onClick={() => handleLinkClick("Movies")}
                      >
                        Movies
                      </Link>
                    </li>
                    <li className={`text-white/50 hover:text-white `}>
                      <Link to="/tv" onClick={() => handleLinkClick("TV")}>
                        Tv shows
                      </Link>
                    </li>
                    <li
                      className={`text-white/50 ${
                        activeLink === "MyList"
                          ? "font-bold"
                          : "hover:text-white"
                      } `}
                    >
                      My list
                    </li>
                  </ul>
                </div>
                <div className="flex items-center gap-4">
                  <Link to="/search">
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
                  </Link>
                  <Link to="/profile">
                    <img
                      src={image}
                      alt="Profile"
                      height={100}
                      width={50}
                      className=" object-cover rounded-lg"
                    />
                  </Link>
                  <button className="text-white">
                    <Link to="/profile">Profile</Link>
                  </button>
                  <button onClick={logout}>
                    <Link to="/login">Log out</Link>
                  </button>
                </div>
              </div>
            </div>
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
            <h2 className="text-white text-2xl font-bold ml-10">
              Top 8 Movies
            </h2>
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
        </ProfileContext.Provider>
      )}
    </>
  );
};

export default ProfileProvider;
