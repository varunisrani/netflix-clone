/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const MobileNavbar = ({ setIsOpen, logout }) => {
  return (
    <>
      <nav className="bg-[#0A0A0D] border-gray-200  text-white  xl:h sm:hidden lg:hidden  xl:hided">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div
            className={`${
              setIsOpen ? "block" : "hidden"
            } w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-black  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white text-white mac:bg-black mac:text-white">
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
                <Link to="/account" className="block py-3 hover:text-gray-400">
                  Account
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
      </nav>
    </>
  );
};

export default MobileNavbar;
