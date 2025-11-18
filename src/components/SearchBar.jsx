import React, { useState } from "react";
import { Search } from "lucide-react";
import { useRequestStore } from "../store/useRequestStore";
import toast from "react-hot-toast";

const SearchBar = () => {
  const [searchItem, setText] = useState("");
  const { getSearchResults, clearSearchResults } =
    useRequestStore();

  const handleSendSearchItem = async (e) => {
    e.preventDefault();

    //* Clear out search items with empty search bar
    if (!searchItem.trim()) {
      clearSearchResults();
      return;
    }

    if (searchItem.length < 3){
      toast.error("Enter atleast 3 characters.")
      return;
    }

    try {
      const results = await getSearchResults({
        username: searchItem.trim(),
      });

      setText(searchItem);

      //* Toast for non-existent users
      if (!results || results.length === 0) {
        toast.error("User does not exist!");
        return;
      }
    } catch (error) {
      console.error("Failed to search for user: ", error);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSendSearchItem} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Search"
            value={searchItem}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-sm btn-circle">
          <Search size={22} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
