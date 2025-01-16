import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout";
import Home from "./Home";
import Signup from "./Signup";
import About from "./About";
import Signout from "./Signout";
import Profile from "./Profile";
import Login from "./Login";
import Auth from "./Auth";
import NewNotification from "./NewNotification";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/profile", element: <Profile /> },
      { path: "/new-notification", element: <NewNotification /> },
    ],
  },
  {
    element: <Auth />,
    children: [
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
      { path: "/signout", element: <Signout /> },
    ],
  },
]);
