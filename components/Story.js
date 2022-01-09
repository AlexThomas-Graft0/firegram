import React from "react";

function Story({ img, username }) {
  return (
    <div>
      <img
        className="rounded-full h-14 w-14 p-[1.5px]
        bg-gradient-to-tr from-violet-500 via-purple-500 to-indigo-500 border-2 cursor-pointer object-contain hover:scale-110 transition transform duration-200 ease-out"
        src={img}
        alt={""}
      />
      <p className="text-xs text-center truncate w-14">{username}</p>
    </div>
  );
}

export default Story;
