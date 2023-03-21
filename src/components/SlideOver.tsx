import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useLocalStorage } from "usehooks-ts";
import DrawerItem from "./DrawerItem";
import type { TMDBShow } from "typings";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function SlideOver({ open, setOpen }: Props) {
  const router = useRouter();
  const path = router.asPath;

  const [preferredShows, setPreferredShows] = useLocalStorage<TMDBShow[]>(
    "shows",
    []
  );

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-xl md:max-w-sm">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll bg-base-100 py-6 shadow-xl">
                    <ul className="w-full space-y-8 bg-base-100 p-4 text-base-content">
                      <li
                        className="btn flex w-full items-center space-x-3"
                        onClick={() => {
                          setPreferredShows([]);
                        }}
                      >
                        <TrashIcon className="h-6 w-6" />
                        <p>Clear preferences</p>
                      </li>
                      {preferredShows?.map((show) => (
                        <li key={show.id}>
                          <DrawerItem show={show} />
                        </li>
                      ))}
                      {path === "/" ? (
                        <Link href="/reasons" className="btn w-full">
                          <ArrowRightIcon className="h-6 w-6" />
                        </Link>
                      ) : (
                        <Link href="/" className="btn w-full">
                          <ArrowLeftIcon className="h-6 w-6" />
                        </Link>
                      )}
                    </ul>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
