import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#FFE5EC,#E0C3FC,#D6F6FF,#E4FDE1)",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.4)",
          backdropFilter: "blur(18px)",
          padding: "40px",
          borderRadius: "20px",
          textAlign: "center",
          width: "450px",
          boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
        }}
      >
        <h1>🚫 Access Denied</h1>

        <p>
          You are not authorized to access this page.
        </p>

        <Link to="/">
          <button
            style={{
              marginTop: "20px",
              padding: "12px 25px",
              border: "none",
              borderRadius: "12px",
              background: "#8B5CF6",
              color: "white",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Go to Login
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Unauthorized;