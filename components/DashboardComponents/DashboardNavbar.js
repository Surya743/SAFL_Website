import { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {

  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";



export default function DashboardNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {logout} = useAuth()
  const router = useRouter();


  return (
    <header className="bg-violet-200">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/dashboard" className="-m-1.5 p-1.5">
            <span className="sr-only">SAFL</span>
            <img
              className="h-8 w-auto"
              src="/safl_logo.png"
              alt=""
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <a href="/dashboard" className="text-sm font-semibold leading-6 text-gray-900">
            Dashboard
          </a>
          <a href="/dashboard/leaderboard" className="text-sm font-semibold leading-6 text-gray-900">
            Leaderboard
          </a>
          <a href="/dashboard/room?name=japan" className="text-sm font-semibold leading-6 text-gray-900">
            Japan
          </a>
          <a href="/dashboard/room?name=germany" className="text-sm font-semibold leading-6 text-gray-900">
            Germany
          </a>
          <a href="/dashboard/room?name=spain" className="text-sm font-semibold leading-6 text-gray-900">
            Spain
          </a>
          <a href="/dashboard/room?name=france" className="text-sm font-semibold leading-6 text-gray-900">
            France
          </a>
          <a href="/dashboard/room?name=india" className="text-sm font-semibold leading-6 text-gray-900">
            India
          </a>
          <a href="/dashboard/room?name=korea" className="text-sm font-semibold leading-6 text-gray-900">
            Korea
          </a>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button onClick={() => {
            logout();
            router.push("/login")

            }} className="text-sm font-semibold leading-6 text-gray-900">
            Log Out <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/dashboard" className="-m-1.5 p-1.5">
              <span className="sr-only">SAFL</span>
              <img
                className="h-8 w-auto"
                src="/safl_logo.png"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="/dashboard/leaderboard"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Leaderboard
                </a>
                <a
                  href="/dashboard/room?name=japan"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Japan
                </a>
                <a
                  href="/dashboard/room?name=germany"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Germany
                </a>
                <a
                  href="/dashboard/room?name=spain"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Spain
                </a>
                <a
                  href="/dashboard/room?name=france"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  France
                </a>
                <a
                  href="/dashboard/room?name=india"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  India
                </a>
                <a
                  href="/dashboard/room?name=korea"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Korea
                </a>
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log Out
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}