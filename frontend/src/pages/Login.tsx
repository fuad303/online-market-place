import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../app/api/authApi";
import LoadingState from "../components/LoadingState";
import { useDispatch } from "react-redux";
import { setUser } from "../app/features/userSlice";

interface FormField {
  username: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();
  const { register, handleSubmit, reset } = useForm<FormField>();
  const dispatch = useDispatch();

  const onSubmit = async (data: FormField) => {
    try {
      const res = await login(data).unwrap();

      dispatch(setUser(res.user));
      reset();
      navigate("/");
    } catch (err: any) {
      console.error("Failed to login");
    }
  };
  if (isLoading) {
    return <LoadingState />;
  }
  return (
    <div className="sm:pt-0 md:pt-3 flex items-center justify-center ">
      <form
        className="bg-transparent border-[0.5px] border-gray-200 shadow-lg rounded-lg m-2 p-7 w-[25rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        {error ? (
          <h1 className="text-2xl font-bold text-red-600 mb-6 text-center">
            {(error as any)?.data?.message || "مشکلی پیش آمد"}
          </h1>
        ) : (
          <h1 className="text-2xl font-bold  mb-6 text-center">ورود</h1>
        )}

        <div className="mb-4 text-right">
          <label htmlFor="username" className="block  font-medium">
            نام کاربری
          </label>
          <input
            {...register("username", {
              required: "Username is required",
            })}
            defaultValue="fuad"
            type="username"
            id="username"
            className="w-full text-right border border-gray-200 bg-transparent  rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-right  font-medium">
            رمز عبور
          </label>
          <input
            {...register("password", {
              required: "Password is required",
            })}
            defaultValue="Fuad4688@@"
            type="password"
            id="password"
            className="w-full bg-transparent text-right border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="w-full bg-[#26394c] text-white py-2 px-4 rounded-md hover:bg-[#2c4257] transition duration-200"
        >
          {isLoading ? "بارگیری..." : "ورود"}
        </button>

        <p className="translate-y-3 text-right">
          حساب ندارید؟
          <NavLink className={`text-blue-400 text-right`} to="/signup">
            ثبت نام{" "}
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Login;
