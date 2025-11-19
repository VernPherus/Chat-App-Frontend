import { UserPlus2, X } from "lucide-react";
import { useRequestStore, RequestStatus } from "../store/useRequestStore";
import toast from "react-hot-toast";

function SearchResult({ id, username, fullName, profilePic }) {
  const {
    sendFriendRequest,
    cancelFriendRequest,
    requests,
  } = useRequestStore();

  // TODO: I broke something, I was going to use a switch case to change the button dynamically, however what I didn't take into account is that this would not work because I was taking the requests as a whole and not an individual request, I'm just gonna figure out a way to first check if the request exists, then check the status then later decide which button to use

  const existingRequest = requests.find(
    (r) => r.receiverId === id && r.status === "p"
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

  const renderButton = (requestStatus) => {
    switch (requestStatus) {
      case "p":
        return <button
          onClick={handleCancelRequest}
          className="btn btn-sm bg-base-200 border-base-content"
        >
          <X />
          <span className="hidden sm:inline">Unsend friend request</span>
        </button>;

      case "a":
        return <button
          className="btn btn-sm bg-base-200 border-base-content disabled:"
        >
          <X />
          <span className="hidden sm:inline">Already Friends!t</span>
        </button>
      default:
        return <button
          onClick={handleSendRequest}
          className="btn btn-sm bg-base-100 border-base-content"
        >
          <UserPlus2 />
          <span className="hidden sm:inline">Add friend</span>
        </button>;
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
          {
            renderButton(requests.status)
          }

          {

          /* {!existingRequest ? (
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
          )} */}
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
