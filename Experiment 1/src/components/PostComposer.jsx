import { useState } from "react";
import "../styles/PostComposer.css";
import PostCard from "./PostCard";

function PostComposer() {
  const [platform, setPlatform] = useState("Twitter");
  const [post, setPost] = useState("");
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [publishToggle, setPublishToggle] = useState(true);

  const limits = {
    Twitter: 280,
    Instagram: 2200,
    LinkedIn: 3000,
  };

  const limit = limits[platform];

  const deletePost = (id) => {
    setPosts(posts.filter((item) => item.id !== id));
  };

  const handlePublish = () => {
    if (post.trim() === "") {
      alert("Please write something.");
      return;
    }

    if (post.length > limit) {
      alert("Character limit exceeded!");
      return;
    }

    if (platform === "Instagram" && !image) {
      alert("Please upload an image.");
      return;
    }

    if (publishToggle) {
      const newPost = {
        id: Date.now(),
        platform,
        post,
        image,
      };

      setPosts((prevPosts) => [newPost, ...prevPosts]);

      alert("✅ Draft Published Successfully!");

      setPost("");
      setImage(null);
    } else {
      alert("❌ Publishing Failed! Try Again.");
    }

    setPublishToggle(!publishToggle);
  };

  return (
    <div className="container">
      <h1>Create Your Post</h1>

      <label>Select Platform</label>

      <select
        value={platform}
        onChange={(e) => {
          setPlatform(e.target.value);
          setPost("");
          setImage(null);
        }}
      >
        <option value="Twitter">Twitter/X</option>
        <option value="Instagram">Instagram</option>
        <option value="LinkedIn">LinkedIn</option>
      </select>

      <textarea
        placeholder="Write your post..."
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />

      <p>
        {post.length} / {limit} Characters
      </p>

      {post.length > limit && (
        <p className="error">Character limit exceeded!</p>
      )}

      {platform === "Instagram" && (
        <>
          <label>Upload Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(URL.createObjectURL(e.target.files[0]))
            }
          />
        </>
      )}

      <button onClick={handlePublish}>Publish</button>

      <hr />

      {posts.map((item) => (
        <PostCard
          key={item.id}
          data={item}
          onDelete={deletePost}
        />
      ))}
    </div>
  );
}

export default PostComposer;