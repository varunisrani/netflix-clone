import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Auth/Login/Login";
import Home from "./Components/Home";
import Tvlist from "./Components/Tvlist";
import Movie from "./Components/Movie";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/tv",
    element: <Tvlist />,
  },
  {
    path: "/movie",
    element: <Movie />,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
