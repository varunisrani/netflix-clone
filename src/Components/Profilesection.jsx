import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "./Auth/Login/firebase";
import { useSpring, animated } from "react-spring";
import { useUserProfile } from "./UserProfileProvider";
import { useAuthState } from "react-firebase-hooks/auth";
const Profilesection = () => {
  const [datas, setDatas] = useState([]);
  const [profileid, setSelectedProfileId] = useState(null); // Track the selected profile ID
  const [currentUserUid, setCurrentUserUid] = useState(null);
  const [show, setShow] = useState(false);
  const fadeAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
  });
const [user] = useAuthState(auth)
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

  const { setSelectedProfile } = useUserProfile();

  const handleProfileClick = (profileId) => {
    setSelectedProfile(profileId);
  };
  const handleUpdateClick = (profileId) => {
    setShow(true);
    setSelectedProfileId(profileId);
    // Show the update button only if the current user's UID does not match the UID associated with the profile
    const isCurrentUserProfile =
      currentUserUid === datas.find((data) => data.id === profileId)?.uid;

    if (!isCurrentUserProfile) {
      setShow(true);
      setSelectedProfileId(profileId);
    }
  };

  return (
{user (
    <div className="flex flex-col h-screen justify-center items-center bg-[#141414]">
      <h1 className="text-4xl mb-4 font-medium text-white">Whos watching?</h1>
      <div className="flex flex-row justify-center items-center gap-8">
        <div className="flex flex-row justify-center items-center gap-8">
          <animated.div
            style={fadeAnimation}
            className="flex flex-row gap-8 justify-center items-center"
          >
            {datas.map(
              (data) =>
                currentUserUid === data.uid && (
                  <div
                    key={data.id}
                    className="flex flex-col items-center justify-center mt-5"
                  >
                    <div onClick={() => handleProfileClick(data.id)}>
                      {console.log(setSelectedProfile)}
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
                          className="text-red-600"
                          onClick={() => handleUpdateClick(data.id)}
                        >
                          Update
                        </button>
                      </Link>
                    )}
                  </div>
                )
            )}
          </animated.div>
        </div>
        <button className="text-5xl font-bold text-white">
          <Link to="/padd">Add</Link>
        </button>
      </div>
      <button className="bg-white p-4 mt-20" onClick={() => setShow(!show)}>
        Manage Profile
      </button>
    </div>):(<div className="flex flex-col justify-center items-center font-bold text-5xl inset-0 absolute">
          Please Login to Access this Page
          <button className="text-xl bg-[#E50914] text-white w-20 p-4 flex justify-center items-center rounded-full">
            <Link to="/">Home</Link>
          </button>
        </div>);
  );
};

export default Profilesection;
