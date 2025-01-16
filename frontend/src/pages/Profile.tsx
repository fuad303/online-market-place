import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useUploadProfileImageMutation } from "../app/api/fileApi";
import { setUser, updateProfileImage } from "../app/features/userSlice";
import imageCompression from "browser-image-compression";
const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const [copyStatus, setCopyStatus] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useDispatch();
  const [uploadProfileImage] = useUploadProfileImageMutation();
  const [userImage, setUserImage] = useState<string>("");

  const handleFileUpload = async (file: File) => {
    if (!user?.email) {
      throw new Error("email not found");
    }
    try {
      const options = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 720,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);
      const res = await uploadProfileImage({
        email: user?.email,
        file: compressedFile,
      }).unwrap();

      if (user) {
        const updateUser = {
          ...user,
          profileImage: res.user.profileImage,
        };
        dispatch(updateProfileImage(res.profileImage));
        dispatch(setUser(updateUser));
      }
    } catch (error) {
      console.error(
        "Error uploading image from const handleFileUpload ",
        error
      );
    }
  };

  useEffect(() => {
    if (user?.profileImage) {
      const timestamp = new Date().getTime();
      const imgUrl = `http://localhost:4000/${user.profileImage}?t=${timestamp}`;
      setUserImage(imgUrl);
    }
  }, [user?.profileImage]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

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
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="p-4 flex items-center justify-center">
      {user ? (
        <div className="w-full max-w-4xl grid gap-6">
          <div className="bg-[#1b344e] p-6 shadow-lg rounded-lg flex flex-col md:flex-row items-center">
            <input
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  setFile(files[0]);
                }
              }}
              type="file"
              accept="image/*"
              ref={fileRef}
              className="hidden"
            />
            <img
              onClick={() => fileRef.current?.click()}
              src={userImage}
              loading="lazy"
              className="w-20 h-20 cursor-pointer rounded-full object-cover border-4 border-[#324455] mb-5"
            />
            <div className="text-center md:text-right">
              <h2 className="text-xl font-bold ml-3 text-left text-white">
                {user.username}
              </h2>
              <p className="text-gray-400 text-left ml-3 text-sm">
                {user.email}
              </p>
              <div className="mt-2">
                <a
                  href="tel:+93790864688"
                  onClick={handleCopyClick}
                  className="text-[#FFC107] hover:underline text-sm"
                >
                  تلفن: +93790864688
                </a>
                {copyStatus && (
                  <span className="text-green-400 text-sm mr-2">کپی شد!</span>
                )}
                <span className="mx-1 text-gray-400">|</span>
                <NavLink
                  to="/edit-profile"
                  className="text-[#FFC107] hover:underline text-sm"
                >
                  ویرایش پروفایل
                </NavLink>
                <span className="mx-1 text-gray-400">|</span>
                <a
                  href="https://t.me/fuad203"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FFC107] hover:underline text-sm"
                >
                  تلگرام
                </a>
              </div>
            </div>
          </div>

          {/* User Posts Section */}
          <div className="bg-[#1b344e] p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-4">پست‌های شما</h2>
            {/* Placeholder for user posts */}
            <div className="bg-[#0e2338] p-4 rounded-lg border border-gray-600 text-center">
              <p className="text-gray-400">
                هنوز پستی ایجاد نکرده‌اید. شروع کنید!
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-400 text-xl">اول ثبت نام کنید</p>
      )}
    </div>
  );
};

export default Profile;
