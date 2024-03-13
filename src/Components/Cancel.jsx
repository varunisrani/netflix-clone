import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import ClipLoader from "react-spinners/ClipLoader";
import { auth } from "./Auth/Login/firebase";

const Cancel = () => {
  const [user, loading] = useAuthState(auth);
  const [submitting] = useState(false);

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
        <div className="bg-[#141414] min-h-screen flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold mb-4 text-white">Cancel</h1>
          <Link
            to="/"
            className="bg-[#E50914] text-white px-4 py-2 rounded-md transition duration-300"
          >
            Go Home
          </Link>
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

export default Cancel;
