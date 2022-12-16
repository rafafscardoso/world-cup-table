import { Fragment } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import Image from "next/image";

export default function Header() {
  const { data: sessionData } = useSession();

  return (
    <Disclosure as="nav" className="fixed top-0 z-10 h-16 w-full bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-end">
          <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            {sessionData ? (
              <Menu as="div" className="relative ml-3">
                <Menu.Button className="flex items-center gap-1 rounded-full bg-slate-200 p-2 text-sm">
                  {sessionData.user?.name}
                  {sessionData.user?.image ? (
                    <div className="relative h-8 w-8 overflow-hidden rounded-full">
                      <Image
                        className="object-cover"
                        fill
                        src={sessionData.user.image}
                        alt="user_image"
                      />
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gray-500"></div>
                  )}
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-slate-200 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      <button
                        type="button"
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700"
                        onClick={() => signOut()}
                      >
                        Sign out
                      </button>
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <button
                className="flex items-center gap-1 rounded-full bg-slate-200 p-2 text-sm"
                onClick={() => signIn()}
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
