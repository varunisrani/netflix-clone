import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "./Navbar";
import { auth } from "./Auth/Login/firebase";
import { Link } from "react-router-dom";

const Account = () => {
  const [user] = useAuthState(auth);

  return (
    <>
      <div className="bg-[#141414] h-screen">
        <Navbar />
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-white text-5xl font-medium">Account</h1>
          <h1 className="uppercase text-white/35 mt-5">Account details</h1>
          <h1 className="text-white mt-5">Email : {user?.email}</h1>{" "}
          {/* Add null check */}
          <h1 className="text-white mt-3">Name : {user?.displayName}</h1>{" "}
          <h1 className="uppercase text-white/35 mt-5">Billings & Plans</h1>
          {/* Add null check */}
          <button className="text-white mt-10 p-4 bg-red-600 font-medium">
            <Link to="/change">Change Plan</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Account;
