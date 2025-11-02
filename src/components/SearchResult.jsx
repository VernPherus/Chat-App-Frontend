import React, { useEffect } from "react";
import { UserPlus2, X } from "lucide-react";
import { useRequestStore } from "../store/useRequestStore";

function SearchResult({ id, username, fullName, profilePic }) {
  const {
    sendFriendRequest,
    getFriendRequests,
    cancelFriendRequest,
    requests,
  } = useRequestStore();

  useEffect(() => {
    getFriendRequests();
  });

  const existingRequest = requests.find(
    (r) => r.receiverId === id && r.status === "p"
  );

  const handleSendRequest = async () => {
    try {
      await sendFriendRequest(id);
    } catch (error) {
      console.error("Failed to send friend request: ", error);
    }
  };

  const handleCancelRequest = async () => {
    try {
      await cancelFriendRequest(id);
    } catch (error) {
      console.error("Failed to cancel friend request: ", error);
    }
  };

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex flex-row justify-between">
        <div className="flex items-center gap-3 w-full">
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={profilePic || "/avatar.png"}
                alt={fullName}
                className="size-12 object-cover rounded-full"
              />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <h2 className="font-semibold">{username}</h2>
          </div>

          {!existingRequest ? (
            <button
              onClick={handleSendRequest}
              className="btn btn-sm bg-base-100 border-base-content"
            >
              <UserPlus2 />
              <span className="hidden sm:inline">Add friend</span>
            </button>
          ) : (
            <button
              onClick={handleCancelRequest}
              className="btn btn-sm bg-base-200 border-base-content"
            >
              <X />
              <span className="hidden sm:inline">Unsend friend request</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
