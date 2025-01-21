import { useForm } from "react-hook-form";
import car from "../components/svgs/car.svg";
import shop from "../components/svgs/shop.svg";
import house from "../components/svgs/house.svg";
import phone from "../components/svgs/phone.svg";
import laptop from "../components/svgs/laptop.svg";
import motor from "../components/svgs/motor.svg";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface NotificationField {
  title: string;
  description?: string;
  category: string;
  subCategory?: string;
  price: string;
  location: string;
  images: FileList;
  otherCategory?: string;
}

const NotificationForm = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const [fileCount, setFileCount] = useState<number>(0);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NotificationField>();
  const category = watch("category");
  const otherCategory = watch("otherCategory");

  const onSubmit = (data: NotificationField) => {
    // If the user selected "Others", use the "otherCategory" value as the
    if (category === "others" && otherCategory) {
      data.category = otherCategory;
    }
    console.log(data);

    // Handle form submission logic here
  };

  function handelFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) {
      if (files.length > 4) {
        alert("حداکثر چهار عکس");
        e.target.value = "";
        setFileCount(0);
      } else {
        setFileCount(files.length);
      }
    }
  }

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
            <h1 className="text-2xl font-bold mb-6 text-right">ثبت اعلان</h1>

            {/* Category Selection */}
            <div className="mb-4 text-right">
              <label className="block font-medium text-lg mb-1">نوع کالا</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 grid-auto-rows[minmax(150px, auto)]">
                {[
                  { value: "phone", label: "موبایل", icon: phone },
                  { value: "laptop", label: "لپ تاپ", icon: laptop },
                  { value: "car", label: "موتر", icon: car },
                  { value: "motorcycle", label: "موترسایکل", icon: motor },
                  { value: "house", label: "خانه", icon: house },
                  { value: "shop", label: "دکان", icon: shop },
                  { value: "others", label: "دیگر", icon: null },
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
                        alt={`${label} icon`}
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
            {(category === "house" || category === "shop") && (
              <div className="mb-4 text-right">
                <label className="block font-medium">
                  نوع {category === "house" ? "خانه" : "دکان"}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["rent", "sell", "mortgage"].map((subItem) => (
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
                      <span>
                        {subItem === "rent"
                          ? "کرایه"
                          : subItem === "sell"
                          ? "فروش"
                          : "گروی"}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.subCategory && (
                  <span className="text-red-500 text-sm">
                    لطفاً نوع {category === "house" ? "خانه" : "دکان"} را انتخاب
                    کنید
                  </span>
                )}
              </div>
            )}

            {/* Input for "Others" category */}
            {category === "others" && (
              <div className="mb-4 text-right">
                <label
                  htmlFor="otherCategory"
                  className="block font-medium text-lg mb-1"
                >
                  نوع دیگر
                </label>
                <input
                  {...register("otherCategory", {
                    required: "لطفاً نوع دیگر را وارد کنید",
                  })}
                  type="text"
                  id="otherCategory"
                  placeholder="نوع کالا را وارد کنید"
                  className="w-full text-right border border-gray-300 bg-transparent rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
                {errors.otherCategory && (
                  <span className="text-red-500 text-sm">
                    {errors.otherCategory.message}
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
                {...register("images")}
                type="file"
                id="images"
                multiple
                accept="image/*"
                className="w-full text-right border border-gray-300 bg-transparent rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-200"
                onChange={handelFileChange}
              />
              <p className="text-sm mt-2">
                {fileCount > 0 ? `تعداد تصاویر انتخاب‌شده: ${fileCount}` : ""}
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-[#26394c] text-white py-2 px-4 rounded-md hover:bg-[#2c4257] transition duration-200"
            >
              ارسال
            </button>
          </form>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default NotificationForm;
