import { motion } from "framer-motion";
import LoadingState from "../components/LoadingState";
import { Folder, Layers, MapPin, Tag } from "lucide-react";
import { useGetLatestNotificationsQuery } from "../app/api/feedApi";
import { NavLink } from "react-router-dom";
const Home = () => {
  const { data: posts, isLoading } = useGetLatestNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  console.log("Home component", posts);

  if (isLoading) return <LoadingState />;
  return (
    <div
      dir="RTL"
      className="grid gap-4"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      }}
    >
      {posts?.map((post) => (
        <NavLink to={`/post/${post._id}`} key={post._id}>
          <motion.div
            className={`bg-[#1b344e] p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300  justify-between cursor-pointer`}
          >
            {/* Images Section */}
            {post.images.length > 0 && (
              <div className="mt-4 ">
                <img
                  loading="lazy"
                  className="w-full h-52 rounded-md object-cover border border-gray-600 transition-transform duration-200 hover:scale-105"
                  src={`http://192.168.0.105:4000/${post.images[0]}`}
                  alt={`Post image `}
                />
              </div>
            )}
            {/* Post Title and Description */}
            <div className="pt-4 h-[12rem]">
              <h1 className="text-lg font-bold text-white mb-2 border-b pb-2 border-gray-600 break-words line-clamp-1">
                {post.title}
              </h1>
              <p className="text-gray-300 text-sm mb-4 break-words  line-clamp-1">
                {post.description}
              </p>

              <div className="space-y-2">
                {/* Location */}
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="text-[#FFC107] w-5 h-5 shrink-0" />
                  <span className="text-gray-400 ">موقعیت:</span>
                  <span className="text-white break-words  line-clamp-1">
                    {post.location}
                  </span>
                </div>
                {/* Price */}
                <div className="flex items-center gap-2 text-sm">
                  <Tag className="text-[#FFC107] w-5 h-5 shrink-0" />
                  <span className="text-gray-400">قیمت:</span>
                  <span className="text-white break-words  line-clamp-1">
                    {post.price.toLocaleString()} افغانی
                  </span>
                </div>
                {/* Category */}
                <div className="flex items-center gap-2 text-sm line-clamp-1 break-words">
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

            {/* Buttons Section */}
            <div className="flex justify-start mt-4 gap-2"></div>
          </motion.div>
        </NavLink>
      ))}
    </div>
  );
};

export default Home;
