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
    <div className="p-6 m-4 rounded-xl bg-[#0e2338] flex justify-between gap-3 items-center shadow-lg">
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <NavLink to="/profile">
              {user.profileImage ? (
                <img
                  src={`http://192.168.0.105:4000/${user.profileImage}`}
                  loading="lazy"
                  className="size-14 h cursor-pointer rounded-full object-cover border-4 border-[#324455]"
                  alt="Profile"
                />
              ) : (
                <div className="cursor-pointer size-14 flex items-center justify-center rounded-full bg-gray-200 border-4 border-[#324455]">
                  <User className="text-gray-500 w-12 h-12" />
                </div>
              )}
            </NavLink>
            <NavLink
              to={`${user ? "new-notification" : "/login"}`}
              className="p-2 whitespace-nowrap bg-[#324455] rounded-md hover:bg-[#3c5165]"
            >
              ثبت اگهی
            </NavLink>
            <NavLink
              to=""
              className="p-2 whitespace-nowrap bg-[#324455] rounded-md hover:bg-[#3c5165]"
            >
              ثبت راننده
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className="flex items-center p-2 bg-[#324455] hover:bg-[#3c5060] rounded-md transition duration-200"
            >
              <LogIn className="w-6 h-6 text-white mr-2" />
              <span className="text-white">ورود</span>
            </NavLink>
            <NavLink
              to={`${user ? "new-notification" : "/login"}`}
              className="p-2 whitespace-nowrap bg-[#324455] hover:bg-[#3c5165] rounded-md"
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
