import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Import Helmet components
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
import { UserProfileProvider } from "./Components/UserProfileProvider";
import Success from "./Components/Success";
import Cancel from "./Components/Cancel";
import Checkout from "./Components/Checkout";
import Videom from "./Components/Videom";
import { Provider } from "react-redux";
import store from "./Components/redux/store";
import RazorpayComponent from "./Components/RazorpayComponent";
import Account from "./Components/Account";
import Changeplan from "./Components/Changeplan";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Profilesection />,
  },
  {
    path: "/Home",
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
  {
    path: "/success",
    element: <Success />,
  },
  {
    path: "/cancel",
    element: <Cancel />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/video/:_id",
    element: <Videom />,
  },
  {
    path: "/razor",
    element: <RazorpayComponent />,
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/change",
    element: <Changeplan />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <UserProfileProvider>
        <RouterProvider router={router} />
      </UserProfileProvider>
    </Provider>
  );
}

export default App;
