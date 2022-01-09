import React, { useState, useEffect } from "react";
import faker from "faker";

function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const getFakeUsers = async () => {
      const response = await fetch("https://randomuser.me/api/?results=5");
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
    <div className="mt-4 ml-10">
      <div className="flex justify-between mb-5 text-sm">
        <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
        <button className="font-semibold text-gray-600">See All</button>
      </div>
      {suggestions.map((suggestion) => (
        <div
          className="flex items-center justify-between mt-3"
          key={suggestion.id}
        >
          <img
            src={suggestion.thumbnail}
            alt={suggestion.username}
            className="rounded-full w-10 h-10 border p-[2px]"
          />
          <div className="flex-1 ml-4">
            <h2 className="font-semibold ">{suggestion.username}</h2>
            {/* <h3 className="text-sm text-gray-400">{suggestion.company.name}</h3> */}
          </div>
          <button className="text-xs font-bold text-blue-400">Follow</button>
        </div>
      ))}
    </div>
  );
}

export default Suggestions;
