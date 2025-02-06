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

  return (
    <div dir="RTL">
      <div
        className="grid gap-4 -m-5"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
      >
        {allPosts.map((post) => (
          <NavLink to={`/post/${encodeURIComponent(post._id)}`} key={post._id}>
            <motion.div className="bg-[#1b344e] p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
              {post.images.length > 0 && (
                <div className="mt-4 relative w-full h-48 rounded-md border border-gray-600 overflow-hidden transition-transform duration-200 hover:scale-105">
                  <img
                    loading="lazy"
                    src={`http://192.168.0.105:4000/${post.images[0]}`}
                    alt="Post"
                    className="absolute inset-0 w-full h-full object-cover filter blur-md scale-110"
                  />
                  <img
                    loading="lazy"
                    src={`http://192.168.0.105:4000/${post.images[0]}`}
                    alt="Post"
                    className="absolute inset-0 m-auto max-w-full max-h-full object-contain"
                  />
                </div>
              )}
              <div className="pt-4 h-[12rem]">
                <h1 className="text-lg font-bold text-white mb-2 border-b pb-2 border-gray-600 line-clamp-1">
                  {post.title}
                </h1>
                <p className="text-gray-300 text-sm mb-4 line-clamp-1">
                  {post.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="text-[#FFC107] w-5 h-5 shrink-0" />
                    <span className="text-gray-400">موقعیت:</span>
                    <span className="text-white line-clamp-1">
                      {post.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Tag className="text-[#FFC107] w-5 h-5 shrink-0" />
                    <span className="text-gray-400">قیمت:</span>
                    <span className="text-white line-clamp-1">
                      {post.price.toLocaleString()} افغانی
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Folder className="text-[#FFC107] w-5 h-5 shrink-0" />
                    <span className="text-gray-400">دسته‌بندی:</span>
                    <span className="text-white">{post.category}</span>
                  </div>
                  {post.subCategory && (
                    <div className="flex items-center gap-2 text-sm">
                      <Layers className="text-[#FFC107] w-5 h-5 shrink-0" />
                      <span className="text-gray-400">زیر دسته:</span>
                      <span className="text-white">{post.subCategory}</span>
                    </div>
                  )}
                </div>
              </div>
              {post.createdAt && (
                <div className="text-gray-300 pt-3">
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

      {noMorePosts && (
        <div className="flex flex-col items-center pb-5 text-gray-500 pt-8">
          <p>دیگر پستی وجود ندارد.</p>
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
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            بارگذاری آخرین داده‌ها
          </button>
        </div>
      )}

      {isFetching && !noMorePosts && (
        <div className="flex pt-4 justify-center items-center pb-5">
          <LittleLoading />
        </div>
      )}
    </div>
  );
};

export default Home;
