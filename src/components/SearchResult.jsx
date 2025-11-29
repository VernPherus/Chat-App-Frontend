import { UserPlus2, X } from "lucide-react";
import { useRequestStore, RequestStatus } from "../store/useRequestStore";
import toast from "react-hot-toast";

function SearchResult({ id, username, fullName, profilePic }) {
  const {
    sendFriendRequest,
    cancelFriendRequest,
    friends,
    requests,
  } = useRequestStore();

  //* Normalize friends array from, friends: [{friends: []}], to friends = []
  const normalizedFriends =
    Array.isArray(friends) && friends[0]?.friends
      ? friends[0].friends
      : friends;

  //* Check if already friends:
  const isFriend = normalizedFriends.includes(id);

  //* Check for incoming requests
  const incomingRequest = requests.find(
    (r) => r.senderId === id && r.status == "p"
  );

  //* Check for outgoing requests
  const outgoingRequest = requests.find(
    (r) => r.receiverId === id && r.status == "p"
  );

  const handleSendRequest = async () => {
    try {
      await sendFriendRequest(id);
    } catch (error) {
      toast.error("Failed to send friend request: ", error);
    }
  };

  const handleCancelRequest = async () => {
    try {
      await cancelFriendRequest(id);
    } catch (error) {
      toast.error("Failed to cancel friend request: ", error);
    }
  };

  const renderButton = () => {
    if (isFriend) {
      return (
        <button className="btn btn-sm bg-base-200 border-base-content" disabled>
          <span>Already friends</span>
        </button>
      )
    }
    if (incomingRequest) {
      return (
        <button className="btn btn-sm bg-base-200 border-base-content" disabled>
          <span>Requested you</span>
        </button>
      )
    }
    if (outgoingRequest) {
      return (
        <button
          onClick={handleCancelRequest}
          className="btn btn-sm bg-base-200 border-base-content"
        >
          <X />
          <span className="hidden sm:inline">Unsend friend request</span>
        </button>
      )
    }

    return (
      <button
        onClick={handleSendRequest}
        className="btn btn-sm bg-base-100 border-base-content"
      >
        <UserPlus2 />
        <span className="hidden sm:inline">Add friend</span>
      </button>
    )
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
          {renderButton()}
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
