import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "./Auth/Login/firebase";
import { useSpring } from "react-spring";
import { useUserProfile } from "./UserProfileProvider";
import { useAuthState } from "react-firebase-hooks/auth";
import ClipLoader from "react-spinners/ClipLoader";

const Profilesection = () => {
  const [datas, setDatas] = useState([]);
  const [user, loading] = useAuthState(auth);
  const [submitting] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [profileid, setSelectedProfileId] = useState(null);
  const [currentUserUid, setCurrentUserUid] = useState(null);
  const [show, setShow] = useState(false);
  // eslint-disable-next-line no-unused-vars
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
          uid: data.uid,
        });
      });

      setDatas(profileData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    showData();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUserUid(user.uid);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const userProfile = useUserProfile();
  const { setSelectedProfile } = userProfile || {};

  const handleProfileClick = (profileId) => {
    if (setSelectedProfile) {
      setSelectedProfile(profileId);
    }
  };

  const handleUpdateClick = (profileId) => {
    setShow(true);
    setSelectedProfileId(profileId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#141414]">
        <ClipLoader
          color="red"
          loading={loading || submitting}
          size={120}
          aria-label="Loading Spinner"
          className="ml-10"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div>
      {user ? (
        <div className="flex flex-col h-screen justify-center items-center bg-[#141414] p-4">
          <h1 className="text-4xl mb-4 font-medium text-white phone:mt-5">
            Who's watching?
          </h1>
          <div className="flex flex-wrap justify-center gap-4">
            {datas.map(
              (data) =>
                currentUserUid === data.uid && (
                  <div
                    key={data.id}
                    className="flex flex-col items-center mt-5"
                  >
                    <div onClick={() => handleProfileClick(data.id)}>
                      <Link to="/home">
                        <img
                          src={data.image}
                          alt={`Profile - ${data.pname}`}
                          className="w-40 h-40 object-cover rounded-lg"
                        />
                      </Link>
                    </div>
                    <h1 className="font-medium mt-2 text-white/50">
                      {data.pname}
                    </h1>
                    {show && (
                      <Link to={`/manageprof/${data.id}`}>
                        <button
                          className="text-red-700"
                          onClick={() => handleUpdateClick(data.id)}
                        >
                          Update
                        </button>
                      </Link>
                    )}
                  </div>
                )
            )}
          </div>
          <button
            className="bg-[#E50914] p-4 mt-10 text-white font-medium"
            onClick={() => setShow(!show)}
          >
            Manage Profile
          </button>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center font-bold text-5xl h-screen bg-[#141414] text-[#E50914]">
          Please Login to Access this Page
          <button className="text-xl bg-[#E50914] text-white w-20 mt-10 p-4 flex justify-center items-center rounded-full">
            <Link to="/login">Login</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Profilesection;
