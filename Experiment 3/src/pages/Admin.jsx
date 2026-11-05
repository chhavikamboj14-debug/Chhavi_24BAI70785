import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { decodeToken } from "../utils/auth";
import { usePosts } from "../context/PostContext";

import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

function Admin() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const currentUser = decodeToken(token);

  const {
    posts,
    addPost,
    updatePost,
    deletePost,
  } = usePosts();

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

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (confirmDelete) {
      deletePost(id);
    }
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.author.toLowerCase().includes(search.toLowerCase())
  );

  const totalPosts = posts.length;

  const totalEditors = posts.filter(
    (post) => post.role === "Editor"
  ).length;

  const totalViewers = posts.filter(
    (post) => post.role === "Viewer"
  ).length;

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
            <h1>👑 Admin Dashboard</h1>

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

        {/* STATS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              background: "#FFD6E8",
              padding: "25px",
              borderRadius: "18px",
            }}
          >
            <h3>Total Posts</h3>

            <h1>{totalPosts}</h1>
          </div>

          <div
            style={{
              background: "#DCCEFF",
              padding: "25px",
              borderRadius: "18px",
            }}
          >
            <h3>Editor Posts</h3>

            <h1>{totalEditors}</h1>
          </div>

          <div
            style={{
              background: "#D6F6FF",
              padding: "25px",
              borderRadius: "18px",
            }}
          >
            <h3>Viewer Posts</h3>

            <h1>{totalViewers}</h1>
          </div>
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

        {/* POSTS */}

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
              onEdit={(selectedPost) =>
                setEditingPost(selectedPost)
              }
              onDelete={handleDelete}
            />
          ))
        )}

        {/* ADMIN INFORMATION */}

        <div
          style={{
            marginTop: "40px",
            padding: "25px",
            borderRadius: "18px",
            background: "rgba(255,255,255,0.65)",
            boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
          }}
        >
          <h2>👑 Admin Permissions</h2>

          <ul
            style={{
              marginTop: "15px",
              lineHeight: "2",
              fontSize: "17px",
            }}
          >
            <li>✅ Create Unlimited Posts</li>
            <li>✅ Edit Every Post</li>
            <li>✅ Delete Every Post</li>
            <li>✅ View All Users' Posts</li>
            <li>✅ Manage Complete Platform</li>
          </ul>
        </div>
              </div>
    </div>
  );
}

export default Admin;