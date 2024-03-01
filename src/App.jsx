import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Auth/Login/Login";
import Home from "./Components/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
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
