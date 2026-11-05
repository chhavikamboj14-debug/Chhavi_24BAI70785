import { createSelector } from "@reduxjs/toolkit";

const selectPosts = (state) => state.posts.posts;

export const selectAllPosts = createSelector(
  [selectPosts],
  (posts) => posts
);

export const selectTotalPosts = createSelector(
  [selectPosts],
  (posts) => posts.length
);

export const selectLatestPost = createSelector(
  [selectPosts],
  (posts) => (posts.length > 0 ? posts[posts.length - 1] : null)
);