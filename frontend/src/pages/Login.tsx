import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../app/api/authApi";
import LoadingState from "../components/LoadingState";
import { useDispatch } from "react-redux";
import { setUser } from "../app/features/userSlice";
import feedApi from "../app/api/feedApi";

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

      dispatch(setUser(res));
      reset();
      dispatch(feedApi.util.resetApiState());

      navigate("/");
    } catch (err: any) {
      console.error("Failed to login", error);
    }
  };
  if (isLoading) {
    return <LoadingState />;
  }
  return (
    <div className="sm:pt-0 md:pt-3 flex items-center justify-center">
      <form
        className="bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 bg-gray-900 border border-gray-700 shadow-lg rounded-lg m-2 p-7 w-[25rem] text-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        {error ? (
          <h1 className="text-2xl font-bold text-red-500 mb-6 text-center">
            {(error as any)?.data?.message || "مشکلی پیش آمد"}
          </h1>
        ) : (
          <h1 className="text-2xl font-bold mb-6 text-center">ورود</h1>
        )}

        <div className="mb-4 text-right">
          <label htmlFor="username" className="block font-medium text-gray-300">
            نام کاربری
          </label>
          <input
            {...register("username", {
              required: "Username is required",
            })}
            defaultValue="fuad"
            type="username"
            id="username"
            className="w-full text-right border border-gray-600 bg-transparent rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-right font-medium text-gray-300"
          >
            رمز عبور
          </label>
          <input
            {...register("password", {
              required: "Password is required",
            })}
            defaultValue="Fuad4688@@"
            type="password"
            id="password"
            className="w-full bg-transparent text-right border border-gray-600 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="w-full bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-200"
        >
          {isLoading ? "بارگیری..." : "ورود"}
        </button>

        <p className="translate-y-3 text-right text-gray-300">
          حساب ندارید؟
          <NavLink className="text-blue-400 text-right" to="/signup">
            ثبت نام{" "}
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Login;
