import { motion } from "framer-motion";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../app/store";
import Logo from "./Logo";

const SideBar = ({
  isOpen,
  closeSidebar,
}: {
  isOpen: boolean;
  closeSidebar: () => void;
}) => {
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);
  const user = useSelector((state: RootState) => state.user);

  const toggleSubMenu = (index: number) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        ></div>
      )}

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 right-0 w-72 h-full bg-[#1b2b3c] text-white shadow-lg z-50 overflow-y-auto"
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          <NavLink onClick={closeSidebar} to="/" className="text-lg font-bold">
            <Logo />
          </NavLink>
          <button
            onClick={closeSidebar}
            className="text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* User Section */}
        <div className="p-4 border-b border-gray-700 flex items-center space-x-4">
          <NavLink
            onClick={closeSidebar}
            to={`${user ? "/profile" : "/login"}`}
            className="flex items-center space-x-2 hover:text-gray-300"
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
            <span className="text-sm font-medium">
              {user ? "پروفایل من" : "ورود / ثبت نام"}
            </span>
          </NavLink>
        </div>

        {/* Menu Items */}
        <ul className="p-4 text-right space-y-4">
          {Array.from({ length: 20 }, (_, index) => (
            <li key={index}>
              <div
                className="flex justify-between items-center hover:bg-[#2c3f50] p-3 rounded cursor-pointer"
                onClick={() => toggleSubMenu(index)}
              >
                <span>مورد {index + 1}</span>
                {openSubMenu === index ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </div>
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: openSubMenu === index ? 1 : 0,
                  height: openSubMenu === index ? "auto" : 0,
                }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="pl-6 text-right space-y-2 overflow-hidden"
              >
                <li className="hover:bg-[#324455] p-2 rounded">زیر مورد 1</li>
                <li className="hover:bg-[#324455] p-2 rounded">زیر مورد 2</li>
                <li className="hover:bg-[#324455] p-2 rounded">زیر مورد 3</li>
              </motion.ul>
            </li>
          ))}
        </ul>
      </motion.div>
    </>
  );
};

export default SideBar;
