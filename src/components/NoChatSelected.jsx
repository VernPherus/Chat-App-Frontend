import React from 'react'
import { MessageSquare, UserPlus, UserPlus2 } from 'lucide-react'
import SearchBar from './SearchBar'
import { useRequestStore } from '../store/useRequestStore'
import { useAuthStore } from '../store/useAuthStore'

const NoChatSelected = () => {

    const { searchResults } = useRequestStore();
    const { authUser } = useAuthStore();

    const searchedUsers = []

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
                    <div className="flex flex-1 flex-col space-y-6">
                        <div className="h-16 bg-base-100 flex flex-row justify-between items-center">
                            <div className="flex items-center gap-3 w-full">
                                <div className="relative mx-auto lg:mx-0">
                                    <img
                                        src="/avatar.png"
                                        alt=""
                                        className="size-12 object-cover rounded-full"
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <h2 className="font-semibold">Username</h2>
                                </div>
                                <button className="btn btn-sm bg-base-100 border-base-content">
                                    <UserPlus2 />
                                    <span className="hidden sm:inline">Add friend</span>
                                </button>

                            </div>
                        </div>

                    </div>
            }

        </div>
    )
}

export default NoChatSelected