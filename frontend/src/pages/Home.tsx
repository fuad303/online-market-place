import { motion } from "framer-motion";
import LoadingState from "../components/LoadingState";
import LittleLoading from "../components/LittleLoading";
import { Folder, Layers, MapPin, Tag } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { faIR } from "date-fns/locale";
import feedApi, {
  FeedNotificationsInterface,
  useGetLatestNotificationsQuery,
} from "../app/api/feedApi";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/store";
import Story from "../components/Story";
import Carousel from "../components/Carousel";

export type FeedResponse =
  | FeedNotificationsInterface[]
  | {
      feed: FeedNotificationsInterface[];
      message: string;
    };

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<FeedNotificationsInterface[]>([]);
  const [noMorePosts, setNoMorePosts] = useState(false);

  const {
    data: posts,
    isLoading,
    isFetching,
  } = useGetLatestNotificationsQuery(
    {
      page,
      limit: 15,
    },
    {
      refetchOnMountOrArgChange: false,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  ) as { data?: FeedResponse; isLoading: boolean; isFetching: boolean };

  useEffect(() => {
    if (posts) {
      let postsArray: FeedNotificationsInterface[] = [];

      if (Array.isArray(posts)) {
        postsArray = posts;
      } else if ("feed" in posts && Array.isArray(posts.feed)) {
        postsArray = posts.feed;
      }

      if (postsArray.length === 0) {
        setNoMorePosts(true);
      } else {
        setAllPosts((prev) => [...prev, ...postsArray]);
      }
    }
  }, [posts]);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !isFetching &&
      !noMorePosts
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching, noMorePosts]);

  if (isLoading && page === 1) return <LoadingState />;

  const postVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div dir="RTL" className="min-h-screen py-8">
      {/* Story Section */}
      <div className="sm:-mt-4 sm:px-2">
        <Story />
      </div>

      {/* Notifications Carousel */}
      <div className="px-2 mb-8">
        <Carousel />
      </div>

      {/* Posts Grid */}
      <div
        className="grid gap-6 m-2"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(285px, 1fr))",
        }}
      >
        {allPosts.map((post, index) => (
          <NavLink to={`/post/${encodeURIComponent(post._id)}`} key={post._id}>
            <motion.div
              variants={postVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
              className="group bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 bg-gray-800 border border-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:border-gray-500 transition-all duration-300 cursor-pointer"
            >
              {post.images.length > 0 && (
                <div className="mt-4 relative w-full h-56 rounded-xl overflow-hidden">
                  <img
                    loading="lazy"
                    src={`http://192.168.0.105:4000/${post.images[0]}`}
                    alt="Post"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                </div>
              )}
              <div className="pt-5 h-[15rem]">
                <h1 className="text-xl font-bold text-white mb-3 line-clamp-1">
                  {post.title}
                </h1>
                <hr className="border-gray-700 mb-3" /> {/* HR Tag Here */}
                <p className="text-gray-400 text-sm mb-5 line-clamp-2">
                  {post.description}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="text-cyan-400 w-5 h-5 shrink-0" />
                    <span className="text-gray-500">موقعیت:</span>
                    <span className="text-white line-clamp-1">
                      {post.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Tag className="text-lime-400 w-5 h-5 shrink-0" />
                    <span className="text-gray-500">قیمت:</span>
                    <span className="text-white line-clamp-1">
                      {post.price.toLocaleString()} افغانی
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Folder className="text-fuchsia-400 w-5 h-5 shrink-0" />
                    <span className="text-gray-500">دسته‌بندی:</span>
                    <span className="text-white">{post.category}</span>
                  </div>
                  {post.subCategory && (
                    <div className="flex items-center gap-3 text-sm">
                      <Layers className="text-orange-400 w-5 h-5 shrink-0" />
                      <span className="text-gray-500">زیر دسته:</span>
                      <span className="text-white">{post.subCategory}</span>
                    </div>
                  )}
                </div>
              </div>
              {post.createdAt && (
                <div className="text-gray-500 pt-4">
                  {formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                    locale: faIR,
                  })}
                </div>
              )}
            </motion.div>
          </NavLink>
        ))}
      </div>

      {/* No More Posts & Load More Button */}
      {noMorePosts && (
        <div className="flex flex-col items-center py-10 text-gray-500">
          <p className="mb-3">دیگر پستی وجود ندارد.</p>
          <button
            onClick={() => {
              setAllPosts([]);
              setPage(1);
              setNoMorePosts(false);
              dispatch(feedApi.util.resetApiState());
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="px-7 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition duration-300"
          >
            بارگذاری آخرین داده‌ها
          </button>
        </div>
      )}

      {/* Loading Indicator */}
      {isFetching && !noMorePosts && (
        <div className="flex pt-5 justify-center items-center pb-6">
          <LittleLoading />
        </div>
      )}
    </div>
  );
};

export default Home;
