import Home from "./Home";
import About from "./About";
import Login from "./Login";
import NotFound from "./404";
import Signup from "./Signup";
import Profile from "./Profile";
import Auth from "./AuthLayout";
import EditUser from "./EditUser";
import MainLayout from "./MainLayout";
import NewNotification from "./NewNotification";
import EditNotification from "./EditNotification";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "*", element: <NotFound /> },
      { path: "/about", element: <About /> },
      { path: "/profile", element: <Profile /> },
      { path: "/edit-profile", element: <EditUser /> },
      { path: "/new-notification", element: <NewNotification /> },
      { path: "/edit-notification", element: <EditNotification /> },
    ],
  },
  {
    element: <Auth />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
]);
