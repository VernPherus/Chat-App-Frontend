import React from 'react'
import { MessageSquare, UserPlus, UserPlus2 } from 'lucide-react'
import SearchBar from './SearchBar'
import { useRequestStore } from '../store/useRequestStore'
import { useAuthStore } from '../store/useAuthStore'
import SearchResult from './SearchResult'

const NoChatSelected = () => {

    const { searchResults } = useRequestStore();
    const { authUser } = useAuthStore();

    const searchedUsers = [
        { username: "Bill Wortszic" },
        { username: "Mark Greyson" },
        { username: "Orgalorg" },
        { username: "Macharious" },
        { username: "Odin Parkins" },
    ]

    return (
        <div className="w-full h-full flex flex-1 flex-col p-16 bg-base-100/50">
            <SearchBar />
            {
                !searchedUsers ? <div className="flex flex-1 flex-col items-center justify-center space-y-6">
                    {/* Icon Display */}
                    <div className="flex justify-center gap-4 mb-4">
                        <div className="relative">
                            <div
                                className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce"
                            >
                                <MessageSquare className="w-8 h-8 text-primary " />
                            </div>
                        </div>
                    </div>

                    {/* Welcome Text */}
                    <h2 className="text-2xl font-bold">Welcome to Comms!</h2>
                    <p className="text-base-content/60">
                        Select a conversation from the sidebar to start chatting
                    </p>
                </div> :
                    searchedUsers.map((users) => (
                        <SearchResult username={users.username} />
                    ))

            }

        </div>
    )
}

export default NoChatSelected