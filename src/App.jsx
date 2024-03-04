import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Auth/Login/Login";
import Home from "./Components/Home";
import Tvlist from "./Components/Tvlist";
import Movie from "./Components/Movie";
import Mainmovie from "./Components/Mainmovie";
import Maintv from "./Components/Maintv";

import Search from "./Components/Search";
import Mainsearch from "./Components/MainSearch";
import Profileedit from "./Components/Profileedit";
import Profilesection from "./Components/Profilesection";
import ManagePro from "./Components/ManagePro";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Profilesection />,
  },
  {
    path: "/home",
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
    path: "/search",
    element: <Search />,
  },
  {
    path: "/mainsearch/:_id",
    element: <Mainsearch />,
  },
  {
    path: "/padd",
    element: <Profileedit />,
  },
  {
    path: "/profile",
    element: <Profilesection />,
  },
  {
    path: "/manageprof/:_id",
    element: <ManagePro />,
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
