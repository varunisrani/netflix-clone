import { useEffect, useState } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "./Auth/Login/firebase";
import { useParams } from "react-router-dom";

const ManagePro = () => {
  const { _id } = useParams();
  const [pname, setPname] = useState("");
  const [pass, setPass] = useState("");
  const [image, setImage] = useState("");
  const [datas, setDatas] = useState([]);

  const updateData = async () => {
    try {
      const profileRef = doc(db, "profile", _id);
      const profileSnapshot = await getDoc(profileRef);

      if (profileSnapshot.exists()) {
        // Update the existing profile with the specified ID
        await updateDoc(profileRef, {
          pname: pname,
          pass: pass,
          image: image,
        });

        alert("Profile updated");
        setPname("");
        setPass("");
        setImage(""); // Clear the image state as well
      } else {
        // If the profile with the specified ID does not exist, you may want to handle this case
        alert("Profile not found for the specified ID");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle error as needed
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
        // Set the state for editing
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
        type="text"
        placeholder="Image link"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="p-4 w-100 border-4 border-black"
      />
      <button
        className="bg-blue-700 text-white w-20 p-4 rounded-full"
        onClick={updateData}
      >
        Submit
      </button>

      {/* Displaying the data from the Firestore document */}
      {datas.map((data) => (
        <div key={data.id}>
          <h1>{data.pname}</h1>
          <h1>{data.image}</h1>
        </div>
      ))}
    </div>
  );
};

export default ManagePro;
