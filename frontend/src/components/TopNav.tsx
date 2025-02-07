// TopNav.tsx
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { LogIn, User } from "lucide-react";

const TopNav = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className="p-6 m-4 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 bg-gray-800 border border-gray-700 flex justify-between gap-3 items-center shadow-lg text-white">
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <NavLink to="/profile">
              {user.profileImage ? (
                <img
                  src={`http://192.168.0.105:4000/${user.profileImage}`}
                  loading="lazy"
                  className="size-14 h cursor-pointer rounded-full object-cover border-4 border-gray-500"
                  alt="Profile"
                />
              ) : (
                <div className="cursor-pointer size-14 flex items-center justify-center rounded-full bg-gray-700 border-4 border-gray-500">
                  <User className="text-gray-400 w-12 h-12" />
                </div>
              )}
            </NavLink>
            <NavLink
              to={`${user ? "new-notification" : "/login"}`}
              className="p-2 whitespace-nowrap bg-gray-700 rounded-md hover:bg-gray-600 transition duration-200"
            >
              ثبت اگهی
            </NavLink>
            <NavLink
              to=""
              className="p-2 whitespace-nowrap bg-gray-700 rounded-md hover:bg-gray-600 transition duration-200"
            >
              ثبت راننده
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className="flex items-center p-2 bg-gray-700 hover:bg-gray-600 rounded-md transition duration-200"
            >
              <LogIn className="w-6 h-6 text-white mr-2" />
              <span className="text-white">ورود</span>
            </NavLink>
            <NavLink
              to={`${user ? "new-notification" : "/login"}`}
              className="p-2 whitespace-nowrap bg-gray-700 hover:bg-gray-600 rounded-md transition duration-200"
            >
              ثبت اگهی
            </NavLink>
          </>
        )}
      </div>

      {/* Show SearchBar only on md and larger screens */}
      <div className="hidden md:block">
        <SearchBar />
      </div>

      <div className="text-white">
        <NavLink to="/">
          <Logo />
        </NavLink>
      </div>
    </div>
  );
};

export default TopNav;
