import React, { useState, useEffect } from "react";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";

import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";

import { useSession } from "next-auth/react";

// import {  } from "@heroicons/react/outline";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

import { ref, getDownloadURL, uploadString } from "firebase/storage";

import { getTimeSince } from "../utils/getTimeSince";

function Post({ id, username, image, caption, profileImg, timestamp }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          setComments(snapshot.docs);
        }
      ),
    [id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
        setLikes(snapshot.docs);
      }),
    [id]
  );

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes]);

  const handleLike = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="bg-white border rounded-sm shadow-md my-7">
      <div className="flex items-center p-5">
        <img
          src={profileImg}
          alt={username}
          className="object-contain w-12 h-12 p-1 mr-3 border rounded-full"
        />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>
      <img src={image} alt="" className="object-cover w-full" />
      {session && (
        <div className="flex justify-between px-4 py-2">
          <div className="flex space-x-4 ">
            {hasLiked ? (
              <HeartIconFilled
                className="text-red-500 btn"
                onClick={handleLike}
              />
            ) : (
              <HeartIcon className="btn" onClick={handleLike} />
            )}
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}
      <p className="p-5 truncate">
        {likes.length && <p class="font-bold mb-1">{likes.length} likes</p>}
        <span className="mr-1 font-bold">{username} </span>
        <span className="text-gray-600 truncate">{caption}</span>
      </p>
      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-5" />
          <input
            type="text"
            className="flex-1 border-none outline-none focus:ring-0 focus:ring-blue-500"
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            value={comment}
          />
          <button
            className="font-semibold text-blue-400"
            disabled={!comment.trim()}
            type="submit"
            onClick={(e) => sendComment(e)}
          >
            Post
          </button>
        </form>
      )}
      {comments.length > 0 && (
        <div className="h-20 ml-10 overfloy-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment, i) => (
            <div
              className="flex items-center justify-between mb-3 space-x-2"
              key={comment.id}
            >
              <img
                src={comment.data().userImage}
                alt=""
                className="rounded-full h-7"
              />
              <p className="flex-1 text-sm">
                <span className="font-bold">{comment.data().username}</span>
                <span className="mx-1 text-gray-600 truncate">
                  {comment.data().comment}
                </span>
              </p>
              <span className="pr-5 text-xs text-gray-600">
                {getTimeSince(comment?.data()?.timestamp?.toDate())} ago
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Post;
