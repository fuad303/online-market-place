import { AppDispatch } from "../app/store";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useState } from "react";
import car from "../components/svgs/car.svg";
import shop from "../components/svgs/shop.svg";
import { useNavigate } from "react-router-dom";
import phone from "../components/svgs/phone.svg";
import house from "../components/svgs/house.svg";
import motor from "../components/svgs/motor.svg";
import laptop from "../components/svgs/laptop.svg";
import LoadingState from "../components/LoadingState";
import imageCompression from "browser-image-compression";
import { useCreateNotificationMutation } from "../app/api/uploadApi";
import feedApi from "../app/api/feedApi";

interface NotificationField {
  title: string;
  description?: string;
  category: string;
  subCategory?: string;
  price: string;
  location: string;
  images: FileList;
}

const NotificationForm = () => {
  const navigate = useNavigate();
  const [fileCount, setFileCount] = useState<number>(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [otherCategories, setOtherCategories] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const [createNotification, { isLoading, error }] =
    useCreateNotificationMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<NotificationField>();

  const category = watch("category");

  async function handelFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) {
      if (files.length > 4) {
        alert("حداکثر چهار عکس");
        e.target.value = "";
        setFileCount(0);
        setSelectedFiles([]);
        return;
      }

      try {
        setIsCompressing(true);
        const compressedFiles: File[] = [];

        for (const file of Array.from(files)) {
          try {
            const options = {
              maxSizeMB: 2,
              maxWidthOrHeight: 720,
              useWebWorker: true,
            };
            const compressedFile = await imageCompression(file, options);
            compressedFiles.push(compressedFile);
          } catch (error) {
            console.error("Failed to compress", error);
            compressedFiles.push(file);
          }
        }

        setFileCount(compressedFiles.length);
        setSelectedFiles((pre) => {
          const updated = [...compressedFiles, ...pre];
          return updated.slice(0, 4);
        });
      } catch (error) {
        console.error("An error occurred while compressing files", error);
      } finally {
        setIsCompressing(false);
      }
    }
  }

  const onSubmit = async (data: NotificationField) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description || "");
      if (data.category === "دیگر") {
        data.category = otherCategories;
        data.subCategory = undefined;
      }
      formData.append("category", data.category);

      if (data.subCategory) {
        formData.append("subCategory", data.subCategory);
      }

      formData.append("price", data.price);
      formData.append("location", data.location);
      selectedFiles.forEach((file, index) => {
        const fileName = `notification_image${index + 1}.jpg`;
        formData.append("images", file, fileName);
      });

      await createNotification(formData).unwrap();
      reset();
      dispatch(feedApi.util.resetApiState());

      navigate("/");
    } catch (error) {
      console.error("failed to submit notification", error);
    }
  };

  if (isLoading) return <LoadingState />;
  if (error) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      <div
        dir="RTL"
        className="sm:pt-0 md:pt-3 flex items-center justify-center "
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 bg-gray-900 border border-gray-700 shadow-lg rounded-lg m-2 p-7 w-full sm:w-[25rem] lg:w-[40rem] xl:w-[45rem] text-white"
        >
          {error ? (
            <h1 className="text-2xl font-bold text-red-500 mb-8 text-center">
              {(error as any)?.data?.message || "مشکلی پیش آمد"}
            </h1>
          ) : (
            <h1 className="text-2xl font-bold mb-8 text-center">ثبت اعلان</h1>
          )}
          {/* Category Selection */}
          <div className="mb-4 text-right">
            <label className="block font-medium text-lg mb-1 text-gray-300">
              نوع کالا
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 grid-auto-rows[minmax(150px, auto)]">
              {[
                { value: "موبایل", label: "موبایل", icon: phone },
                { value: "لب تاپ", label: "لب تاپ", icon: laptop },
                { value: "موتر", label: "موتر", icon: car },
                { value: "موتور", label: "موتور", icon: motor },
                { value: "خانه", label: "خانه", icon: house },
                { value: "دکان", label: "دکان", icon: shop },
                { value: "دیگر", label: "دیگر", icon: null },
              ].map(({ value, label, icon }) => (
                <label
                  key={value}
                  className={`flex items-center p-3 space-x-4 cursor-pointer rounded-md border border-gray-600 transition-all duration-300 ease-in-out ${
                    category === value
                      ? "bg-gray-700 text-white"
                      : "bg-transparent hover:bg-gray-700 hover:text-white"
                  } w-full`}
                >
                  <input
                    type="radio"
                    value={value}
                    {...register("category", { required: true })}
                    className="hidden peer"
                  />
                  {icon && (
                    <img
                      className="sm:size-10 md:size-8 lg:size-10"
                      src={icon}
                      alt={`آیکون ${label}`}
                    />
                  )}
                  <h1 className="text-lg font-semibold">{label}</h1>
                </label>
              ))}
            </div>
            {errors.category && (
              <span className="text-red-500 text-sm">
                لطفاً نوع کالا را انتخاب کنید
              </span>
            )}
          </div>
          {/* Sub-category for House and Shop */}
          {(category === "خانه" || category === "دکان") && (
            <div className="mb-4 text-right">
              <label className="block font-medium text-gray-300">
                نوع {category === "خانه" ? "خانه" : "دکان"}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["کرایه", "فروش", "گروی"].map((subItem) => (
                  <label
                    key={subItem}
                    className={`flex items-center p-3 space-x-4 cursor-pointer rounded-md border border-gray-600 transition-all duration-300 ease-in-out ${
                      watch("subCategory") === subItem
                        ? "bg-gray-700 text-white"
                        : "bg-transparent hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    <input
                      type="radio"
                      value={subItem}
                      {...register("subCategory", { required: true })}
                      className="hidden peer"
                    />
                    <span>{subItem}</span>
                  </label>
                ))}
              </div>
              {errors.subCategory && (
                <span className="text-red-500 text-sm">
                  لطفاً نوع {category === "خانه" ? "خانه" : "دکان"} را انتخاب
                  کنید
                </span>
              )}
            </div>
          )}
          {/* Input for "Others" category */}
          {category === "دیگر" && (
            <div className="mb-4 text-right">
              <label
                htmlFor="otherCategory"
                className="block font-medium text-lg mb-1 text-gray-300"
              >
                نوع دیگر
              </label>
              <input
                type="text"
                id="otherCategory"
                placeholder="نوع کالا را وارد کنید"
                value={otherCategories}
                onChange={(e) => {
                  setOtherCategories(e.target.value);
                }}
                className="w-full text-right border border-gray-600 bg-transparent rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
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
            <label htmlFor="title" className="block font-medium text-gray-300">
              عنوان
            </label>
            <input
              {...register("title", { required: "عنوان الزامی است" })}
              type="text"
              id="title"
              className="w-full text-right border border-gray-600 bg-transparent rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            {errors.title && (
              <span className="text-red-500 text-sm">
                {errors.title.message}
              </span>
            )}
          </div>
          {/* Description Input */}
          <div className="mb-4 text-right">
            <label
              htmlFor="description"
              className="block font-medium text-gray-300"
            >
              توضیحات
            </label>
            <textarea
              {...register("description")}
              id="description"
              rows={4}
              className="w-full text-right border border-gray-600 bg-transparent rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-500 "
            />
          </div>
          {/* Price Input */}
          <div className="mb-4 text-right">
            <label htmlFor="price" className="block font-medium text-gray-300">
              قیمت
            </label>
            <input
              {...register("price", { required: "قیمت الزامی است" })}
              type="number"
              id="price"
              className="w-full text-right border border-gray-600 bg-transparent rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            {errors.price && (
              <span className="text-red-500 text-sm">
                {errors.price.message}
              </span>
            )}
          </div>
          {/* Location Input */}
          <div className="mb-4 text-right">
            <label
              htmlFor="location"
              className="block font-medium text-gray-300"
            >
              مکان
            </label>
            <input
              {...register("location", { required: "مکان الزامی است" })}
              type="text"
              id="location"
              className="w-full text-right border border-gray-600 bg-transparent rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            {errors.location && (
              <span className="text-red-500 text-sm">
                {errors.location.message}
              </span>
            )}
          </div>
          {/* Images Input */}
          <div className="mb-4 text-right">
            <label htmlFor="images" className="block font-medium text-gray-300">
              تصاویر(حد اکثر ۴ عکس)
            </label>
            <input
              {...register("images", {
                required: "حداقل یک عکس الزامی هست",
              })}
              type="file"
              id="images"
              multiple
              accept="image/*"
              className="w-full text-right border border-gray-600 bg-transparent rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
              onChange={handelFileChange}
            />
            {errors.images && (
              <span className="text-red-500 text-sm">
                {errors.images.message}
              </span>
            )}
            <p className="text-sm mt-2 grid text-gray-300">
              {fileCount > 0 ? (
                <>
                  <span>تعداد تصاویر انتخاب‌شده: {fileCount}</span>
                </>
              ) : (
                <></>
              )}
            </p>
            <h1 className="text-red-500">
              تصویر اول در کارت اعلان استفاده میشود
            </h1>{" "}
            {isCompressing && (
              <h1 className="text-red-500 font-bold text-xl">
                در حال فشرده‌سازی عکس ها ...
              </h1>
            )}
            {/* Render selected image previews */}
            {selectedFiles.length > 0 && (
              <div className="mt-4 grid md:grid-cols-2 gap-4">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      loading="lazy"
                      src={URL.createObjectURL(file)}
                      alt={`تصویر انتخاب شده ${index + 1}`}
                      className="w-full h-52 object-contain rounded-md border border-gray-600"
                    />
                    <span className="absolute top-1 right-1 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                      {1 + index}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            disabled={isCompressing}
            type="submit"
            className="w-full bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-200"
          >
            ثبت
          </button>
        </form>
      </div>
    </>
  );
};

export default NotificationForm;
