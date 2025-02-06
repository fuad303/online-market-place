import Home from "./Home";
import Login from "./Login";
import NotFound from "./404";
import Signup from "./Signup";
import Profile from "./Profile";
import Auth from "./AuthLayout";
import EditUser from "./EditUser";
import MainLayout from "./MainLayout";
import NewNotification from "./NewNotification";
import { createBrowserRouter } from "react-router-dom";
import Post from "./Post";
import SearchResult from "./SearchResult";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "*", element: <NotFound /> },
      { path: "/post/:id", element: <Post /> },
      { path: "/profile", element: <Profile /> },
      { path: "/edit-profile", element: <EditUser /> },
      { path: "/search", element: <SearchResult /> },
      { path: "/new-notification", element: <NewNotification /> },
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
