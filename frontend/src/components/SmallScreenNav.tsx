// SmallScreenNav.tsx
import { motion } from "framer-motion";
import { LogIn, Menu, Search, User } from "lucide-react";
import { useState } from "react";
import SideBar from "./SideBar";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

const SmallScreenNav = () => {
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const [inputOpen, setInputOpen] = useState(false);

  return (
    <div className={`relative ${toggleSideBar ? "overflow-hidden" : ""}`}>
      {inputOpen ? (
        <motion.div
          initial={{ y: -6, opacity: 0 }}
          animate={{ y: 6, opacity: 1 }}
          className="p-2"
        >
          {/* Render SearchBar with onClose prop */}
          <SearchBar onClose={() => setInputOpen(false)} />
        </motion.div>
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
            <nav className="bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 bg-gray-800 border border-gray-700 p-4 m-3 rounded-xl flex justify-between gap-3 items-center relative z-10 text-white">
              {/* Left Section */}
              <div className="flex items-center space-x-3">
                {user ? (
                  <>
                    <NavLink to="/" className="p-1 rounded-full">
                      <Logo />
                    </NavLink>
                    <NavLink className="sm:hidden md:block" to="/profile">
                      {user.profileImage ? (
                        <img
                          src={`http://192.168.0.105:4000/${user.profileImage}`}
                          loading="lazy"
                          className="size-14 h cursor-pointer rounded-full object-cover border-4 border-gray-500"
                          alt="Profile"
                        />
                      ) : (
                        <User className="text-gray-400 w-12 h-12" />
                      )}
                    </NavLink>
                    <NavLink
                      to="new-notification"
                      className="p-2 whitespace-nowrap bg-gray-700 rounded-md hover:bg-gray-600 transition duration-200"
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
                      className="flex items-center p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition duration-200 mr-1"
                    >
                      <LogIn className="w-6 h-6 text-white mr-2" />
                      <span className="text-white">ورود</span>
                    </NavLink>
                    <NavLink
                      to={user ? "new-notification" : "/login"}
                      className="p-2 whitespace-nowrap bg-gray-700 rounded-md hover:bg-gray-600 transition duration-200"
                    >
                      ثبت اگهی
                    </NavLink>
                  </>
                )}
              </div>

              {/* Search and Menu Section */}
              <div className="flex items-center">
                {/* On small screens, show a button to open the search input */}
                <button
                  onClick={() => setInputOpen(true)}
                  className="p-2 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-200"
                >
                  <Search className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Menu Button */}
              <motion.button
                onClick={() => setToggleSideBar(!toggleSideBar)}
                whileTap={{ rotate: 180 }}
                className="p-2 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-200"
              >
                <Menu className="w-6 h-6" />
              </motion.button>
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default SmallScreenNav;
