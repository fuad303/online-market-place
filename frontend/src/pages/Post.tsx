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
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
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
      <div className="mt-6 p-4 border border-gray-300 rounded bg-[#1b344e] text-center text-sm text-white">
        <div>
          ایمیل:{" "}
          <a
            href={`mailto:${credentials.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            {credentials.email}
          </a>
        </div>
        <div className="mt-2">
          تلفن:{" "}
          <a
            href={`tel:+93${credentials.phone}`}
            className="text-blue-400 underline"
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
        className="flex items-center justify-center min-h-screen bg-[#1b344e] p-4"
      >
        <h1 className="text-white text-xl bg-[#1b344e] p-4 rounded-xl">
          مشکلی پیش آمد
        </h1>
      </div>
    );
  if (!post) return null;

  const handleImageClick = (imagePath: string) => {
    setSelectedImage(`http://192.168.0.105:4000/${imagePath}`);
    setIsModalOpen(true);
  };

  return (
    <div dir="RTL" className="min-h-screen py-8 px-4 ">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#1b344e] p-4 -m-9 rounded-xl shadow-lg transition-all duration-300 ">
          {/* Post Title */}
          <h1 className="text-2xl font-bold text-white mb-3 border-b pb-2">
            {post.title}
          </h1>
          {/* Post Description */}
          <p className="text-gray-300 text-base mb-4">{post.description}</p>

          {/* Post Details */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="text-[#FFC107] w-5 h-5" />
              <span className="text-gray-400">موقعیت:</span>
              <span className="text-white">{post.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Tag className="text-[#FFC107] w-5 h-5" />
              <span className="text-gray-400">قیمت:</span>
              <span className="text-white">
                {post.price.toLocaleString()} افغانی
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Folder className="text-[#FFC107] w-5 h-5" />
              <span className="text-gray-400">دسته‌بندی:</span>
              <span className="text-white">{post.category}</span>
            </div>
            {post.subCategory && (
              <div className="flex items-center gap-2 text-sm">
                <Layers className="text-[#FFC107] w-5 h-5" />
                <span className="text-gray-400">زیر دسته:</span>
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
                  className="mt-4 relative w-full h-48 rounded-md border border-gray-600 overflow-hidden transition-transform duration-200 hover:scale-105"
                  onClick={() => handleImageClick(image)}
                >
                  <img
                    loading="lazy"
                    src={`http://192.168.0.105:4000/${image}`}
                    alt="Post"
                    className="absolute inset-0 w-full h-full object-cover filter blur-md scale-110"
                  />
                  <img
                    loading="lazy"
                    src={`http://192.168.0.105:4000/${image}`}
                    alt="Post"
                    className="absolute inset-0 m-auto max-w-full max-h-full object-contain"
                  />
                </div>

                // <div
                //   key={index}
                //   className="overflow-hidden rounded-md border border-gray-600"
                // >
                //   <img
                //     loading="lazy"
                //     src={`http://192.168.0.105:4000/${image}`}
                //     alt={`تصویر ${index + 1} از پست ${post.title}`}
                //     className="w-full h-52 object-cover ] cursor-pointer transition-transform duration-200 hover:scale-105"
                //     onClick={() => handleImageClick(image)}
                //   />
                // </div>
              ))}
            </div>
          )}
        </div>

        {/* User's Other Posts */}
        <div className="mt-10">
          <h2 className="text-gray-300 text-xl font-semibold mb-4">
            تمام اعلانات این کاربر
          </h2>
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
                  className="hover:scale-105 transition-all duration-75 p-2 bg-red-500 rounded-md text-white text-sm"
                >
                  دیدن اطلاعات تماس
                </button>
              )}
            </div>
          ) : (
            <div className="pt-4">
              <NavLink
                to="/login"
                className="hover:scale-105 transition-all duration-75 p-2 bg-red-500 rounded-md text-white text-sm "
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
