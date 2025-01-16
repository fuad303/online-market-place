import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../app/api/authApi";
import LoadingState from "../components/LoadingState";
import { useDispatch } from "react-redux";
import { setUser } from "../app/features/userSlice";

interface FormField {
  username: string;
  email: string;
  password: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormField>();
  const [signup, { isLoading, error }] = useSignupMutation();
  const dispatch = useDispatch();
  const onSubmit = async (data: FormField) => {
    try {
      const res = await signup(data).unwrap();

      reset();
      console.log(res.message);
      dispatch(setUser(res.user));
      navigate("/");
    } catch (err: any) {
      console.error("Signup failed: ", err);
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
          <h1 className="text-2xl font-bold  mb-6 text-center">ثبت نام</h1>
        )}

        <div className="mb-4">
          <label htmlFor="username" className="block text-right font-medium">
            نام کاربری
          </label>
          <input
            {...register("username", {
              required: "نام کاریری ضروری هست",
            })}
            defaultValue="fuad"
            type="text"
            id="username"
            className="w-full border bg-transparent text-right border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-right font-medium">
            ایمیل
          </label>
          <input
            {...register("email", {
              required: "ایمیل ضروری هست",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: " ایمیل معتبر وارد کنید",
              },
            })}
            type="text"
            id="email"
            defaultValue="anwa@gmail.com"
            className="w-full border bg-transparent text-right border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-right font-medium">
            رمز عبور
          </label>
          <input
            {...register("password", {
              required: "رمز عبور ضروری هست",
              minLength: {
                value: 6,
                message: " حد اقل ۶ حرف انگلیسی باشد",
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[0-9])/,
                message:
                  "باید انگلیسی باشد و یک حرف بزرگ داشته باشد همراه یک عدد",
              },
            })}
            type="password"
            defaultValue="Fuad4688@@"
            id="password"
            className="w-full border bg-transparent text-right border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="w-full bg-[#26394c] text-white py-2 px-4 rounded-md hover:bg-[#2c4257] transition duration-200"
        >
          {isLoading ? "بارگیری..." : "ثبت نام"}
        </button>

        <p className="translate-y-3 text-right">
          حساب دارید؟
          <NavLink className={`text-blue-400 text-right`} to="/login">
            وارد شوید
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Signup;
