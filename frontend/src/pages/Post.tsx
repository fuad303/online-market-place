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
      // Using a timeout here is unusual. Consider removing it or handling the error outside.
      setTimeout(() => {
        return (
          <div className="mt-6 text-center text-sm text-red-500">
            خطا در دریافت اطلاعات تماس. لطفاً دوباره تلاش کنید.
          </div>
        );
      }, 1000);
    }
    return (
      <div className="mt-6 p-3 border border-gray-300 rounded text-center text-sm text-white bg-[#1b344e]">
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
        <div>
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
  const [
    getUserCredentials,
    { data: userCredentials, isLoading: loadingUser, error: userError },
  ] = useLazyGetUserCredentialsQuery();

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
    <div dir="RTL" className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#1b344e] p-6 rounded-xl shadow-md transition-all duration-300">
          {/* Post Title and Description */}
          <h1 className="text-lg font-bold text-white mb-2 border-b pb-2 border-gray-600 break-words">
            {post.title}
          </h1>
          <p className="text-gray-300 text-sm mb-4 break-words">
            {post.description}
          </p>

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
              <span className="text-gray-400">دسته‌بندی:</span>
              <span className="text-white break-all">{post.category}</span>
            </div>
            {/* Subcategory (Optional) */}
            {post.subCategory && (
              <div className="flex items-center gap-2 text-sm flex-wrap">
                <Layers className="text-[#FFC107] w-5 h-5" />
                <span className="text-gray-400 break-words">زیر دسته:</span>
                <span className="text-white break-words">
                  {post.subCategory}
                </span>
              </div>
            )}
          </div>

          {/* Images Section */}
          {post.images && post.images.length > 0 && (
            <div
              className="grid gap-4 mb-6 pt-4"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              }}
            >
              {post.images.map((image, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-md border border-gray-600"
                >
                  <img
                    loading="lazy"
                    src={`http://192.168.0.105:4000/${image}`}
                    alt={`تصویر ${index + 1} از پست ${post.title}`}
                    className="w-full h-52 object-contain cursor-pointer transition-transform duration-200 hover:scale-105"
                    onClick={() => handleImageClick(image)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Image Modal */}
        <ImageModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          imageUrl={selectedImage}
        />

        {/* User Credentials Section */}
        <div className="mt-6 text-center">
          {user ? (
            <>
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
            </>
          ) : (
            <NavLink
              to="/login"
              className="hover:scale-105 transition-all duration-75 p-2 bg-red-500 rounded-md text-white text-sm"
            >
              دیدن اطلاعات تماس
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
