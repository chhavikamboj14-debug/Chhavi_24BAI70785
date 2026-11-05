import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { decodeToken } from "../utils/auth";
import { usePosts } from "../context/PostContext";

import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

function Editor() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const currentUser = decodeToken(token);

  const { posts, addPost, updatePost } = usePosts();

  const [editingPost, setEditingPost] = useState(null);
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSave = (post) => {
    if (editingPost) {
      updatePost(post);
      setEditingPost(null);
    } else {
      addPost(post);
    }
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#FDE2E4,#E2F0CB,#D6E5FA,#E4C1F9)",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "1250px",
          margin: "auto",
        }}
      >
        {/* HEADER */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "35px",
          }}
        >
          <div>
            <h1>✍ Editor Dashboard</h1>

            <h3>
              Welcome, {currentUser.name}
            </h3>

            <p>
              Role : {currentUser.role}
            </p>
          </div>

          <button
            onClick={handleLogout}
            style={{
              background: "#B388EB",
              color: "white",
              border: "none",
              padding: "12px 28px",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Logout
          </button>
        </div>

        <PostForm
          onSave={handleSave}
          editingPost={editingPost}
          currentUser={currentUser}
        />
                {/* SEARCH BAR */}

        <div
          style={{
            marginBottom: "25px",
          }}
        >
          <input
            type="text"
            placeholder="🔍 Search posts by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "12px",
              border: "none",
              outline: "none",
              fontSize: "16px",
              background: "rgba(255,255,255,0.75)",
              boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
            }}
          />
        </div>

        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          📚 All Posts
        </h2>

        {filteredPosts.length === 0 ? (
          <div
            style={{
              background: "rgba(255,255,255,0.7)",
              padding: "35px",
              borderRadius: "18px",
              textAlign: "center",
              fontSize: "18px",
            }}
          >
            No posts found.
          </div>
        ) : (
          filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUser={currentUser}
              onEdit={
                post.username === currentUser.username
                  ? (selectedPost) => setEditingPost(selectedPost)
                  : null
              }
              onDelete={null}
            />
          ))
        )}

        <div
          style={{
            marginTop: "40px",
            padding: "25px",
            borderRadius: "18px",
            background: "rgba(255,255,255,0.65)",
            boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
          }}
        >
          <h2>✍ Editor Permissions</h2>

          <ul
            style={{
              marginTop: "15px",
              lineHeight: "2",
              fontSize: "17px",
            }}
          >
            <li>✅ Create New Posts</li>
            <li>✅ Edit Your Own Posts</li>
            <li>❌ Cannot Delete Posts</li>
            <li>✅ View All Posts</li>
          </ul>
        </div>
              </div>
    </div>
  );
}

export default Editor;