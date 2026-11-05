import { useState } from "react";
import "../styles/PostCard.css";

function PostCard({ data, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(data.post);
  const [editedImage, setEditedImage] = useState(data.image);

  const handleSave = () => {
    data.post = editedText;
    data.image = editedImage;
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedText(data.post);
    setEditedImage(data.image);
    setIsEditing(false);
  };

  return (
    <div className="post-card">
      <div className="card-header">
        <h2>{data.platform}</h2>
      </div>

      {editedImage && (
        <img
          src={editedImage}
          alt="Uploaded"
          className="post-image"
        />
      )}

      {isEditing ? (
        <>
          <textarea
            className="edit-textarea"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />

          {data.platform === "Instagram" && (
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setEditedImage(
                  URL.createObjectURL(e.target.files[0])
                )
              }
            />
          )}

          <div className="button-group">
            <button
              className="save-btn"
              onClick={handleSave}
            >
              💾 Save
            </button>

            <button
              className="cancel-btn"
              onClick={handleCancel}
            >
              ❌ Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="post-content">{editedText}</p>

          <div className="button-group">
            <button
              className="edit-btn"
              onClick={() => setIsEditing(true)}
            >
              ✏ Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => onDelete(data.id)}
            >
              🗑 Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default PostCard;