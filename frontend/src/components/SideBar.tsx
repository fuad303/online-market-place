import { motion } from "framer-motion";
import {
  X,
  ChevronDown,
  ChevronUp,
  User2,
  CarFront,
  HousePlus,
  CircuitBoard,
  BadgeInfo,
} from "lucide-react";
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

  const subItemStyles =
    "hover:bg-gray-700 text-white p-2 rounded-md transition-colors duration-200 block";

  return (
    <div>
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
        className="fixed top-0 right-0 w-72 h-full bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 bg-gray-800 border border-gray-700 text-white shadow-lg z-50 overflow-y-auto"
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
        <div
          dir="RTL"
          className="p-4 border-b border-gray-700 flex items-center space-x-4 w-full"
        >
          <NavLink
            onClick={closeSidebar}
            to={`${user ? "/profile" : "/login"}`}
            className="flex items-center space-x-2 hover:text-gray-300"
          >
            <User2 />
            <span className="text-sm font-medium">
              {user ? "پروفایل من" : "ورود / ثبت نام"}
            </span>
          </NavLink>
        </div>

        {/* Menu Items */}
        <ul dir="RTL" className="p-4 text-right space-y-4">
          {/* Properties*/}
          <li>
            <div
              className="flex justify-between items-center hover:bg-gray-700 p-3 rounded cursor-pointer"
              onClick={() => toggleSubMenu(0)}
            >
              <div className="flex gap-1">
                <HousePlus className="mr-1 text-cyan-400" />

                <span>املاک</span>
              </div>
              {openSubMenu === 0 ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </div>
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: openSubMenu === 0 ? 1 : 0,
                height: openSubMenu === 0 ? "auto" : 0,
              }}
              transition={{ duration: 0.3 }}
              className="pl-6 text-right space-y-2 overflow-hidden"
            >
              <ul className="p-2 grid">
                <NavLink
                  onClick={closeSidebar}
                  to={`/search?query=${encodeURIComponent("خانه")}`}
                  className={subItemStyles}
                >
                  خانه
                </NavLink>
                <NavLink
                  onClick={closeSidebar}
                  to={`/search?query=${encodeURIComponent("دکان")}`}
                  className={subItemStyles}
                >
                  دکان
                </NavLink>
                <NavLink
                  onClick={closeSidebar}
                  to={`/search?query=${encodeURIComponent("باغ")}`}
                  className={subItemStyles}
                >
                  باغ
                </NavLink>
                <NavLink
                  onClick={closeSidebar}
                  to={`/search?query=${encodeURIComponent("زمین")}`}
                  className={subItemStyles}
                >
                  زمین
                </NavLink>
              </ul>
            </motion.ul>
          </li>

          {/* Vehicles */}
          <li>
            <div
              className="flex justify-between items-center hover:bg-gray-700 p-3 rounded cursor-pointer"
              onClick={() => toggleSubMenu(1)}
            >
              <div className="flex gap-1">
                <CarFront className="mr-1 text-lime-400" />

                <span>وسایط نقلیه</span>
              </div>
              {openSubMenu === 1 ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </div>
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: openSubMenu === 1 ? 1 : 0,
                height: openSubMenu === 1 ? "auto" : 0,
              }}
              transition={{ duration: 0.3 }}
              className="pl-6 text-right space-y-2 overflow-hidden"
            >
              <ul className="p-2 grid">
                <NavLink
                  onClick={closeSidebar}
                  to={`/search?query=${encodeURIComponent("موتر")}`}
                  className={subItemStyles}
                >
                  موتر
                </NavLink>
                <NavLink
                  onClick={closeSidebar}
                  to={`/search?query=${encodeURIComponent("موتور")}`}
                  className={subItemStyles}
                >
                  موتور
                </NavLink>
                <NavLink
                  onClick={closeSidebar}
                  to={`/search?query=${encodeURIComponent("سه چرخ")}`}
                  className={subItemStyles}
                >
                  سه چرخ
                </NavLink>
                <NavLink
                  onClick={closeSidebar}
                  to={`/search?query=${encodeURIComponent("بایسکل")}`}
                  className={subItemStyles}
                >
                  بایسکل
                </NavLink>
              </ul>
            </motion.ul>
          </li>

          {/* Gadgets */}
          <li>
            <div
              className="flex justify-between items-center hover:bg-gray-700 p-3 rounded cursor-pointer"
              onClick={() => toggleSubMenu(2)}
            >
              <div className="flex gap-1">
                <div className="flex gap-1">
                  <CircuitBoard className="mr-1 text-fuchsia-400" />

                  <span>لوازم دیجیتالی</span>
                </div>
              </div>
              {openSubMenu === 2 ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </div>
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: openSubMenu === 2 ? 1 : 0,
                height: openSubMenu === 2 ? "auto" : 0,
              }}
              transition={{ duration: 0.3 }}
              className="pl-6 text-right space-y-2 overflow-hidden"
            >
              <ul className="p-2 grid">
                <NavLink
                  onClick={closeSidebar}
                  to={`/search?query=${encodeURIComponent("مبایل")}`}
                  className={subItemStyles}
                >
                  مبایل
                </NavLink>
                <NavLink
                  onClick={closeSidebar}
                  to={`/search?query=${encodeURIComponent("تبلیت")}`}
                  className={subItemStyles}
                >
                  تبلیت
                </NavLink>
                <NavLink
                  onClick={closeSidebar}
                  to={`/search?query=${encodeURIComponent("لب تاپ")}`}
                  className={subItemStyles}
                >
                  لب تاپ
                </NavLink>
              </ul>
            </motion.ul>
          </li>

          {/* Services */}
          <li>
            <div
              className="flex justify-between items-center hover:bg-gray-700 p-3 rounded cursor-pointer"
              onClick={() => toggleSubMenu(3)}
            >
              <div className="flex gap-1">
                <div className="flex gap-1">
                  <BadgeInfo className="mr-1 text-orange-400" />

                  <span>خدمات</span>
                </div>
              </div>
              {openSubMenu === 3 ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </div>
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: openSubMenu === 3 ? 1 : 0,
                height: openSubMenu === 3 ? "auto" : 0,
              }}
              transition={{ duration: 0.3 }}
              className="pl-6 text-right space-y-2 overflow-hidden"
            >
              <ul className="p-2 grid">
                <button className={subItemStyles}>خدمت۱</button>
                <button className={subItemStyles}>خدمت۲</button>
                <button className={subItemStyles}>خدمت۳</button>
                <button className={subItemStyles}>خدمت۴</button>
              </ul>
            </motion.ul>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

export default SideBar;
