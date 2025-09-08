import React, { useEffect, useState } from 'react'
import { Bell, BellDot, BellDotIcon, } from 'lucide-react';
import RequestNotification from './RequestNotification';
import NoNotifications from './NoNotifications';
import { useRequestStore } from '../store/useRequestStore';

const NotificationDropdown = () => {

  const [isOpen, setIsOpen] = useState(false);
  const { requests, getFriendRequests, hasCheckedNotifications, hasNewNotifications } = useRequestStore();

  const requestNotif = requests;

  useEffect(() => {
    getFriendRequests()
  }, [getFriendRequests])

  // const requestNotif = null

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
          {
            <div className="py-1">
              {
                requestNotif.map((notif) => (
                  <RequestNotification username={notif.senderName} profilePic={notif.senderProfile} />
                ))
              }
              {
                requestNotif.length === 0 && (
                  <NoNotifications />
                )
              }
            </div>
          }

        </div>
      )}
    </div>
  );
}

export default NotificationDropdown