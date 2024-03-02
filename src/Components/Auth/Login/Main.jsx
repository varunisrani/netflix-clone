import { useState } from "react";
import { Link } from "react-router-dom";

const Main = () => {
  const [input, setInput] = useState("");
  return (
    <div className="relative flex flex-col">
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
      <div className="absolute top-0 right-0 mt-5 mr-5">
        <button className="w-20 h-10 bg-[#E50914] text-white font-medium rounded-md">
          Sign in
        </button>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mb-5">
        <div
          id="centered-text"
          className="flex flex-row gap-2 items-center text-white text-4xl font-bold mb-3"
        >
          <span>Unlimited</span>
          <span>movies,</span>
          <span>TV</span>
          <span>shows</span>
          <span>and</span>
          <span>more</span>
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mt-10">
        <div
          id="centered-text"
          className="flex flex-row gap-2 items-center text-xl text-white"
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
          className="flex flex-row gap-1 items-center text-xl text-white font-medium mt-20"
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
        <div className="flex flex-row mt-5 justify-center items-center">
          <input
            className="p-4 w-full border border-black"
            placeholder="Email address"
            onChange={(e) => setInput(e.target.value)}
          />
          <Link to={`/signin/${input}`} className="block w-full h-full">
            <button className="p-4  w-100 bg-[#E50914] text-white font-bold text-2xl">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Main;
