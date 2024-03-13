import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const MobileNavbar = ({ setIsOpen, logout }) => {
  return (
    <div>
      <div className="md:hidden absolute top-16 left-0 w-full bg-[#141414] border-t border-gray-700 text-white phone:mt-60 mid:mt-80">
        <ul className="text-center py-5">
          <li>
            <Link
              to="/home"
              className="block py-3 hover:text-gray-400 mt-5"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/tv"
              className="block py-3 hover:text-gray-400"
              onClick={() => setIsOpen(false)}
            >
              TV
            </Link>
          </li>
          <li>
            <Link
              to="/movie"
              className="block py-3 hover:text-gray-400"
              onClick={() => setIsOpen(false)}
            >
              Movie
            </Link>
          </li>
          <li>
            <Link
              to="/search"
              className="block py-3 hover:text-gray-400"
              onClick={() => setIsOpen(false)}
            >
              Search
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="block py-3 hover:text-gray-400"
              onClick={logout}
            >
              Logout
            </Link>
          </li>
          <li>
            <Link
              to="/checkout"
              className="block py-3 mb-5 hover:text-gray-400"
            >
              Buy subscription
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileNavbar;
