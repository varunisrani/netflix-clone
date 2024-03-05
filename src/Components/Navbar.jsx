import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "./Auth/Login/firebase";
import { useUserProfile } from "./UserProfileProvider";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./Auth/Login/firebase";
const Navbar = () => {
  const [activeLink, setActiveLink] = useState("Home");
  const { selectedProfileId } = useUserProfile();
  const [image, setImage] = useState([]);
  const [datas, setDatas] = useState([]);
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  console.log("Navbar id", selectedProfileId);
  const logout = async () => {
    auth.signOut();
  };
  const showData = async () => {
    try {
      const dataRef = doc(db, "profile", selectedProfileId);
      const docSnapshot = await getDoc(dataRef);
      {
        datas;
      }
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
  }, [selectedProfileId]);
  return (
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
          <Link to="/profile">
            <img
              src={image}
              alt="Profile"
              height={100}
              width={50}
              className=" object-cover rounded-lg"
            />
          </Link>
          <button onClick={logout}>
            <Link to="/login">Log out</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
