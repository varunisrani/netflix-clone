import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "./Auth/Login/firebase";
import { useUserProfile } from "./UserProfileProvider";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./Auth/Login/firebase";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("Home");
  const { selectedProfileId } = useUserProfile();
  const [image, setImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [datas, setDatas] = useState([]);
  console.log(datas);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const logout = async () => {
    auth.signOut();
  };

  const showData = async () => {
    try {
      const dataRef = doc(db, "profile", selectedProfileId);
      const docSnapshot = await getDoc(dataRef);

      if (docSnapshot.exists()) {
        const data = docSnapshot.data();

        // Check if the image is already stored in local storage
        const storedImage = localStorage.getItem("profileImage");

        if (storedImage) {
          // If stored, use the locally stored image
          setImage(storedImage);
        } else {
          // If not stored, set the image and store it in local storage
          setImage(data.image);
          localStorage.setItem("profileImage", data.image);
        }

        setDatas([
          {
            id: docSnapshot.id,
            pname: data.pname,
            pass: data.pass,
            image: data.image,
          },
        ]);
      } else {
        alert("Profile not found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // Set loading to false once data is fetched (whether successful or not)

      setImageLoading(false);
    }
  };

  useEffect(() => {
    showData();
  }, [selectedProfileId]);

  return (
    <>
      <nav className="relative flex items-center justify-between p-4 bg-[#141414] text-white phone:flex phone:flex-row mid:flex mid:flex-row">
        <div className="flex items-center">
          <Link to="/home">
            {" "}
            <img
              src="https://imagetolink.com/ib/Pl1RjQA1A3.png"
              alt="Pl1RjQA1A3"
              height={100}
              width={100}
              className="z-10 phone:h-5 phone:w-20 mid:h-5 mid:w-20"
            />{" "}
          </Link>
          <ul className="flex flex-row gap-5 ml-10 phone:hidden mid:hidden ">
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
              <Link to="/movie" onClick={() => handleLinkClick("Movies")}>
                Movies
              </Link>
            </li>
            <li className={`text-white/50 hover:text-white `}>
              <Link to="/tv" onClick={() => handleLinkClick("TV")}>
                Tv shows
              </Link>
            </li>
            <li className={`text-white/50 hover:text-white `}>
              <Link
                to="/checkout"
                onClick={() => handleLinkClick("Buy Subscription")}
              >
                Buy subscription
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-4 ">
          <Link to="/search">
            <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 phone:hidden">
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
          {imageLoading ? (
            <p>L</p>
          ) : (
            <Link to="/profile">
              {image && (
                <img
                  src={image}
                  height={50}
                  width={50}
                  className="object-cover rounded-lg"
                />
              )}
            </Link>
          )}
          <button onClick={logout} className="phone:hidden mid:hidden">
            <Link to="/login">Log out</Link>
          </button>
          <button className="md:hidden lg:hidden" onClick={toggleMenu}>
            {" "}
            {isOpen ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      <div>
        {" "}
        {isOpen && (
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
        )}
      </div>
    </>
  );
};

export default Navbar;
