import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db, auth } from "./Auth/Login/firebase";
import { nanoid } from "@reduxjs/toolkit";
import { useAuthState } from "react-firebase-hooks/auth";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";

const Profileedit = () => {
  const [pname, setPname] = useState("");
  const [pass, setPass] = useState("");
  const [image, setImage] = useState("");
  const [user, loading] = useAuthState(auth);
  const [submitting] = useState(false);
  const addData = async () => {
    try {
      // Assuming you have a way to get the user ID (uid), replace 'YOUR_UID' with the actual user ID.
      const { uid } = auth.currentUser;

      const id = nanoid(); // Invoke nanoid to generate a unique ID

      await addDoc(collection(db, "profile"), {
        id: id,
        pname: pname,
        pass: pass,
        image: image,
        uid: uid,
      });

      alert("Profile created");
      setPname("");
      setPass("");
      setImage("");
    } catch (error) {
      console.error("Error creating profile:", error);
      // Handle error as needed
    }
  };
  if (loading) {
    return (
      <>
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
      </>
    );
  }
  return (
    <>
      {user ? (
        <div className="flex flex-col mt-10 justify-center items-center gap-8">
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
          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="p-4 w-100 border-4 border-black"
          />
          <button
            className="bg-blue-700 text-white w-20 p-4 rounded-full"
            onClick={addData}
          >
            Submit
          </button>

          <h1>{pname}</h1>
          <h1>{pass}</h1>
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

export default Profileedit;
