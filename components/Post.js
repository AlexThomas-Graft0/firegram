import React from "react";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";

import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";

function Post({
  id,
  username,
  thumbnail,
  large,
}) {
  return (
    <div className="bg-white border rounded-sm shadow-md my-7">
      <div className="flex items-center p-5">
        <img
          src={thumbnail}
          alt={username}
          className="object-contain w-12 h-12 p-1 mr-3 border rounded-full"
        />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>
      <img src={large} alt="" className="object-cover w-full" />
      <div className="flex justify-between px-4 py-2">
        <div className="flex space-x-4 ">
          <HeartIcon className="text-red-500 btn" />
          <HeartIconFilled className="text-red-500 btn" />
          <ChatIcon className="btn" />
          <PaperAirplaneIcon className="btn" />
        </div>
        <BookmarkIcon className="btn" />
      </div>
      <p className="p-5 truncate">
        <span className="mr-1 font-bold">{username} </span>
        <span className="text-gray-600 truncate">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In et fugiat
          error est. Doloremque maiores inventore obcaecati molestiae sed ipsam
          omnis velit laboriosam, consequatur laborum cum cupiditate temporibus
          nulla debitis.
        </span>
      </p>
      <form className="flex items-center p-4">
        <EmojiHappyIcon className="h-5" />
        <input
          type="text"
          className="flex-1 border-none focus:ring-0"
          placeholder="Add a comment..."
        />
        <button className="font-semibold text-blue-400">Post</button>
      </form>
    </div>
  );
}

export default Post;
