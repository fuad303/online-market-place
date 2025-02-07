import { useDispatch, useSelector } from "react-redux";
import { useUpdateMutation } from "../app/api/authApi";
import LoadingState from "../components/LoadingState";
import { setUser } from "../app/features/userSlice";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RootState } from "../app/store";
import { useEffect } from "react";

interface FormField {
  username: string;
  password: string;
}

const EditUser = () => {
  const { register, handleSubmit, reset } = useForm<FormField>();
  const user = useSelector((state: RootState) => state.user);
  const [update, { isLoading, error }] = useUpdateMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (formData: FormField) => {
    try {
      const id = user?._id;
      if (!id) {
        console.log("وارد اکانت خود بشید");
        return;
      }
      const updateUser = await update({ updatedInfo: formData, id }).unwrap();
      dispatch(setUser(updateUser));
      reset();
      navigate("/profile");
    } catch (error: any) {
      console.error("Failed to update");
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="sm:pt-0 md:pt-3 flex items-center justify-center ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 bg-gray-900 border border-gray-700 shadow-lg rounded-lg m-2 p-7 w-[25rem] text-white"
      >
        {error ? (
          <h1 className="text-2xl font-bold text-red-500 mb-6 text-center">
            {(error as any)?.data?.message || "مشکلی پیش آمد"}
          </h1>
        ) : (
          <h1 className="text-2xl font-bold  mb-6 text-center">ویرایش کاربر</h1>
        )}

        <div className="mb-4 text-right">
          <label
            htmlFor="username"
            className="block  font-medium text-gray-300"
          >
            نام کاربری جدید
          </label>
          <input
            {...register("username", {
              required: "Username is required",
            })}
            defaultValue={user?.username}
            type="username"
            id="username"
            className="w-full text-right border border-gray-600 bg-transparent  rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-right  font-medium text-gray-300"
          >
            رمز عبور جدید
          </label>
          <input
            {...register("password")}
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
          {isLoading ? "بارگیری" : "ویرایش"}
        </button>
      </form>
    </div>
  );
};

export default EditUser;
