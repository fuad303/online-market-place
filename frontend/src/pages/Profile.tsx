import { RootState } from "../app/store";
import LoadingState from "../components/LoadingState";
import { useLogoutMutation } from "../app/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { useCallback, useEffect, useRef, useState } from "react";
import { useUploadProfileImageMutation } from "../app/api/uploadApi";
import { clearUser, updateProfileImage } from "../app/features/userSlice";
import UserPosts from "../components/UserPosts";
import notificationsApi from "../app/api/notificationsApi";
const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const [copyStatus, setCopyStatus] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [userImage, setUserImage] = useState<string>("");

  const [uploadProfileImage, { isLoading, error }] =
    useUploadProfileImageMutation();

  const [Logout] = useLogoutMutation();

  const handleFileUpload = useCallback(
    async (file: File) => {
      try {
        const options = {
          maxSizeMB: 0.1, // Limit file size to 0.1 MB
          maxWidthOrHeight: 720, // Restrict image dimensions
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);

        const res = await uploadProfileImage({ file: compressedFile }).unwrap();

        if (user) {
          dispatch(updateProfileImage(res.profile));
          setUserImage(`http://localhost:4000/${res.profile}`);
        }
      } catch (error) {
        console.error(
          "Error uploading image in handleFileUpload:",
          error instanceof Error ? error.message : error
        );
      }
    },
    [dispatch, uploadProfileImage, user]
  );

  const handleLogout = async () => {
    const confirmation = window.confirm("برای خروج از حساب خود تایید کنید");
    if (confirmation) {
      try {
        await Logout().unwrap();
        dispatch(clearUser());
        dispatch(notificationsApi.util.resetApiState());
        navigate("/login");
      } catch (error) {}
    }
  };

  useEffect(() => {
    if (user?.profileImage) {
      const timestamp = new Date().getTime();
      const imgUrl = `http://192.168.0.105:4000/${user.profileImage}?t=${timestamp}`;
      setUserImage(imgUrl);
    }
  }, [user?.profileImage]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText("+93790864688");
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <>
      {error ? (
        <h1 className="text-2xl font-bold text-red-600 mb-6 text-center">
          {(error as any)?.data?.message || "مشکلی پیش آمد"}
        </h1>
      ) : (
        <div className="flex items-center justify-center">
          {user ? (
            <div className="w-full max-w-full grid gap-6 m-3">
              {/* Profile Card */}
              <div className="bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 bg-gray-800 border border-gray-700 p-6  shadow-lg rounded-lg flex flex-col md:flex-row items-center md:items-start text-white">
                {/* Profile Image */}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileRef}
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) setFile(files[0]);
                  }}
                  className="hidden"
                />
                {user.profileImage ? (
                  <img
                    src={userImage}
                    onClick={() => fileRef.current?.click()}
                    loading="lazy"
                    className="w-20 h-20 cursor-pointer rounded-full object-cover border-4 border-gray-500 mb-5 md:mb-0"
                    alt="Profile"
                  />
                ) : (
                  <div
                    onClick={() => fileRef.current?.click()}
                    className="cursor-pointer w-20 h-20 flex items-center justify-center rounded-full bg-gray-700 border-4 border-gray-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-400 w-12 h-12"
                    >
                      <circle cx="12" cy="7" r="4"></circle>
                      <path d="M5.5 20c0-3.59 2.91-6.5 6.5-6.5s6.5 2.91 6.5 6.5H5.5z"></path>
                    </svg>
                  </div>
                )}

                {/* User Info and Actions */}
                <div className="flex flex-col md:flex-row justify-between items-center w-full md:ml-4">
                  <div className="text-center md:text-left">
                    <h2 className="text-xl font-bold">{user.username}</h2>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                    <div className="mt-2">
                      <a
                        href="tel:+93790864688"
                        onClick={handleCopyClick}
                        className="text-yellow-500 hover:underline text-sm"
                      >
                        {user.phone}
                      </a>
                      {copyStatus && (
                        <span className="text-green-400 text-sm mr-2">
                          کپی شد!
                        </span>
                      )}
                      <span className="mx-1 text-gray-400">|</span>
                      <NavLink
                        to="/edit-profile"
                        className="text-yellow-500 hover:underline text-sm"
                      >
                        ویرایش پروفایل
                      </NavLink>
                    </div>
                  </div>

                  {/* Sign Out Button */}
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white py-2 px-4 mt-4 md:mt-0 rounded-md hover:bg-red-700 transition duration-200"
                  >
                    خروج از حساب
                  </button>
                </div>
              </div>

              {/* User Posts Section */}
              <div className="w-full">
                <UserPosts />
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-400 text-xl">
              اول ثبت نام کنید
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default Profile;
