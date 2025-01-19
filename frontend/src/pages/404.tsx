import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="sm:pt-0 md:pt-3 flex items-center justify-center ">
      <div className="bg-transparent border-[0.5px] border-gray-200 shadow-lg rounded-lg m-2 p-7 w-[25rem] text-right">
        <h1 className="text-6xl font-extrabold text-gray-300 mb-6 text-center">
          404
        </h1>
        <p className="text-xl text-gray-600 mb-4 text-right">
          !این صفحه وجود ندادرد
        </p>
        <p className="text-gray-500 text-right mb-6">
          .ممکن هست آدرس را اشتباه اماده باشید
        </p>
        <NavLink
          to="/"
          className="w-full bg-[#26394c] text-white py-2 px-4 rounded-md block text-center hover:bg-[#2c4257] transition duration-200"
        >
          بازگشت به صفحه اصلی
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
