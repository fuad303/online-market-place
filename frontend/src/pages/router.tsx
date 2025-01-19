import { createBrowserRouter } from "react-router-dom";
import NewNotification from "./NewNotification";
import MainLayout from "./MainLayout";
import EditUser from "./EditUser";
import Profile from "./Profile";
import Auth from "./AuthLayout";
import Signup from "./Signup";
import NotFound from "./404";
import Login from "./Login";
import About from "./About";
import Home from "./Home";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/profile", element: <Profile /> },
      { path: "/new-notification", element: <NewNotification /> },
      { path: "/edit-profile", element: <EditUser /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    element: <Auth />,
    children: [
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);
