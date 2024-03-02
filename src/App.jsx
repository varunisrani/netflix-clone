import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Auth/Login/Login";
import Home from "./Components/Home";
import Tvlist from "./Components/Tvlist";
import Movie from "./Components/Movie";
import Mainmovie from "./Components/Mainmovie";
import Maintv from "./Components/Maintv";
import Login1 from "./Components/Auth/Login/Login1";

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
  {
    path: "/mainmovie/:mid",
    element: <Mainmovie />,
  },
  {
    path: "/maintv/:tid",
    element: <Maintv />,
  },
  {
    path: "/signin/:sid",
    element: <Login1 />,
  },
  {
    path: "/playvideo/:mid",
    element: <Login1 />,
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
