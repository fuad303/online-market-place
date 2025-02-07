import { NavLink } from "react-router-dom";
import { NotificationsInterface } from "../app/api/notificationsApi";

interface UserPostsProps {
  userPosts: NotificationsInterface[];
}

const TheUserPostsinPostPage: React.FC<UserPostsProps> = ({ userPosts }) => {
  return (
    <div
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
      className="grid gap-6 -m-9"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      }}
    >
      {userPosts.map((post) => (
        <NavLink
          to={`/post/${encodeURIComponent(post._id)}`}
          key={post._id}
          className="rounded-lg shadow-md overflow-hidden transform transition-all duration-200 hover:scale-105 hover:shadow-xl border border-gray-600"
        >
          <div className="w-full h-48 overflow-hidden bg-gray-800">
            <img
              src={`http://192.168.0.105:4000/${post.images}`}
              alt={`تصویر پست ${post.title}`}
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="p-4">
            <h3 className="text-gray-300 font-semibold text-lg break-words line-clamp-1">
              {post.title}
            </h3>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default TheUserPostsinPostPage;
