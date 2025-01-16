import { motion } from "framer-motion";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import SideBar from "./SideBar";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import Logo from "./Logo";

const SmallScreenNav = () => {
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const [inputOpen, setInputOpen] = useState(false);

  return (
    <div className={`relative ${toggleSideBar ? "overflow-hidden" : ""}`}>
      {/* Sidebar */}
      {inputOpen ? (
        <motion.form
          initial={{ y: -6, opacity: 0 }}
          animate={{ y: 6, opacity: 1 }}
          className="md:hidden p-2 flex items-center bg-[#1b2b3c] rounded-full border border-[#2c3f50] focus-within:ring-2 focus-within:ring-[#3c5060]"
        >
          <input
            type="text"
            className="flex-grow p-2 pl-4 bg-transparent text-white placeholder-gray-400 text-right focus:outline-none"
            placeholder="...جستجو"
          />
          <button
            onClick={() => setInputOpen(false)}
            type="button"
            className="p-2 bg-red-500 text-white rounded-r-full"
          >
            <X />
          </button>
        </motion.form>
      ) : (
        <>
          <SideBar
            isOpen={toggleSideBar}
            closeSidebar={() => setToggleSideBar(false)}
          />

          <div
            className={`${
              toggleSideBar ? "pointer-events-none" : ""
            } h-full w-full`}
          >
            <nav className="bg-[#0e2338] p-4 m-3 rounded-xl flex justify-between gap-3 items-center relative z-10">
              {/* Left Icon */}
              <div className="flex items-center space-x-3">
                {user ? (
                  <>
                    <NavLink
                      to="/profile"
                      className="p-1 rounded-full hover:bg-[#3c5060]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-500 w-8 h-8"
                      >
                        <circle cx="12" cy="7" r="4"></circle>
                        <path d="M5.5 20c0-3.59 2.91-6.5 6.5-6.5s6.5 2.91 6.5 6.5H5.5z"></path>
                      </svg>
                    </NavLink>
                    <NavLink
                      to="new-notification"
                      className="p-2 whitespace-nowrap bg-[#324455] rounded-md hover:bg-[#3c5165]"
                    >
                      ثبت اگهی
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink className="sm:hidden" to="/">
                      <Logo />
                    </NavLink>
                    <NavLink
                      to="/login"
                      className="flex items-center p-2 bg-[#324455] rounded-md hover:bg-[#3c5165] transition duration-200 mr-1"
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
                      className="p-2 whitespace-nowrap bg-[#324455] rounded-md hover:bg-[#3c5165]"
                    >
                      ثبت اگهی
                    </NavLink>
                  </>
                )}
              </div>

              {/* Search Form */}
              <div className="flex items-center">
                {/* Desktop Search Form */}
                <form className="hidden md:flex items-center w-full max-w-md bg-[#1b2b3c] rounded-full overflow-hidden border border-[#2c3f50] focus-within:ring-2 focus-within:ring-[#3c5060]">
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

                {/* Mobile Search Button */}
                <button
                  onClick={() => setInputOpen(true)}
                  className={`md:hidden p-2 bg-[#1b2b3c] rounded-md hover:bg-[#2c3f50] transition duration-200`}
                >
                  <Search />
                </button>
              </div>

              {/* Menu Button */}
              <motion.button
                onClick={() => setToggleSideBar(!toggleSideBar)}
                whileTap={{ rotate: 180 }}
                className="p-2 bg-[#1b2b3c] text-white rounded-md hover:bg-[#2c3f50] transition duration-200"
              >
                <Menu />
              </motion.button>
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default SmallScreenNav;
