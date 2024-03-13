import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom"; // Import Link from React Router
import { auth } from "./Auth/Login/firebase";

const Success = () => {
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
        <div className="flex items-center justify-center h-screen bg-[#141414] text-white">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Payment Successful!</h1>
            <p className="text-lg mb-8 mt-10">
              Thank you for choosing our service.
            </p>
            <p className="text-lg mt-8">
              Enjoy unlimited streaming on Netflix Clone.
            </p>
          </div>
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

export default Success;
