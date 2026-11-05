import { Navigate } from "react-router-dom";
import { decodeToken } from "../utils/auth";

function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  const user = decodeToken(token);

  if (!user) {
    localStorage.removeItem("token");
    return <Navigate to="/" replace />;
  }

  if (user.exp < Date.now()) {
    localStorage.removeItem("token");
    return <Navigate to="/" replace />;
  }

  if (user.role !== allowedRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute;