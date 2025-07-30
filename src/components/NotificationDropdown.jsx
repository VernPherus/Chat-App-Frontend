import React, { useState } from 'react'
import {Bell, BellDot, BellDotIcon,} from 'lucide-react';

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
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md focus:outline-none bg-base-100">
          <div className="py-1">
            <p>test</p>
            <p>test</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationDropdown