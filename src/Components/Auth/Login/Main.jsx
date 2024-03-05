import { Link } from "react-router-dom";
import { GoogleAuthProvider } from "@firebase/auth";
import { auth } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const Main = () => {
  const [user] = useAuthState(auth);

  const google = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const user = await signInWithPopup(auth, provider);
      console.log(user);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="relative flex flex-col">
      {!user ? (
        <>
          <img
            src="https://imagetolink.com/ib/aH6IlwGzmN.png"
            alt="aH6IlwGzmN"
            className="w-full"
          />
          <div className="absolute top-0 left-0 mt-5 ml-5">
            <img
              src="https://imagetolink.com/ib/Pl1RjQA1A3.png"
              alt="Pl1RjQA1A3"
              height={100}
              width={100}
              className="relative z-10"
            />
          </div>
          <div className="absolute top-0 right-0 mt-5 mr-5"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mb-5 phone:hidden">
            <div
              id="centered-text"
              className="flex flex-row gap-2 items-center text-white text-4xl font-bold mb-3 phone:hidden"
            >
              <span>Unlimited</span>
              <span>movies,</span>
              <span>TV</span>
              <span>shows</span>
              <span>and</span>
              <span>more</span>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mt-10 ">
            <div
              id="centered-text"
              className="flex flex-row gap-2 items-center text-xl text-white phone:hidden"
            >
              <span>Watch</span>
              <span>anywhere.</span>
              <span>Cancel</span>
              <span>anytime</span>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mt-20">
            <div
              id="centered-text"
              className="flex flex-row gap-1 items-center text-xl text-white font-medium mt-20 phone:hidden"
            >
              <span>Ready</span>
              <span>to</span>
              <span>watch?</span>
              <span>Enter</span>
              <span>your</span>
              <span>email</span>
              <span>to</span>
              <span>create</span>
              <span>or</span>
              <span>restart</span>
              <span>your</span>
              <span>membership.</span>
            </div>
            <div className="flex flex- mt-5 justify-center items-center ">
              <button
                className="p-4  w-100 bg-[#E50914] text-white font-bold text-2xl phone:p-3"
                onClick={google}
              >
                Get Started
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center font-bold text-5xl inset-0 absolute">
          Please Login to Access this page
          <button className="text-xl bg-[#E50914] text-white w-20 p-4 flex justify-center  items-center rounded-full">
            <Link to="/login">Login</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Main;
