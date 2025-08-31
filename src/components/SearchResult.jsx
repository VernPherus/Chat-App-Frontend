import React from 'react'
import { UserPlus2 } from 'lucide-react'

function SearchResult(data) {
    return (
        <div className="p-2.5 border-b border-base-300">
            <div className="flex flex-row justify-between">
                <div className="flex items-center gap-3 w-full">
                    <div className="avatar">
                        <div className="size-10 rounded-full relative">
                            <img
                                src={data.profilePic || "/avatar.png"}
                                alt={data.fullName}
                                className="size-12 object-cover rounded-full"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <h2 className="font-semibold">{data.username}</h2>
                    </div>
                    <button className="btn btn-sm bg-base-100 border-base-content">
                        <UserPlus2 />
                        <span className="hidden sm:inline">Add friend</span>
                    </button>

                </div>
            </div>

        </div>
    )
}

export default SearchResult