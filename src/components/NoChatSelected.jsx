import React, { useEffect } from "react";
import { MessageSquare, UserPlus, UserPlus2 } from "lucide-react";
import SearchBar from "./SearchBar";
import { useRequestStore } from "../store/useRequestStore";
import { useAuthStore } from "../store/useAuthStore";
import SearchResult from "./SearchResult";

const NoChatSelected = () => {
  const {
    searchResults,
    getFriendRequests,
    getFriends,
    isFriendsLoading,
    isFriendRequestsLoading,
  } = useRequestStore();
  const { authUser } = useAuthStore();

  // TODO: Move this to search bar? Figure out how to update search res buttons on clicking
  useEffect(() => {
    getFriendRequests();
    getFriends();
  }, [getFriendRequests, getFriends]);

  const isLoading = isFriendsLoading || isFriendRequestsLoading;

  return (
    <div className="w-full h-full flex flex-1 flex-col p-16 bg-base-100/50">
      <SearchBar />
      {isLoading ? (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-base-content/60">Loading...</p>
        </div>
      ) : searchResults.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center space-y-6">
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
        </div>
      ) : (
        searchResults
          .filter((user) => user._id !== authUser?._id)
          .map((user) => (
            <SearchResult
              key={user._id}
              id={user._id}
              username={user.fullName}
              profilePic={user.profilePic}
            />
          ))
      )}
    </div>
  );
};

export default NoChatSelected;
