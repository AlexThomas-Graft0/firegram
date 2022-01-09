import faker from "faker";
import React, { useState, useEffect } from "react";
import Story from "../components/Story";
import { useSession } from "next-auth/react";

function Stories() {
  const [suggestions, setSuggestions] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const getFakeUsers = async () => {
      const response = await fetch("https://randomuser.me/api/?results=50");
      const data = await response.json();
      const users = data.results.map((user) => ({
        id: user.login.uuid,
        ...user.name,
        ...user.picture,
        username: `${user.name.first}${user.name.last}`.toLowerCase(),
      }));
      setSuggestions(users);
    };
    getFakeUsers();
  }, []);

  return (
    <div className="flex p-6 mt-8 space-x-2 overflow-x-scroll bg-white border-gray-200 rounded-sm scrollbar-thumb-black scrollbar-thin scrollbar-rounded">
      {session?.user && (
        <Story img={session?.user?.image} username={session?.user?.username} />
      )}
      {suggestions.map((profile) => (
        <Story
          key={profile.id}
          img={profile.thumbnail}
          username={profile.username}
        />
      ))}
    </div>
  );
}

export default Stories;
