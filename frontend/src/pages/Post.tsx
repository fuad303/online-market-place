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
        <h1 className="text-white text-xl">مشکلی پیش آمد</h1>
        <a
          className="text-blue-500 underline mt-4"
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
        className="text-white text-xl text-center mt-8 bg-[#1b344e] p-4 rounded-xl"
      >
        مشکلی پیش آمد
      </h1>
    );
  if (!post) return null;

  // Handler for image click to open the modal.
  const handleImageClick = (imagePath: string) => {
    setSelectedImage(`http://localhost:4000/${imagePath}`);
    setIsModalOpen(true);
  };

  return (
    <div dir="RTL" className="max-w-4xl mx-auto p-4">
      <div className="bg-[#1b344e] p-6 rounded-xl shadow-md transition-all duration-300">
        {/* Post Title and Description */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white border-b border-gray-600 pb-2">
            {post.title}
          </h1>
          <p className="text-gray-300 mt-4">{post.description}</p>
        </div>

        {/* Images Section */}
        {post.images && post.images.length > 0 && (
          <div
            className="gap-4 mb-6"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            }}
          >
            {post.images.map((image, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-md border border-gray-600"
              >
                <img
                  loading="lazy"
                  src={`http://localhost:4000/${image}`}
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
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="text-[#FFC107] w-5 h-5" />
            <span className="text-gray-400">موقعیت:</span>
            <span className="text-white">{post.location}</span>
          </div>
          {/* Price */}
          <div className="flex items-center gap-2 text-sm">
            <Tag className="text-[#FFC107] w-5 h-5" />
            <span className="text-gray-400">قیمت:</span>
            <span className="text-white">
              {post.price.toLocaleString()} افغانی
            </span>
          </div>
          {/* Category */}
          <div className="flex items-center gap-2 text-sm">
            <Folder className="text-[#FFC107] w-5 h-5" />
            <span className="text-gray-400">دسته‌بندی:</span>
            <span className="text-white">{post.category}</span>
          </div>
          {/* Subcategory (Optional) */}
          {post.subCategory && (
            <div className="flex items-center gap-2 text-sm">
              <Layers className="text-[#FFC107] w-5 h-5" />
              <span className="text-gray-400">زیر دسته:</span>
              <span className="text-white">{post.subCategory}</span>
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
