import { motion } from "framer-motion";
import { ChevronDown, ShoppingCart } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

const BottomNav = () => {
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (index: number) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const subItemStyles = "hover:bg-[#213447] p-2 rounded";

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      dir="RTL"
      ref={navRef}
      className="mr-[50px] ml-[50px] mt-[-20px] p-8 bg-[#0c243e] rounded-xl flex justify-between relative"
    >
      {/* Properties */}
      <div className="relative">
        <button className="flex items-center" onClick={() => toggleDropdown(1)}>
          <ShoppingCart className="mr-1" />
          املاک
          <motion.div
            initial={false}
            animate={{ rotate: dropdownOpen === 1 ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="ml-1"
          >
            <ChevronDown />
          </motion.div>
        </button>
        {dropdownOpen === 1 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 w-40 bg-[#0e2338] rounded-lg shadow-lg z-10"
          >
            <ul className="p-2 grid">
              <NavLink
                to={`/search?query=${encodeURIComponent("خانه")}`}
                className={`${subItemStyles}`}
              >
                خانه
              </NavLink>
              <NavLink
                to={`/search?query=${encodeURIComponent("دکان")}`}
                className={`${subItemStyles}`}
              >
                دکان
              </NavLink>
              <NavLink
                to={`/search?query=${encodeURIComponent("باغ")}`}
                className={`${subItemStyles}`}
              >
                باغ
              </NavLink>
              <NavLink
                to={`/search?query=${encodeURIComponent("زمین")}`}
                className={`${subItemStyles}`}
              >
                زمین
              </NavLink>
            </ul>
          </motion.div>
        )}
      </div>

      {/* Vehicles */}
      <div className="relative">
        <button className="flex items-center" onClick={() => toggleDropdown(2)}>
          <ShoppingCart className="mr-1" />
          وسایط نقلیه
          <motion.div
            initial={false}
            animate={{ rotate: dropdownOpen === 2 ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="ml-1"
          >
            <ChevronDown />
          </motion.div>
        </button>
        {dropdownOpen === 2 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 w-40 bg-[#0e2338] rounded-lg shadow-lg z-10"
          >
            <ul className="p-2 grid">
              <NavLink
                to={`/search?query=${encodeURIComponent("موتر")}`}
                className={`${subItemStyles}`}
              >
                موتر
              </NavLink>
              <NavLink
                to={`/search?query=${encodeURIComponent("موتور")}`}
                className={`${subItemStyles}`}
              >
                موتور
              </NavLink>
              <NavLink
                to={`/search?query=${encodeURIComponent("سه چرخ")}`}
                className={`${subItemStyles}`}
              >
                سه چرخ
              </NavLink>
              <NavLink
                to={`/search?query=${encodeURIComponent("بایسکل")}`}
                className={`${subItemStyles}`}
              >
                بایسکل
              </NavLink>
            </ul>
          </motion.div>
        )}
      </div>

      {/* Gadgets */}
      <div className="relative">
        <button className="flex items-center" onClick={() => toggleDropdown(3)}>
          <ShoppingCart className="mr-1" />
          لوازم دیجیتال
          <motion.div
            initial={false}
            animate={{ rotate: dropdownOpen === 3 ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="ml-1"
          >
            <ChevronDown />
          </motion.div>
        </button>
        {dropdownOpen === 3 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 w-40 bg-[#0e2338] rounded-lg shadow-lg z-10"
          >
            <ul className="p-2 grid">
              <NavLink
                to={`/search?query=${encodeURIComponent("مبایل")}`}
                className={`${subItemStyles}`}
              >
                مبایل
              </NavLink>
              <NavLink
                to={`/search?query=${encodeURIComponent("تبلیت")}`}
                className={`${subItemStyles}`}
              >
                تبلیت
              </NavLink>
              <NavLink
                to={`/search?query=${encodeURIComponent("لب تاپ")}`}
                className={`${subItemStyles}`}
              >
                لب تاپ
              </NavLink>
            </ul>
          </motion.div>
        )}
      </div>

      {/* Services */}
      <div className="relative">
        <button className="flex items-center" onClick={() => toggleDropdown(4)}>
          <ShoppingCart className="mr-1" />
          خدمات
          <motion.div
            initial={false}
            animate={{ rotate: dropdownOpen === 4 ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="ml-1"
          >
            <ChevronDown />
          </motion.div>
        </button>
        {dropdownOpen === 4 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 w-40 bg-[#0e2338] rounded-lg shadow-lg z-10"
          >
            <ul className="p-2 grid">
              <button className={subItemStyles}>خدمت۱</button>
              <button className={subItemStyles}>خدمت۲</button>
              <button className={subItemStyles}>خدمت۳</button>
              <button className={subItemStyles}>خدمت۴</button>
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BottomNav;
