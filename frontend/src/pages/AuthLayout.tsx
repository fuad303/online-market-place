import { Key } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import BackButton from "../components/BackButtone";

const Auth = () => {
  return (
    <>
      <NavLink to="/" className="">
        <BackButton />
      </NavLink>

      <div className="p-4 m-4 rounded-lg max-w-lg mx-auto">
        <div className="flex justify-center gap-4 p-4 items-center">
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

        <main className="bg-[#1b2b3c] text-white p-6 rounded-lg shadow-inner">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Auth;
