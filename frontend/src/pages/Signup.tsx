import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../app/api/authApi";
import LoadingState from "../components/LoadingState";
import { useDispatch } from "react-redux";
import { setUser } from "../app/features/userSlice";
import feedApi from "../app/api/feedApi";

interface FormField {
  username: string;
  phone: number;
  email: string;
  password: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormField>();

  const [signup, { isLoading, error }] = useSignupMutation();

  const onSubmit = async (data: FormField) => {
    try {
      const res = await signup(data).unwrap();
      reset();
      dispatch(setUser(res));
      dispatch(feedApi.util.resetApiState());

      navigate("/");
    } catch (err: any) {
      console.error("Signup failed: ", err);
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
          <h1 className="text-2xl font-bold mb-6 text-center">ثبت نام</h1>
        )}

        {/* Username */}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-right font-medium text-gray-300"
          >
            نام کاربری
          </label>
          <input
            {...register("username", { required: "نام کاربری ضروری هست" })}
            type="text"
            id="username"
            defaultValue="fuad"
            className="w-full border border-gray-600 bg-transparent text-right rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-right font-medium text-gray-300"
          >
            شماره تماس
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center px-3 text-gray-500 text-sm pointer-events-none">
              +93
            </span>
            <input
              {...register("phone", {
                required: "شماره تماس ضروری هست",
                pattern: {
                  value: /^7[0-9]{8}$/,
                  message: "شماره تماس معتبر نیست",
                },
              })}
              type="text"
              defaultValue="790864688"
              id="phone"
              placeholder="701234567"
              className="w-full pl-12 border border-gray-600 bg-transparent text-right rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-right font-medium text-gray-300"
          >
            ایمیل
          </label>
          <input
            {...register("email", {
              required: "ایمیل ضروری هست",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "ایمیل معتبر وارد کنید",
              },
            })}
            type="text"
            id="email"
            defaultValue="anwa@gmail.com"
            className="w-full border border-gray-600 bg-transparent text-right rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-right font-medium text-gray-300"
          >
            رمز عبور
          </label>
          <input
            {...register("password", {
              required: "رمز عبور ضروری هست",
              minLength: { value: 4, message: "حداقل 4  مشخصه باشد" },
            })}
            type="password"
            id="password"
            defaultValue="Fuad4688@@"
            className="w-full border border-gray-600 bg-transparent text-right rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          disabled={isLoading}
          type="submit"
          className="w-full bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-200"
        >
          {isLoading ? "بارگیری..." : "ثبت نام"}
        </button>

        {/* Login Link */}
        <p className="translate-y-3 text-right text-gray-300">
          حساب دارید؟
          <NavLink className="text-blue-400 text-right" to="/login">
            وارد شوید
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Signup;
