import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContex";

export default function ProtectedRoute({ children }) {
  const { currentUser, authLoading } = useAuth();

  if (authLoading) return <div className="text-white text-center mt-10">Loading...</div>;

  return currentUser ? children : <Navigate to="/login" />;
}
