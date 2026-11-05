import { createContext, useContext, useEffect, useState } from "react";
import initialPosts from "../data/posts";

const PostContext = createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem("posts");

    return savedPosts ? JSON.parse(savedPosts) : initialPosts;
  });

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const addPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const updatePost = (updatedPost) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      )
    );
  };

  const deletePost = (id) => {
    setPosts((prev) =>
      prev.filter((post) => post.id !== id)
    );
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        addPost,
        updatePost,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  return useContext(PostContext);
}