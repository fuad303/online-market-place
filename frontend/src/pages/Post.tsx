import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetAPostQuery } from "../app/api/feedApi";
import LoadingState from "../components/LoadingState";
import { MapPin, Tag, Folder, Layers } from "lucide-react";
import ImageModal from "../components/ImageModel";

const Post = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  if (!id) {
    return (
      <div
        dir="RTL"
        className="flex flex-col items-center justify-center min-h-screen bg-[#1b344e] p-4"
      >
        <h1 className="text-white text-xl break-words">مشکلی پیش آمد</h1>
        <a
          className="text-blue-500 underline mt-4 break-words"
          href="https://t.me/fuad203"
          target="_blank"
          rel="noopener noreferrer"
        >
          گزارش مشکل
        </a>
      </div>
    );
  }

  const { data: post, isLoading, error } = useGetAPostQuery(id);

  if (isLoading) return <LoadingState />;
  if (error)
    return (
      <h1
        dir="RTL"
        className="text-white text-xl text-center mt-8 bg-[#1b344e] p-4 rounded-xl break-words"
      >
        مشکلی پیش آمد
      </h1>
    );
  if (!post) return null;

  const handleImageClick = (imagePath: string) => {
    setSelectedImage(`http://192.168.0.105:4000/${imagePath}`);
    setIsModalOpen(true);
  };

  return (
    <div dir="RTL" className="max-w-4xl mx-auto p-4 break-words">
      <div className="bg-[#1b344e] p-6 rounded-xl shadow-md transition-all duration-300">
        {/* Post Title and Description */}
        <h1 className="text-lg font-bold text-white mb-2 border-b pb-2 border-gray-600 break-words">
          {post.title}
        </h1>
        <p className="text-gray-300 text-sm mb-4 break-words">
          {post.description}
        </p>

        {/* Images Section */}
        {post.images && post.images.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {post.images.map((image, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-md border border-gray-600"
              >
                <img
                  loading="lazy"
                  src={`http://192.168.0.105:4000/${image}`}
                  alt={`تصویر ${index + 1} از پست ${post.title}`}
                  className="w-full h-auto object-cover cursor-pointer transition-transform duration-200 hover:scale-105"
                  onClick={() => handleImageClick(image)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Post Details */}
        <div className="space-y-4">
          {/* Location */}
          <div className="flex items-center gap-2 text-sm flex-wrap">
            <MapPin className="text-[#FFC107] w-5 h-5" />
            <span className="text-gray-400 break-words">موقعیت:</span>
            <span className="text-white break-words">{post.location}</span>
          </div>
          {/* Price */}
          <div className="flex items-center gap-2 text-sm flex-wrap">
            <Tag className="text-[#FFC107] w-5 h-5" />
            <span className="text-gray-400 break-words">قیمت:</span>
            <span className="text-white break-words">
              {post.price.toLocaleString()} افغانی
            </span>
          </div>
          {/* Category */}
          <div className="flex items-center gap-2 text-sm flex-wrap">
            <Folder className="text-[#FFC107] w-5 h-5" />
            <span className="text-gray-400 break-words">دسته‌بندی:</span>
            <span className="text-white break-words">{post.category}</span>
          </div>
          {/* Subcategory (Optional) */}
          {post.subCategory && (
            <div className="flex items-center gap-2 text-sm flex-wrap">
              <Layers className="text-[#FFC107] w-5 h-5" />
              <span className="text-gray-400 break-words">زیر دسته:</span>
              <span className="text-white break-words">{post.subCategory}</span>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageUrl={selectedImage}
      />
    </div>
  );
};

export default Post;
