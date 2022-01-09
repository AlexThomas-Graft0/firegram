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
import Stories from "../components/Stories";
import Posts from "./Posts";
import MiniProfile from "../components/MiniProfile";
import Suggestions from "../components/Suggestions";
import { useSession } from "next-auth/react";

function Feed() {
  const { data: session } = useSession();
  return (
    <main
      className={`grid grid-cols-1 mx-auto md:grid-cols-2 xl:grid-cols-3 md:max-width-3xl xl:max-width-6xl
      ${!session && "!grid-cols-1 !max-w-3xl"}`}
    >
      <section className="col-span-2">
        <Stories />

        <Posts />
      </section>
      {session && (
        <section>
          <div className="fixed">
            <MiniProfile />
            <Suggestions />
          </div>
        </section>
      )}
    </main>
  );
}

export default Feed;
