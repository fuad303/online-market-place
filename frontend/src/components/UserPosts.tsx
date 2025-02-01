import { useState } from "react";

import {
  useDeleteAPostMutation,
  useGetUserPostsQuery,
} from "../app/api/notificationsApi";
import LoadingState from "./LoadingState";
import { MapPin, Tag, Folder, Layers } from "lucide-react";
import { NavLink } from "react-router-dom";
import ImageModal from "./ImageModel";
const UserPosts = () => {
  const { data, isLoading, error, refetch } = useGetUserPostsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [deleteAPost, { isLoading: deleteLoading, error: deleteError }] =
    useDeleteAPostMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handlePostDelete = async (id: string) => {
    try {
      await deleteAPost(id).unwrap();
      refetch();
    } catch (error) {
      alert(error);
    }
  };

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  if (isLoading || deleteLoading) return <LoadingState />;

  if (error || deleteError)
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold text-red-600 mb-6">
          {(error as any)?.data?.message || "مشکلی پیش آمد"}
        </h1>
        <NavLink
          to="/new-notification"
          className="inline-block bg-[#324455] text-white px-6 py-3 rounded-md shadow-md hover:bg-[#3f5365] transition-colors duration-300"
        >
          ثبت اعلان جدید
        </NavLink>
      </div>
    );

  return (
    <div className="p-4 shadow-xl rounded-lg" dir="RTL">
      <h1 className="text-right font-sans font-bold text-2xl mb-6 border-b-2 pb-3 border-gray-300">
        پست‌های شما
      </h1>

      <div
        className={`grid gap-6 ${data?.length === 1 ? "items-center" : ""}`}
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        {data?.map((post) => (
          <div
            key={post._id}
            className={`bg-[#1b344e] p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between ${
              data?.length === 1 ? "max-w-sm" : ""
            }`}
          >
            {/* Post Title and Description */}
            <div>
              <h1 className="text-lg font-bold text-white mb-2 border-b pb-2 border-gray-600">
                {post.title}
              </h1>
              <p className="text-gray-300 text-sm mb-4">{post.description}</p>

              <div className="space-y-2">
                {/* Location */}
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="text-[#FFC107] w-5 h-5 shrink-0" />
                  <span className="text-gray-400">موقعیت:</span>
                  <span className="text-white">{post.location}</span>
                </div>
                {/* Price */}
                <div className="flex items-center gap-2 text-sm">
                  <Tag className="text-[#FFC107] w-5 h-5 shrink-0" />
                  <span className="text-gray-400">قیمت:</span>
                  <span className="text-white">
                    {post.price.toLocaleString()} افغانی
                  </span>
                </div>
                {/* Category */}
                <div className="flex items-center gap-2 text-sm">
                  <Folder className="text-[#FFC107] w-5 h-5 shrink-0" />
                  <span className="text-gray-400">دسته‌بندی:</span>
                  <span className="text-white">{post.category}</span>
                </div>
                {/* Subcategory (Optional) */}
                {post.subCategory && (
                  <div className="flex items-center gap-2 text-sm">
                    <Layers className="text-[#FFC107] w-5 h-5 shrink-0" />
                    <span className="text-gray-400">زیر دسته:</span>
                    <span className="text-white">{post.subCategory}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Images Section */}
            {post.images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-2">
                {post.images.map((image, index) => (
                  <img
                    key={index}
                    loading="lazy"
                    className="w-full h-24 rounded-md object-contain border border-gray-600 cursor-pointer"
                    src={`http://localhost:4000/${image}`}
                    alt={`Post image ${index}`}
                    onClick={() => openModal(`http://localhost:4000/${image}`)}
                  />
                ))}
              </div>
            )}

            {/* Buttons Section */}
            <div className="flex justify-start mt-4 gap-2">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                onClick={() => {
                  handlePostDelete(post._id);
                }}
              >
                حذف
              </button>
              <NavLink
                to="/edit-notification"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                ویرایش
              </NavLink>
            </div>
          </div>
        ))}
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageUrl={selectedImage}
      />
    </div>
  );
};

export default UserPosts;
