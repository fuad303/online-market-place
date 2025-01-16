import { motion } from "framer-motion";
import { ChevronDown, Home, User, Settings } from "lucide-react"; // Importing icons from lucide-react
import { useState } from "react";

const BottomNav = () => {
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  return (
    <div className="mr-[50px] ml-[50px] mt-[-20px] p-8 bg-[#0c243e] rounded-xl flex justify-between relative">
      <div className="relative">
        <button className="flex items-center" onClick={() => toggleDropdown(1)}>
          <Home className="mr-1" />
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
            className="absolute left-0 mt-2 w-40 bg-[#0e2338]  rounded-lg shadow-lg z-10"
          >
            <ul className="p-2">
              <li className="hover:bg-[#213447] p-2 rounded">Sub Item 1</li>
              <li className="hover:bg-[#213447] p-2 rounded">Sub Item 2</li>
              <li className="hover:bg-[#213447] p-2 rounded">Sub Item 3</li>
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
              <li className="hover:bg-[#213447] p-2 rounded">Sub Item 1</li>
              <li className="hover:bg-[#213447] p-2 rounded">Sub Item 2</li>
              <li className="hover:bg-[#213447] p-2 rounded">Sub Item 3</li>
            </ul>
          </motion.div>
        )}
      </div>

      <div className="relative">
        <button className="flex items-center" onClick={() => toggleDropdown(3)}>
          <Settings className="mr-1" />
          تنظیمات
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
            <ul className="p-2">
              <li className="hover:bg-[#213447] p-2 rounded">Sub Item 1</li>
              <li className="hover:bg-[#213447] p-2 rounded">Sub Item 2</li>
              <li className="hover:bg-[#213447] p-2 rounded">Sub Item 3</li>
            </ul>
          </motion.div>
        )}
      </div>

      {/* Other buttons */}
      <button>رستورانت</button>
      <button>املاک</button>
      <button>املاک</button>
      <button>املاک</button>
    </div>
  );
};

export default BottomNav;
