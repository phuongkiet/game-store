import React from "react";
import { useContext, useState } from "react";
import Sidebar from "./Sidebar";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "./hook/useNotifications";

const Admin = (props) => {
  const {
    notificationCount,
    notificationMessages,
    showAllMessages,
    setShowAllMessages,
    resetNotificationCount,
  } = useNotifications();

  const displayedMessages = showAllMessages
    ? notificationMessages
    : notificationMessages.slice(0, 5);
    
  const { logout, admin } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/Login");
  };
  return (
    <div className="h-full flex">
      <div className="">
        <Sidebar />
      </div>
      <div className="w-full">
        {/* Header */}
        <header className="py-4 px-4 flex flex-1 justify-end bg-gray-800">
          <Popover className="relative mr-3">
            <PopoverButton
              className="relative flex items-center"
              onClick={() => {
                setShowAllMessages(false);
                resetNotificationCount();
              }}
              onBlur={() => {
                resetNotificationCount();
                setShowAllMessages(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-7 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>
              {notificationCount > 0 && (
                <div className="absolute top-0 right-0 mt-[-4px] mr-[-4px] flex items-center justify-center w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full">
                  {notificationCount}
                </div>
              )}
            </PopoverButton>

            <PopoverPanel className="absolute right-0 z-10 mt-2 w-80 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Notifications
                </h3>
                {notificationMessages && notificationMessages.length > 0 ? (
                  <>
                    <ul className="mt-4 space-y-2">
                      {displayedMessages.map((message, index) => (
                        <li
                          key={index}
                          className="p-2 bg-gray-100 rounded-md shadow-sm"
                        >
                          {message}
                        </li>
                      ))}
                    </ul>
                    {notificationMessages.length > 5 && !showAllMessages && (
                      <button
                        onClick={() => setShowAllMessages(true)}
                        className="mt-4 text-blue-500"
                      >
                        See more
                      </button>
                    )}
                  </>
                ) : (
                  <p className="text-gray-500">No notifications</p>
                )}
              </div>
            </PopoverPanel>
          </Popover>
          <div className="lg:flex hidden relative">
            {admin && admin.auth === true && (
              <Popover className="relative">
                <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold text-gray-900">
                  <span className="text-white text-md">{`Hello ${admin.email}`}</span>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-400"
                  />
                </PopoverButton>
                <PopoverPanel className="absolute z-10 mt-3 w-full transform -translate-x-1/2 left-1/2">
                  <div className="overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                    <div className="p-4">
                      <div className="flex flex-col gap-y-2">
                        <a
                          className="block font-semibold text-gray-900 cursor-pointer"
                          onClick={handleLogout}
                        >
                          Logout
                        </a>
                      </div>
                    </div>
                  </div>
                </PopoverPanel>
              </Popover>
            )}
          </div>
        </header>
        {/* Content */}
        <>{props.children}</>
      </div>
    </div>
  );
};

export default Admin;
