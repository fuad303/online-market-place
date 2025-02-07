import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import React, { useState, memo } from "react";
import { NavLink, useParams } from "react-router-dom";
import {
  useGetAPostQuery,
  useLazyGetUserCredentialsQuery,
} from "../app/api/feedApi";
import LoadingState from "../components/LoadingState";
import LittleLoading from "../components/LittleLoading";
import { MapPin, Tag, Folder, Layers } from "lucide-react";
import ImageModal from "../components/ImageModel";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import TheUserPostsinPostPage from "../components/TheUserPostsinPostPage";

export interface UserCredentials {
  username: string;
  email: string;
  phone: string;
  message?: string;
}

interface CredentialsDisplayProps {
  credentials: UserCredentials;
  error?: FetchBaseQueryError | SerializedError;
}

const CredentialsDisplay: React.FC<CredentialsDisplayProps> = memo(
  ({ credentials, error }) => {
    if (error) {
      return (
        <div className="mt-6 text-center text-sm text-red-500">
          خطا در دریافت اطلاعات تماس. لطفاً دوباره تلاش کنید.
        </div>
      );
    }
    return (
      <div className="mt-6 p-4 border border-gray-700 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 bg-gray-800 text-center text-sm text-white">
        <div>
          ایمیل:{" "}
          <a
            href={`mailto:${credentials.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline hover:text-blue-300 transition-colors duration-200"
          >
            {credentials.email}
          </a>
        </div>
        <div className="mt-2">
          تلفن:{" "}
          <a
            href={`tel:+93${credentials.phone}`}
            className="text-blue-400 underline hover:text-blue-300 transition-colors duration-200"
          >
            +93{credentials.phone}
          </a>
        </div>
      </div>
    );
  }
);

const Post: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const user = useSelector((state: RootState) => state.user);

  if (!id) {
    return (
      <div
        dir="RTL"
        className="flex flex-col items-center justify-center min-h-screen p-4"
      >
        <h1 className="text-white text-xl">مشکلی پیش آمد</h1>
        <a
          className="text-blue-500 underline mt-4 hover:text-blue-300 transition-colors duration-200"
          href="https://t.me/fuad203"
          target="_blank"
          rel="noopener noreferrer"
        >
          گزارش مشکل
        </a>
      </div>
    );
  }

  const { data, isLoading, error } = useGetAPostQuery(id);
  const post = data?.aPost;
  const userPosts = data?.userPosts;
  const [
    getUserCredentials,
    { data: userCredentials, isLoading: loadingUser, error: userError },
  ] = useLazyGetUserCredentialsQuery();

  if (isLoading) return <LoadingState />;
  if (error)
    return (
      <div
        dir="RTL"
        className="flex items-center justify-center min-h-screen p-4"
      >
        <h1 className="text-white text-xl p-4 rounded-xl">مشکلی پیش آمد</h1>
      </div>
    );
  if (!post) return null;

  const handleImageClick = (imagePath: string) => {
    setSelectedImage(`http://192.168.0.105:4000/${imagePath}`);
    setIsModalOpen(true);
  };

  return (
    <div dir="RTL" className="min-h-screen py-8">
      <div className="p-4">
        <div className="bg-clip-padding bg-opacity-10 bg-gray-800 border border-gray-700 p-6 rounded-2xl shadow-lg transition-all duration-300 -m-9">
          {/* Post Title */}
          <h1 className="text-2xl font-bold text-white mb-3 break-words">
            {post.title}
          </h1>
          <hr className="border-gray-700 mb-3" />
          {/* Post Description */}
          <p className="text-gray-300 text-base mb-4 break-words">
            {post.description}
          </p>

          {/* Post Details */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="text-cyan-400 w-5 h-5" />
              <span className="text-gray-500">موقعیت:</span>
              <span className="text-white">{post.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Tag className="text-lime-400 w-5 h-5" />
              <span className="text-gray-500">قیمت:</span>
              <span className="text-white">
                {post.price.toLocaleString()} افغانی
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Folder className="text-fuchsia-400 w-5 h-5" />
              <span className="text-gray-500">دسته‌بندی:</span>
              <span className="text-white">{post.category}</span>
            </div>
            {post.subCategory && (
              <div className="flex items-center gap-2 text-sm">
                <Layers className="text-orange-400 w-5 h-5" />
                <span className="text-gray-500">زیر دسته:</span>
                <span className="text-white">{post.subCategory}</span>
              </div>
            )}
          </div>

          {/* Images Section */}
          {post.images && post.images.length > 0 && (
            <div
              className="grid gap-4 mb-6"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              }}
            >
              {post.images.map((image, index) => (
                <div
                  key={index}
                  className="group relative w-full h-48 rounded-xl overflow-hidden border border-gray-700 transition-transform duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => handleImageClick(image)}
                >
                  <img
                    loading="lazy"
                    src={`http://192.168.0.105:4000/${image}`}
                    alt="Post"
                    className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User's Other Posts */}
        <div className="mt-12">
          <h2 className="text-gray-400 text-2xl font-bold mb-2  shadow-sm">
            تمام اعلانات این کاربر
          </h2>
          <hr className="mb-12" />
          {userPosts && userPosts.length > 0 ? (
            <TheUserPostsinPostPage userPosts={userPosts} />
          ) : (
            <p className="text-gray-500">هیچ آگهی دیگری موجود نیست.</p>
          )}
        </div>

        {/* Image Modal */}
        <ImageModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          imageUrl={selectedImage}
        />
        {/* User Credentials Section */}
        <div className="mt-8 text-center">
          {user ? (
            <div className="pt-4">
              {userCredentials ? (
                <CredentialsDisplay
                  credentials={userCredentials}
                  error={userError}
                />
              ) : loadingUser ? (
                <div className="flex justify-center items-center pt-4">
                  <LittleLoading />
                </div>
              ) : (
                <button
                  onClick={() => getUserCredentials(post.seller)}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  دیدن اطلاعات تماس
                </button>
              )}
            </div>
          ) : (
            <div className="pt-4">
              <NavLink
                to="/login"
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                دیدن اطلاعات تماس
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
