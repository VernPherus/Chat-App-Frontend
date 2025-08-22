import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { useRequestStore } from '../store/useRequestStore';

const SearchBar = () => {

    const [searchItem, setText] = useState("");
    const { getSearchResults } = useRequestStore();

    const handleSendSearchItem = async (e) => {
        e.preventDefault();
        if (!searchItem.trim()) return;

        try {
            await getSearchResults({
                username: searchItem.trim()
            });

            setText(searchItem)
        } catch (error) {
            console.error("Failed to search for user: ", error)
        }

    }

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
    )
}

export default SearchBar
