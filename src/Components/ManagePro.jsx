import { useEffect, useState } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./Auth/Login/firebase";
import { Link, useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import ClipLoader from "react-spinners/ClipLoader";

const ManagePro = () => {
  const { _id } = useParams();
  const [pname, setPname] = useState("");
  const [pass, setPass] = useState("");
  const [image, setImage] = useState("");
  const [datas, setDatas] = useState([]);
  const [user, loading] = useAuthState(auth);
  const [submitting] = useState(false);
  console.log(datas);

  const updateData = async () => {
    try {
      const profileRef = doc(db, "profile", _id);
      const profileSnapshot = await getDoc(profileRef);

      if (profileSnapshot.exists()) {
        await updateDoc(profileRef, {
          pname: pname,
          pass: pass,
          image: image,
        });

        alert("Profile updated");
        setPname("");
        setPass("");
        setImage("");
      } else {
        alert("Profile not found for the specified ID");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
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

        setPname(data.pname);
        setPass(data.pass);
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
    <>
      {user ? (
        <div className="flex flex-col mt-10 justify-center items-center gap-8 bg-[#141414] h-screen">
          <Link to="/profile">
            <button className="border-4 border-[#E50914] text-white font-medium w-20 p-2 ml-10 mt-10 rounded-lg hover:bg-[#E50914] absolute left-0 top-0 ">
              Back
            </button>
          </Link>
          <input
            type="text"
            placeholder="Profile Name"
            value={pname}
            onChange={(e) => setPname(e.target.value)}
            className="p-4 w-100 border-4 border-black"
          />
          <input
            type="text"
            placeholder="Image link"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="p-4 w-100 border-4 border-black"
          />
          <button
            className="border-4 border-[#E50914] flex justify-center hover:bg-[#E50914] items-center text-white w-20 p-4 rounded-full"
            onClick={updateData}
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center font-bold text-5xl inset-0 absolute">
          Please Login to Access this Page
          <button className="text-xl bg-[#E50914] text-white w-20 p-4 flex justify-center items-center rounded-full">
            <Link to="/login">Login</Link>
          </button>
        </div>
      )}
    </>
  );
};

export default ManagePro;
