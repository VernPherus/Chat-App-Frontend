import { Check, CrossIcon, X } from "lucide-react";
import React from "react";

function RequestNotification() {
  return (
    <div className="h-16 bg-base-100 flex flex-row justify-evenly items-center">
      <div className="relative mx-auto lg:mx-0">
        <img
          src="/avatar.png"
          alt=""
          className="size-12 object-cover rounded-full"
        />
      </div>
      <div className="flex flex-col">
        <h2 className="font-semibold">Username</h2>
        <span className="text-xs font-light text-base-content/60">
          Sent you a friend request.
        </span>
      </div>
      <div className="flext flex-row justify-evenly space-x-1">
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
