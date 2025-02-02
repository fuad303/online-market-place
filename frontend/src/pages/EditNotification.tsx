import { RootState } from "../app/store";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingState from "../components/LoadingState";
import { useGetUserPostsQuery } from "../app/api/notificationsApi";

interface NotificationField {
  title: string;
  description?: string;
  category: string;
  subCategory?: string;
  price: string;
  location: string;
}

const EdiNotification = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const [otherCategories, setOtherCategories] = useState<string>("");
  const { data, error } = useGetUserPostsQuery();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<NotificationField>();

  const category = watch("category");

  const onSubmit = async (data: NotificationField) => {
    try {
      reset();
      navigate("/profile");
    } catch (error) {
      console.error("failed to submit notification", error);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      {user ? (
        <div
          className="sm:pt-0 md:pt-3 flex items-center justify-center"
          dir="rtl"
        >
          <form
            className="bg-transparent border-[0.5px] flex-2 border-gray-200 shadow-lg rounded-lg m-2 p-7 w-full sm:w-[25rem] lg:w-[40rem] xl:w-[45rem]"
            onSubmit={handleSubmit(onSubmit)}
          >
            {error ? (
              <h1 className="text-2xl font-bold text-red-600 mb-8 text-center">
                {(error as any)?.data?.message || "مشکلی پیش آمد"}
              </h1>
            ) : (
              <h1 className="text-2xl font-bold mb-8 text-center">
                ویرایش اعلان
              </h1>
            )}

            {/* Input for "Category" category */}
            {category === "دیگر" && (
              <div className="mb-4 text-right">
                <label
                  htmlFor="otherCategory"
                  className="block font-medium text-lg mb-1"
                >
                  نوع کالا
                </label>
                <input
                  type="text"
                  id="otherCategory"
                  placeholder="نوع کالا را وارد کنید"
                  value={otherCategories}
                  onChange={(e) => {
                    setOtherCategories(e.target.value);
                  }}
                  className="w-full text-right border border-gray-300 bg-transparent rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
                {errors.category && (
                  <span className="text-red-500 text-sm">
                    {errors.category.message}
                  </span>
                )}
              </div>
            )}

            {/* Title Input */}
            <div className="mb-4 text-right">
              <label htmlFor="title" className="block font-medium">
                عنوان
              </label>
              <input
                {...register("title")}
                type="text"
                id="title"
                className="w-full text-right border border-gray-300 bg-transparent rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              {errors.title && (
                <span className="text-red-500 text-sm">
                  {errors.title.message}
                </span>
              )}
            </div>

            {/* Description Input */}
            <div className="mb-4 text-right">
              <label htmlFor="description" className="block font-medium">
                توضیحات
              </label>
              <textarea
                {...register("description")}
                id="description"
                rows={4}
                className="w-full text-right border border-gray-300 bg-transparent rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-200 "
              />
            </div>

            {/* Price Input */}
            <div className="mb-4 text-right">
              <label htmlFor="price" className="block font-medium">
                قیمت
              </label>
              <input
                {...register("price")}
                type="number"
                id="price"
                className="w-full text-right border border-gray-300 bg-transparent rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              {errors.price && (
                <span className="text-red-500 text-sm">
                  {errors.price.message}
                </span>
              )}
            </div>

            {/* Location Input */}
            <div className="mb-4 text-right">
              <label htmlFor="location" className="block font-medium">
                مکان
              </label>
              <input
                {...register("location")}
                type="text"
                id="location"
                className="w-full text-right border border-gray-300 bg-transparent rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              {errors.location && (
                <span className="text-red-500 text-sm">
                  {errors.location.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#26394c] text-white py-2 px-4 rounded-md hover:bg-[#2c4257] transition duration-200"
            >
              ویرایش
            </button>
          </form>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default EdiNotification;
