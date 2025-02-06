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
            <h1 className="text-2xl font-bold mb-8 text-center">ثبت اعلان</h1>
          )}

          {/* Category Selection */}
          <div className="mb-4 text-right">
            <label className="block font-medium text-lg mb-1">نوع کالا</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 grid-auto-rows[minmax(150px, auto)]">
              {[
                { value: "موبایل", label: "موبایل", icon: phone },
                { value: "لب تاپ", label: "لب تاپ", icon: laptop },
                { value: "موتر", label: "موتر", icon: car },
                { value: "موترسایکل", label: "موترسایکل", icon: motor },
                { value: "خانه", label: "خانه", icon: house },
                { value: "دکان", label: "دکان", icon: shop },
                { value: "دیگر", label: "دیگر", icon: null },
              ].map(({ value, label, icon }) => (
                <label
                  key={value}
                  className={`flex items-center p-3 space-x-4 cursor-pointer rounded-md border border-gray-300 transition-all duration-300 ease-in-out ${
                    category === value
                      ? "bg-[#0b1b2c] text-white"
                      : "bg-transparent hover:bg-[#0b1b2c] hover:text-white"
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
              <label className="block font-medium">
                نوع {category === "خانه" ? "خانه" : "دکان"}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["کرایه", "فروش", "گروی"].map((subItem) => (
                  <label
                    key={subItem}
                    className={`flex items-center p-3 space-x-4 cursor-pointer rounded-md border border-gray-300 transition-all duration-300 ease-in-out ${
                      watch("subCategory") === subItem
                        ? "bg-[#0b1b2c] text-white"
                        : "bg-transparent hover:bg-[#0b1b2c] hover:text-white"
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
                className="block font-medium text-lg mb-1"
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
              {...register("title", { required: "عنوان الزامی است" })}
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
              {...register("price", { required: "قیمت الزامی است" })}
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
              {...register("location", { required: "مکان الزامی است" })}
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

          {/* Images Input */}
          <div className="mb-4 text-right">
            <label htmlFor="images" className="block font-medium">
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
              className="w-full text-right border border-gray-300 bg-transparent rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-200"
              onChange={handelFileChange}
            />
            {errors.images && (
              <span className="text-red-500 text-sm">
                {errors.images.message}
              </span>
            )}
            <p className="text-sm mt-2 grid">
              {fileCount > 0 ? (
                <>
                  <span>تعداد تصاویر انتخاب‌شده: {fileCount}</span>
                </>
              ) : (
                <></>
              )}
            </p>

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
                      className="w-full h-52 object-contain rounded-md border"
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
            className="w-full bg-[#26394c] text-white py-2 px-4 rounded-md hover:bg-[#2c4257] transition duration-200"
          >
            ثبت
          </button>
        </form>
      </div>
    </>
  );
};

export default NotificationForm;
