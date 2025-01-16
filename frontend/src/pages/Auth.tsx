import { ArrowLeft, Key } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <>
      <NavLink to="/" className="translate-x-4 translate-y-3">
        <ArrowLeft />
      </NavLink>
      <div className=" p-4 m-4  rounded-lg max-w-lg mx-auto">
        {/* Header */}
        <div className="flex justify-center gap-4 p-4 items-center">
          {/* Login Button */}
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#1b2b3c] text-white rounded-lg hover:bg-[#3c5060] transition duration-200 ${
                isActive ? "border-2 border-gray-300 shadow-md" : ""
              }`
            }
          >
            <Key size={18} color="#ffffff" strokeWidth={2.5} />
            <span>ورود</span>
          </NavLink>

          {/* Signup Button */}
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#1b2b3c] text-white rounded-lg hover:bg-[#3c5060] transition duration-200 ${
                isActive ? "border-2 border-gray-300 shadow-md" : ""
              }`
            }
          >
            <Key size={18} color="#ffffff" strokeWidth={2.5} />
            <span>ثبت نام</span>
          </NavLink>
        </div>

        {/* Main Content */}
        <main className="bg-[#1b2b3c] text-white p-6 rounded-lg shadow-inner">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Auth;
