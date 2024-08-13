import { useContext, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { FaCartFlatbed } from "react-icons/fa6";
import { useNotifications } from "./hook/useNotifications";

export default function Header() {
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

  const { logout, user, admin } = useContext(UserContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/Login");
  };

  return (
    <header className="bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        <div className="flex lg:flex-1">
          <span className="text-sm font-semibold leading-6 text-gray-900">
            Your money, your choice!
          </span>
        </div>
        <div className="hidden lg:flex flex-1 justify-center space-x-8">
          <a href="#" className="text-gray-500 hover:text-gray-900">
            <span class="[&>svg]:h-5 [&>svg]:w-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 320 512"
              >
                <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
              </svg>
            </span>
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-900">
            <span class="[&>svg]:h-5 [&>svg]:w-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 448 512"
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
            </span>
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-900">
            <span class="[&>svg]:h-5 [&>svg]:w-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 512 512"
              >
                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
              </svg>
            </span>
          </a>
        </div>
        <div className="flex flex-1 justify-end">
          {(user && user.auth === true) || (admin && admin.auth === true) ? (
            <div className="lg:flex hidden">
              <Popover className="relative">
                <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold text-gray-900">
                  <span>
                    {user ? `Hello ${user.email}` : `Hello ${admin?.email}`}
                  </span>
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
            </div>
          ) : (
            <div className="lg:flex hidden">
              <a href="/Login" className="text-sm font-semibold text-gray-900">
                Login
              </a>
            </div>
          )}
          <div className="lg:hidden flex">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open options</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      <hr />
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt="Company Logo"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              className="h-10 w-auto"
            />
          </a>
        </div>
        <div className="hidden lg:flex flex-1 justify-center space-x-8">
          <a
            href="/User"
            className="text-lg font-semibold leading-6 text-gray-900"
          >
            About Us
          </a>
          <a
            href="/Genre"
            className="text-lg font-semibold leading-6 text-gray-900"
          >
            Contact
          </a>
          <a
            href="/Game"
            className="text-lg font-semibold leading-6 text-gray-900"
          >
            Location
          </a>
        </div>
        <div className="flex flex-1 justify-end">
          <Popover className="relative">
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
                className="size-9"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>
              {notificationCount > 0 && (
                <div className="absolute top-0 right-0 mt-[-4px] mr-[-4px] flex items-center justify-center w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full">
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
          <div className="relative flex ml-5">
            <a href="/Cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-9"
                href="/"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              <div className="absolute top-0 right-0 mt-[-4px] mr-[-4px] flex items-center justify-center w-6 h-6  bg-red-500 text-white text-xs font-bold rounded-full">
                1
              </div>
            </a>
          </div>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt="Company Logo"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              {(user && user.auth === true) ||
              (admin && admin.auth === true) ? (
                <div className="py-6">
                  <span className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 cursor-pointer">
                    {user ? `Hello ${user.email}` : `Hello ${admin?.email}`}
                  </span>
                </div>
              ) : (
                <></>
              )}
              <div className="space-y-2 py-6">
                <a
                  href="/User"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  User
                </a>
                <a
                  href="/Genre"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Genre
                </a>
                <a
                  href="/Game"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Game
                </a>
              </div>
              <div className="py-6">
                {(user && user.auth === true) || (admin && admin.auth === true) ? (
                  <a
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </a>
                ) : (
                  <a
                    href="/Login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
