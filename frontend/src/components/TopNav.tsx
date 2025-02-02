import { Search } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import Logo from "./Logo";

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
                  className="size-14 h cursor-pointer rounded-full object-cover border-4 border-[#324455] "
                />
              ) : (
                <div className="cursor-pointer size-14 flex items-center justify-center rounded-full bg-gray-200 border-4 border-[#324455]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-500 w-12 h-12"
                  >
                    <circle cx="12" cy="7" r="4"></circle>
                    <path d="M5.5 20c0-3.59 2.91-6.5 6.5-6.5s6.5 2.91 6.5 6.5H5.5z"></path>
                  </svg>
                </div>
              )}
            </NavLink>
            {/*  */}
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
              className="flex items-center p-2 bg-[#324455]  hover:bg-[#3c5060]  rounded-md transition duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-white mr-2"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              <span className="text-white">ورود</span>
            </NavLink>
            <NavLink
              to={`${user ? "new-notification" : "/login"}`}
              className="p-2 whitespace-nowrap bg-[#324455]  hover:bg-[#3c5060] rounded-md"
            >
              ثبت اگهی
            </NavLink>
          </>
        )}
      </div>

      <div className="flex items-center justify-center w-full max-w-lg">
        <form className="flex items-center w-full bg-[#1b2b3c] rounded-full overflow-hidden border border-[#2c3f50] focus-within:ring-2 focus-within:ring-[#3c5060] transition-all duration-300">
          <input
            type="text"
            className="w-full p-2 pl-4 bg-transparent text-white placeholder-gray-400 text-right focus:outline-none"
            placeholder="...جستجو"
          />
          <button
            type="submit"
            className="p-2 bg-[#2c3f50] hover:bg-[#3c5060] rounded-r-full"
          >
            <Search className="text-white" />
          </button>
        </form>
      </div>
      <div className="text-white">
        <NavLink className="" to="/">
          <Logo />
        </NavLink>
      </div>
    </div>
  );
};

export default TopNav;
