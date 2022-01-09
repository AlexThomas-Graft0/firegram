import {
  SearchIcon,
  userIcon,
  homeIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import Image from "next/image";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { modalState } from "../atoms/ModalAtom";
import { useRecoilState } from "recoil";

function Header() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="sticky top-0 z-20 bg-white shadow-lg">
      <div
        className="flex justify-between max-w-6xl mx-5 xl:mx-auto"
        onClick={() => router.push("/")}
      >
        {/* Left */}
        <div className="relative hidden w-24 cursor-pointer lg:inline-block">
          <Image
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="relative flex-shrink-0 w-24 ml-1 cursor-pointer lg:hidden">
          <Image
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            layout="fill"
            objectFit="contain"
          />
        </div>
        {/* Left */}

        {/* Middle */}
        <div className="max-width-xs">
          <div className="relative p-3 mt-1 rounded-md">
            <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon className="w-5 h-5 text-gray-500" />
            </div>
            <input
              className="block w-full pl-10 border-gray-300 rounded-md bg-gray-50 sm:text-sm focus:ring-black focus:border-black"
              type="text"
              placeholder="Search..."
            />
          </div>
        </div>
        {/* Middle */}
        {/* Right */}
        <div className="flex items-center justify-end space-x-1">
          <HomeIcon className="navBtn" onClick={() => router.push("/")} />
          <MenuIcon className="w-10 h-6 cursor-pointer md:hidden" />
          {session ? (
            <>
              <div className="relative navBtn">
                <PaperAirplaneIcon className="rotate-45 navBtn" />
                <div className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-1 -right-2 animate-pulse">
                  3
                </div>
              </div>

              <PlusCircleIcon
                className="navBtn"
                onClick={() => setOpen(true)}
              />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />
              <img
                title="Sign Out"
                src={session?.user?.image}
                className="w-10 h-10 rounded-full cursor-pointer"
                alt="Avatar"
                onClick={signOut}
              />
            </>
          ) : (
            <button
              title="Sign In"
              onClick={() => signIn("google")}
              className="navBtn"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Right */}
      </div>
    </div>
  );
}

export default Header;
