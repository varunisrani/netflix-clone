import Main from "./Main";
import Part1 from "./Part1";
import Part2 from "./Part2";
import Part3 from "./Part3";
import Part4 from "./Part4";
const Login = () => {
  return (
    <div className="grid bg-black">
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
    </div>
  );
};

export default Login;
