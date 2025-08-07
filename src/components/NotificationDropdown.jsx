import React, { useState } from 'react'
import {Bell, BellDot, BellDotIcon,} from 'lucide-react';
import RequestNotification from './RequestNotification';

const NotificationDropdown = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={toggleDropdown}
          className="flex btn btn-sm gap-2 items-center"
        >
          <Bell className="size-5" />
        </button>
      </div>
      {isOpen && (
        <div className="overflow-y-auto origin-top-right absolute right-0 mt-2 h-80 w-80 rounded-md focus:outline-none bg-base-300">
          <div className="px-6 py-2 bg-base-200 rounded-t-md border-b-2 border-b-base-content">
            <span className="flex align-middle font-bold">Notifications</span>
          </div>
          <div className="py-1">
            <RequestNotification username="Bill Wortzwic" />
            <RequestNotification username="Mark Greyson" />
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationDropdown