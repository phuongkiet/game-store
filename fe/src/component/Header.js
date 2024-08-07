import { useContext, useState } from "react";
import { Dialog, DialogPanel, Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Bars3Icon, ChevronDownIcon, XMarkIcon, EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Header() {
	const { logout, user } = useContext(UserContext);
	const navigate = useNavigate();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const handleLogout = () => {
		logout();
		navigate("/Login");
	};

  return (
    <header className="bg-white">
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
              className="h-8 w-auto"
            />
          </a>
        </div>
        <div className="hidden lg:flex flex-1 justify-center space-x-8">
          <a
            href="/User"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            User
          </a>
          <a
            href="/Genre"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Genre
          </a>
          <a
            href="/Game"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Game
          </a>
        </div>
        <div className="flex flex-1 justify-end">
          {user && user.auth === true ? (
            <div className="lg:flex hidden">
              <Popover className="relative">
                <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold text-gray-900">
                  <span>{`Hello ${user.email}`}</span>
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
              {user && user.auth === true ? (
                <div className="py-6">
                  <span className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 cursor-pointer">
                    Hello {user.email}
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
                {user && user.auth === true ? (
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
