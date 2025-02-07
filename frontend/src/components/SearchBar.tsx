import { Search, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

interface SearchInterface {
  searchQuery: string;
}

interface SearchBarProps {
  onClose?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  const { register, handleSubmit, reset } = useForm<SearchInterface>();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const submit = (data: SearchInterface) => {
    try {
      const { searchQuery } = data;
      if (!searchQuery || searchQuery.includes("\\")) {
        return;
      }
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      reset();
    } catch (error) {
      setErrorMessage("مشکلی پیش امد از (!@#$%^&*\\{}) استفاده نکنید");
    }
  };

  return (
    <div className="flex items-center justify-center max-w-3xl">
      {errorMessage ? (
        <div className="p-2 mt-2 text-red-500">{errorMessage}</div>
      ) : (
        <form
          onSubmit={handleSubmit(submit)}
          className="flex items-center w-full bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 bg-gray-800 border border-gray-700 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-gray-600 transition-all duration-300"
        >
          <input
            id="search"
            {...register("searchQuery")}
            type="text"
            className="w-full p-2 pl-4 bg-transparent text-white placeholder-gray-400 text-right focus:outline-none"
            placeholder="...جستجو"
          />

          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              className="p-2 bg-red-500 text-white rounded-r-full hover:bg-red-600 transition-colors duration-200"
            >
              <X />
            </button>
          ) : (
            <button
              type="submit"
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-r-full transition-colors duration-200"
            >
              <Search className="text-white" />
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default SearchBar;
