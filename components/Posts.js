import React, { useState, useEffect } from "react";
import Post from "./Post";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getFakePosts = async () => {
      const response = await fetch("https://randomuser.me/api/?results=50");
      const data = await response.json();
      const posts = data.results.map((user) => ({
        id: user.login.uuid,
        ...user.name,
        ...user.picture,
        username: `${user.name.first}${user.name.last}`.toLowerCase(),
      }));
      setPosts(posts);
    };
    getFakePosts();
  }, []);

  return (
    <div className="container mx-auto">
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
}

export default Posts;
