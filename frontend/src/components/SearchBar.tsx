// SearchBar.tsx
import React from "react";
import { Search, X } from "lucide-react";
import { useForm } from "react-hook-form";

interface SearchInterface {
  searchQuery: string;
}

interface SearchBarProps {
  onClose?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  const { register, handleSubmit, reset } = useForm<SearchInterface>();

  const submit = (data: SearchInterface) => {
    console.log(data);
    reset();
  };

  return (
    <div className="flex items-center justify-center max-w-3xl">
      <form
        onSubmit={handleSubmit(submit)}
        className="flex items-center w-full bg-[#1b2b3c] rounded-full overflow-hidden border border-[#2c3f50] focus-within:ring-2 focus-within:ring-[#3c5060] transition-all duration-300"
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
            className="p-2 bg-red-500 text-white rounded-r-full"
          >
            <X />
          </button>
        ) : (
          <button
            type="submit"
            className="p-2 bg-[#2c3f50] hover:bg-[#3c5060] rounded-r-full"
          >
            <Search className="text-white" />
          </button>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
