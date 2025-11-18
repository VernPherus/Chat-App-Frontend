import { Check, X } from "lucide-react";
import React from "react";
import { useRequestStore } from "../store/useRequestStore"
import toast from "react-hot-toast";

function RequestNotification({requestId, username, profilePic}) {

  const { acceptFriendRequest, rejectFriendRequest } = useRequestStore();

  const handleAcceptFriendRequest = async () => {
    try {
      await acceptFriendRequest()
    } catch (error) {
      toast.error("Failed to accept request: ", error)
    }
  }

  const handleRejectFriendRequest = async () => {
    try {
      await rejectFriendRequest()
    } catch (error) {
      toast.error("Failed to accept request: ", error)
    }
  }

  return (
    <div className="h-16 bg-base-100 flex flex-row justify-evenly items-center">
      <div className="relative mx-auto lg:mx-0">
        <img
          src={profilePic || "/avatar.png"}
          alt=""
          className="size-12 object-cover rounded-full"
        />
      </div>
      <div className="flex flex-col">
        <h2 className="font-semibold">{username}</h2>
        <span className="text-xs font-light text-base-content/60">
          Sent you a friend request.
        </span>
      </div>
      <div className="flex flex-row justify-evenly space-x-1">
        <button className="btn btn-sm bg-base-100 border-base-content btn-circle">
          <Check size={22} />
        </button>
        <button className="btn btn-sm bg-base-100 border-base-content btn-circle">
          <X size={22} />
        </button>
      </div>
    </div>
  );
}

export default RequestNotification;
