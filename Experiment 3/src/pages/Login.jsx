import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/Login.css";

import users from "../data/users";
import { generateToken } from "../utils/auth";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) =>
        u.username === username &&
        u.password === password
    );

    if (!user) {
      alert("Invalid Username or Password");
      return;
    }

    const token = generateToken({
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
    });

    localStorage.setItem("token", token);

    if (user.role === "Admin") {
      navigate("/admin");
    } else if (user.role === "Editor") {
      navigate("/editor");
    } else {
      navigate("/viewer");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="title">🔐 Welcome Back</h1>

        <p className="subtitle">
          JWT Authentication & Role Based Access Control
        </p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>👤 Username</label>

            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>🔒 Password</label>

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="login-btn" type="submit">
            Login
          </button>
        </form>

        <hr
          style={{
            margin: "25px 0",
          }}
        />

        <h3>Demo Credentials</h3>

        <p>
          <b>Admin</b><br />
          Username: admin01<br />
          Password: admin123
        </p>

        <p>
          <b>Editor</b><br />
          Username: editor01<br />
          Password: editor123
        </p>

        <p>
          <b>Viewer</b><br />
          Username: viewer01<br />
          Password: viewer123
        </p>
      </div>
    </div>
  );
}

export default Login;
