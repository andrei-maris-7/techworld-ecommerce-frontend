import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/outline";
import { useContext } from "react";
import Link from "next/link";

import AuthContext from "../context/AuthContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {() => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                {/* Desktop */}
                <div className="hidden sm:flex-shrink-0 sm:flex sm:items-center">
                  <Link href="/">
                    <a>
                      <img
                        className="lg:block h-12 w-auto"
                        src="/techworld.png"
                        alt="Techworld"
                      />
                    </a>
                  </Link>
                </div>
                {/* Mobile */}
                <div className="flex-shrink-0 sm:hidden flex items-center">
                  <Link href="/">
                    <a>
                      <img
                        className="lg:block h-12 w-auto"
                        src="/techworld-single.png"
                        alt="Techworld"
                      />
                    </a>
                  </Link>
                </div>
              </div>

              <div className="flex items-center">
                {user ? (
                  <div className="flex md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                    <Menu as="div" className="ml-3 relative">
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-indigo-500">
                              <span className="sr-only ">Open user menu</span>
                              <UserIcon className="h-6 w-6 md:h-8 md:w-8 rounded-full " />
                            </Menu.Button>
                          </div>

                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              static
                              className="origin-top-left absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              <Menu.Item>
                                {({ active }) => (
                                  <Link href="/orders">
                                    <a
                                      href="#"
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      My orders
                                    </a>
                                  </Link>
                                )}
                              </Menu.Item>

                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                    onClick={logoutUser}
                                  >
                                    Log out
                                  </a>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>

                    <div className="ml-2 mt-0.5 md:ml-4">
                      <p className="text-xs whitespace-nowrap  md:text-sm text-gray-500">
                        <span className="hidden sm:inline text-gray-500 font-semibold">
                          Logged in as:
                        </span>{" "}
                        <span className="text-xs md:text-sm">{user.email}</span>
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex-shrink-0">
                    <Link href="/login">
                      <a>
                        <button
                          type="button"
                          className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <span>Log In</span>
                        </button>
                      </a>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
