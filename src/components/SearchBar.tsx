import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }: { onSearch: (term: string) => void }) => {
  return (
    <div className="relative w-full mb-4">
      <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-200" />
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;
