import { Link } from "react-router-dom";
import { useState } from "react";
import { auth } from "./Auth/Login/firebase";
const Navbar = () => {
  const [activeLink, setActiveLink] = useState("Home");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const logout = async () => {
    auth.signOut();
  };
  return (
    <div>
      <div className="relative flex items-center justify-between p-4 bg-[#141414] text-white">
        <div className="flex items-center">
          <Link to="/">
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
              <Link to="/" onClick={() => handleLinkClick("Home")}>
                Home
              </Link>
            </li>
            <li className={`text-white/50 hover hover:text-white `}>
              <Link to="/movie" onClick={() => handleLinkClick("Movies")}>
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
                activeLink === "MyList" ? "font-bold" : "hover:text-white"
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
          <button className="text-white">
            <Link to="/profile">Profile</Link>
          </button>
          <button onClick={logout}>
            <Link to="/login">Log out</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
