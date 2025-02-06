import { NavLink, useSearchParams } from "react-router-dom";
import { useLazySearchQuery } from "../app/api/notificationsApi";
import { useEffect } from "react";
import LoadingState from "../components/LoadingState";
import { Folder, Layers, MapPin, Tag } from "lucide-react";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")!;

  const [search, { data: searchResult, isLoading: loading, error }] =
    useLazySearchQuery();

  if (!query) {
    return <h1>پارامتر جستجو یافت نشد</h1>;
  }

  useEffect(() => {
    search(query);
  }, [query, search]);

  if (loading) return <LoadingState />;

  if (error) {
    <h1 className="p-2 text-center text-3xl text-red-500 ">مشکلی پیش آمد</h1>;
    return;
  }

  return (
    <div>
      {searchResult && searchResult.length > 0 ? (
        <div
          dir="RTL"
          className="grid gap-4 -m-5"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          }}
        >
          {searchResult.map((result) => (
            <NavLink
              to={`/post/${encodeURIComponent(result._id)}`}
              key={result._id}
            >
              <div className="bg-[#1b344e] p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
                {result.images.length > 0 && (
                  <div className="mt-4 relative w-full h-72 rounded-md border border-gray-600 overflow-hidden transition-transform duration-200 hover:scale-105">
                    <img
                      loading="lazy"
                      src={`http://192.168.0.105:4000/${result.images[0]}`}
                      alt="result"
                      className="absolute inset-0 w-full h-full object-cover filter blur-md scale-110"
                    />
                    <img
                      loading="lazy"
                      src={`http://192.168.0.105:4000/${result.images[0]}`}
                      alt="result"
                      className="absolute inset-0 m-auto max-w-full max-h-full object-contain"
                    />
                  </div>
                )}
                <div className="pt-4 h-[12rem]">
                  <h1 className="text-lg font-bold text-white mb-2 border-b pb-2 border-gray-600 line-clamp-1">
                    {result.title}
                  </h1>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-1">
                    {result.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="text-[#FFC107] w-5 h-5 shrink-0" />
                      <span className="text-gray-400">موقعیت:</span>
                      <span className="text-white line-clamp-1">
                        {result.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Tag className="text-[#FFC107] w-5 h-5 shrink-0" />
                      <span className="text-gray-400">قیمت:</span>
                      <span className="text-white line-clamp-1">
                        {result.price.toLocaleString()} افغانی
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Folder className="text-[#FFC107] w-5 h-5 shrink-0" />
                      <span className="text-gray-400">دسته‌بندی:</span>
                      <span className="text-white">{result.category}</span>
                    </div>
                    {result.subCategory && (
                      <div className="flex items-center gap-2 text-sm">
                        <Layers className="text-[#FFC107] w-5 h-5 shrink-0" />
                        <span className="text-gray-400">زیر دسته:</span>
                        <span className="text-white">{result.subCategory}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      ) : (
        <div className="text-center text-3xl p-3">چیزی یافت نشد</div>
      )}
    </div>
  );
};

export default SearchResult;
