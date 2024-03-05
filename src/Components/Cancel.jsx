import { Link } from "react-router-dom"; // Assuming you are using React Router for navigation

const Cancel = () => {
  return (
    <div className="bg-[#141414] min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-4 text-white">Cancel</h1>
      <Link
        to="/"
        className="bg-[#E50914] text-white px-4 py-2 rounded-md transition duration-300 "
      >
        Go Home
      </Link>
    </div>
  );
};

export default Cancel;
