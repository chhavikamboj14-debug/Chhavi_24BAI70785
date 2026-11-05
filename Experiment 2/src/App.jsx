import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPost, deletePost } from "./redux/postsSlice";
import { selectAllPosts, selectTotalPosts } from "./redux/selectors";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");

  const posts = useSelector(selectAllPosts);
  const totalPosts = useSelector(selectTotalPosts);

  const dispatch = useDispatch();

  const handleAdd = () => {
    if (title.trim() === "") return;

    dispatch(
      addPost({
        id: Date.now(),
        title,
      })
    );

    setTitle("");
  };

  return (
    <div className="container">
      <h1>🌸 Redux Post Manager</h1>
      <h3>Total Posts: {totalPosts}</h3>

      <div className="input-box">
        <input
          type="text"
          placeholder="What's on your mind?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={handleAdd}>Add Post</button>
      </div>

      <div className="posts">
        {posts.length === 0 ? (
          <p className="empty">No posts yet. Add your first post! 💕</p>
        ) : (
          posts.map((post) => (
            <div className="post-card" key={post.id}>
              <p>{post.title}</p>

              <button
                className="delete-btn"
                onClick={() => dispatch(deletePost(post.id))}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;