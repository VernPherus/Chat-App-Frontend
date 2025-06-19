import React from 'react'
import { Search } from 'lucide-react'

const SearchBar = () => {

    return (
        <div className="w-full">
            <form onSubmit="" className="flex items-center gap-2">
                <div className="flex-1 flex gap-2">
                    <input
                        type="text"
                        className="w-full input input-bordered rounded-lg input-sm sm:input-md"
                        placeholder="Search"
                    />
                </div>
                <button className="btn btn-sm btn-circle">
                    <Search size={22} />
                </button>
            </form>
        </div>
    )
}

export default SearchBar
