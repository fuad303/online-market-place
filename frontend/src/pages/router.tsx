import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout";
import Home from "./Home";
import Signup from "./Signup";
import About from "./About";
import Signout from "./Signout";
import Profile from "./Profile";
import Login from "./Login";
import Auth from "./AuthLayout";
import NewNotification from "./NewNotification";
import EditUser from "./EditUser";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/profile", element: <Profile /> },
      { path: "/new-notification", element: <NewNotification /> },
      { path: "edit-profile", element: <EditUser /> },
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
