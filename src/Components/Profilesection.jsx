import { useSpring, animated } from "react-spring";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./Auth/Login/firebase";

const Profilesection = () => {
  const [datas, setDatas] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState(null); // Track the selected profile ID
  const fadeAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
  });

  const showData = async () => {
    try {
      const dataRef = collection(db, "profile");
      const querySnapshot = await getDocs(dataRef);

      const profileData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        profileData.push({
          id: doc.id,
          pname: data.pname,
          image: data.image,
        });
      });

      setDatas(profileData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    showData();
  }, []);

  // Function to handle "Update" button click
  const handleUpdateClick = (profileId) => {
    setShow(true);
    setSelectedProfileId(profileId);
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-[#141414]">
      <h1 className="text-4xl mb-4 font-medium text-white">Whos watching?</h1>
      <div className="flex flex-row justify-center items-center gap-8">
        <animated.div
          style={fadeAnimation}
          className="flex flex-row gap-8 justify-center items-center"
        >
          {datas.map((data) => (
            <div
              key={data.id}
              className="flex flex-col items-center justify-center mt-5"
            >
              <Link to={`/home/${data.id}`}>
                <img
                  src={data.image}
                  alt={`Profile - ${data.pname}`}
                  className="w-40 h-40 object-cover rounded-lg"
                />
              </Link>
              <h1 className="font-medium mt-2 text-white/50">{data.pname}</h1>
              {show && (
                // Conditional rendering of the "Update" button
                <Link to={`/manageprof/${data.id}`}>
                  <div
                    className="text-red-600"
                    onClick={() => handleUpdateClick(selectedProfileId)}
                  >
                    Update
                  </div>
                </Link>
              )}
            </div>
          ))}
        </animated.div>
        <button className="text-5xl font-bold text-white">
          <Link to="/padd">Add</Link>
        </button>
      </div>
      <button className="bg-white p-4 mt-20" onClick={() => setShow(!show)}>
        Manage Profile
      </button>
    </div>
  );
};

export default Profilesection;
