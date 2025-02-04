import { motion } from "framer-motion";
import { ChevronDown, ShoppingCart, User } from "lucide-react";
import { useState } from "react";

const BottomNav = () => {
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const subItemStyles = "hover:bg-[#213447] p-2 rounded";

  return (
    <div className="mr-[50px] ml-[50px] mt-[-20px] p-8 bg-[#0c243e] rounded-xl flex justify-between relative">
      <div className="relative">
        <button className="flex items-center" onClick={() => toggleDropdown(1)}>
          <ShoppingCart className="mr-1" />
          اجناس
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
            className="absolute left-0 mt-2 w-40 bg-[#0e2338]  rounded-lg shadow-lg z-10"
          >
            <ul className="p-2 grid overflow-y-scroll h-52">
              <button className={`${subItemStyles}`}>مبایل </button>
              <button className={`${subItemStyles}`}>تبلیت </button>
              <button className={`${subItemStyles}`}>لب تاپ</button>
              <button className={`${subItemStyles}`}>موتر</button>
              <button className={`${subItemStyles}`}>موتور سیکلت </button>
              <button className={`${subItemStyles}`}>خانه </button>
              <button className={`${subItemStyles}`}>دکان </button>
            </ul>
          </motion.div>
        )}
      </div>

      <div className="relative">
        <button className="flex items-center" onClick={() => toggleDropdown(2)}>
          <User className="mr-1" />
          پیک
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
            <ul className="p-2">
              <li className={`${subItemStyles}`}>Sub Item 1</li>
              <li className={`${subItemStyles}`}>Sub Item 2</li>
              <li className={`${subItemStyles}`}>Sub Item 3</li>
            </ul>
          </motion.div>
        )}
      </div>

      {/* Other buttons */}
      <button>رستورانت</button>
    </div>
  );
};

export default BottomNav;
