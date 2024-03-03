import { Link } from "react-router-dom";
import Main from "./Main";
import Part1 from "./Part1";
import Part2 from "./Part2";
import Part3 from "./Part3";
import Part4 from "./Part4";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Login = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="grid bg-black">
      {!user ? (
        <>
          <Main />
          <Part1 />
          <Part2 />
          <Part3 />
          <Part4 />
          <div className="flex flex-row mt-5 justify-center items-center mb-20">
            <input
              className="p-4 w-1/2 border border-black"
              placeholder="Email address"
            />
            <button className="p-4 ml-2 w-100 bg-[#E50914] text-white font-bold text-2xl">
              Get Started
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center font-bold text-5xl inset-0 absolute">
          Please Login to Access this Page
          <button className="text-xl bg-[#E50914] text-white w-20 p-4 flex justify-center items-center rounded-full">
            <Link to="/">Home</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
