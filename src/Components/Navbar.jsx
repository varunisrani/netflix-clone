import { Link } from "react-router-dom";

const Navbar = () => {
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
            <li className="text-white">
              <Link to="/">Home</Link>
            </li>
            <li className="text-white/50 hover:text-white">
              <Link to="/movie">Movies</Link>
            </li>
            <li className="text-white/50 hover:text-white">
              {" "}
              <Link to="/tv">Tv shows</Link>
            </li>
            <li className="text-white/50 hover:text-white">My list</li>
          </ul>
        </div>
        <div className="flex items-center">
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
