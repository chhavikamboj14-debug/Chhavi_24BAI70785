import { useState, useEffect } from "react";

function PostForm({ onSave, editingPost, currentUser }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setContent(editingPost.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [editingPost]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please fill all fields");
      return;
    }

    onSave({
      id: editingPost ? editingPost.id : Date.now(),
      title,
      content,
      author: currentUser.name,
      username: currentUser.username,
      role: currentUser.role,
      date: new Date().toLocaleDateString(),
    });

    setTitle("");
    setContent("");
  };

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.6)",
        padding: "25px",
        borderRadius: "18px",
        marginBottom: "30px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
      }}
    >
      <h2>
        {editingPost ? "✏ Edit Post" : "➕ Create New Post"}
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            marginBottom: "15px",
          }}
        />

        <textarea
          placeholder="Write your post..."
          rows="5"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            marginBottom: "20px",
            resize: "none",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "12px 25px",
            border: "none",
            borderRadius: "10px",
            background: "#8B5CF6",
            color: "white",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {editingPost ? "Update Post" : "Publish Post"}
        </button>
      </form>
    </div>
  );
}

export default PostForm;