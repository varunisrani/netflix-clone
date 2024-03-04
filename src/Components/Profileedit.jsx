import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "./Auth/Login/firebase";
import { auth } from "./Auth/Login/firebase";
import { nanoid } from "@reduxjs/toolkit";

const Profileedit = () => {
  const [pname, setPname] = useState("");
  const [pass, setPass] = useState("");
  const [image, setImage] = useState("");

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
    } catch (error) {
      console.error("Error creating profile:", error);
      // Handle error as needed
    }
  };

  return (
    <div className="flex flex-col mt-10 justify-center items-center gap-8">
      <input
        type="text"
        placeholder="Profile Name"
        value={pname}
        onChange={(e) => setPname(e.target.value)}
        className="p-4 w-100 border-4 border-black"
      />
      <input
        type="password"
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
  );
};

export default Profileedit;
