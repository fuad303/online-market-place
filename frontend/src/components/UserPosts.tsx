import { useState } from "react";
import Modal from "react-modal";
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

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setSelectedImage("");
  };

  // --- Post Modal State (new) ---
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const openPostModal = (post: any) => {
    setSelectedPost(post);
    setIsPostModalOpen(true);
  };

  const closePostModal = () => {
    setIsPostModalOpen(false);
    setSelectedPost(null);
  };

  const handlePostDelete = async (id: string) => {
    try {
      await deleteAPost(id).unwrap();
      refetch();
    } catch (error) {
      alert(error);
    }
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

  const TITLE_THRESHOLD = 50;
  const DESCRIPTION_THRESHOLD = 150;

  return (
    <div className="p-4 shadow-xl rounded-lg" dir="RTL">
      <h1 className="text-right font-sans font-bold text-2xl mb-6 border-b-2 pb-3 border-gray-300">
        پست‌های شما
      </h1>

      <div
        className={`grid gap-6 ${data?.length === 1 ? "items-center" : ""}`}
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
      >
        {data?.map((post) => {
          const isTitleLong = post.title.length > TITLE_THRESHOLD;
          const isDescriptionLong =
            post.description.length > DESCRIPTION_THRESHOLD;
          const shouldShowModalBtn = isTitleLong || isDescriptionLong;

          return (
            <div
              key={post._id}
              className={`bg-[#1b344e] p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between ${
                data?.length === 1 ? "max-w-sm" : ""
              }`}
            >
              <div>
                {/* Post Title (with line-clamp if long) */}
                <h1
                  className={`text-lg font-bold text-white mb-2 border-b pb-2 border-gray-600 break-words ${
                    isTitleLong ? "line-clamp-3" : ""
                  }`}
                >
                  {post.title}
                </h1>

                {/* Post Description (with line-clamp if long) */}
                <p
                  className={`text-gray-300 text-sm mb-4 break-words ${
                    isDescriptionLong ? "line-clamp-3" : ""
                  }`}
                >
                  {post.description}
                </p>

                {/* Show "see more" button only if title or description is long */}
                {shouldShowModalBtn && (
                  <button
                    onClick={() => openPostModal(post)}
                    className="text-blue-500 mb-4 inline-block hover:text-blue-400 transition-colors duration-200"
                  >
                    مشاهده‌ی کامل
                  </button>
                )}

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

              {/* Images Section (remains unchanged) */}
              {post.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {post.images.map((image, index) => (
                    <img
                      key={index}
                      loading="lazy"
                      className="w-full h-24 rounded-md object-contain border border-gray-600 cursor-pointer transition-transform duration-200 hover:scale-105"
                      src={`http://192.168.0.105:4000/${image}`}
                      alt={`Post image ${index}`}
                      onClick={() =>
                        openImageModal(`http://192.168.0.105:4000/${image}`)
                      }
                    />
                  ))}
                </div>
              )}

              {/* Buttons Section */}
              <div className="flex justify-start mt-4 gap-2">
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                  onClick={() => handlePostDelete(post._id)}
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
          );
        })}
      </div>

      {/* Image Modal (unchanged) */}
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={closeImageModal}
        imageUrl={selectedImage}
      />

      {/* Post Modal for full details */}
      <Modal
        isOpen={isPostModalOpen}
        onRequestClose={closePostModal}
        contentLabel="Post Details"
        className="bg-[#1b344e] rounded-xl max-w-4xl w-full md:w-[90%] lg:w-[80%] mx-auto mt-12 p-4 text-white shadow-lg relative"
        overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-3"
      >
        {selectedPost && (
          <div dir="RTL" className="max-h-[75vh] overflow-y-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center border-b-2 pb-4 border-gray-600">
              جزئیات پست
            </h1>

            {/* Post Details */}
            <div className="space-y-4">
              <p className="text-lg break-words">
                <span className="block text-gray-400">عنوان:</span>
                <span>{selectedPost.title}</span>
              </p>
              <p className="text-lg break-words">
                <span className="block text-gray-400">توضیحات:</span>
                <span>{selectedPost.description}</span>
              </p>
              <p className="text-lg break-words">
                <span className="block text-gray-400">موقعیت:</span>
                <span>{selectedPost.location}</span>
              </p>
              <p className="text-lg break-words">
                <span className="block text-gray-400">قیمت:</span>
                <span>{selectedPost.price.toLocaleString()} افغانی</span>
              </p>
              <p className="text-lg break-words">
                <span className="block text-gray-400">دسته‌بندی:</span>
                <span>{selectedPost.category}</span>
              </p>
              {selectedPost.subCategory && (
                <p className="text-lg break-words">
                  <span className="block text-gray-400">زیر دسته:</span>
                  <span>{selectedPost.subCategory}</span>
                </p>
              )}
            </div>

            {/* Close Button */}
            <div className="mt-6 text-center">
              <button
                className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition"
                onClick={closePostModal}
              >
                بستن
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserPosts;
