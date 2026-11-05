function PostCard({
  post,
  currentUser,
  onEdit,
  onDelete,
}) {
  const isAdmin = currentUser.role === "Admin";

  const isEditor =
    currentUser.role === "Editor";

  const isOwner =
    currentUser.username === post.username;

  return (
    <div
      style={{
        background: "white",
        borderRadius: "18px",
        padding: "22px",
        marginBottom: "20px",
        boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h2
            style={{
              marginBottom: "10px",
            }}
          >
            {post.title}
          </h2>

          <p
            style={{
              color: "#555",
              lineHeight: "1.6",
            }}
          >
            {post.content}
          </p>

          <div
            style={{
              marginTop: "18px",
              color: "#666",
              lineHeight: "1.8",
            }}
          >
            <div>
              <b>Author:</b> {post.author}
            </div>

            <div>
              <b>Role:</b> {post.role}
            </div>

            <div>
              <b>Date:</b> {post.date}
            </div>
          </div>
        </div>

        <div
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            background: "#E4C1F9",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "28px",
            fontWeight: "bold",
            color: "#5B2C6F",
          }}
        >
          {post.author.charAt(0).toUpperCase()}
        </div>
      </div>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "12px",
        }}
      >
                {/* ADMIN */}
        {isAdmin && (
          <>
            <button
              onClick={() => onEdit && onEdit(post)}
              style={{
                background: "#FFD166",
                border: "none",
                padding: "10px 18px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              ✏ Edit
            </button>

            <button
              onClick={() => onDelete && onDelete(post.id)}
              style={{
                background: "#EF476F",
                color: "white",
                border: "none",
                padding: "10px 18px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              🗑 Delete
            </button>
          </>
        )}

        {/* EDITOR */}
        {isEditor && isOwner && (
          <button
            onClick={() => onEdit && onEdit(post)}
            style={{
              background: "#FFD166",
              border: "none",
              padding: "10px 18px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ✏ Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default PostCard;