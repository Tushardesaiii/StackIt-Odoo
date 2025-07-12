// App.jsx
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContex.jsx";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";
import Navbar from "./Components/Navbar";
import Question from "./pages/Question.jsx";

function AppContent() {
  const location = useLocation();
  const { currentUser, authLoading } = useAuth();

  // Always enable dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // Hide Navbar on auth routes
  const hideNavbar = ["/login", "/signup"].includes(location.pathname);

  if (authLoading) return <div className="p-4">Loading...</div>;

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/login"
          element={currentUser ? <Navigate to="/feed" /> : <Login />}
        />
        <Route
          path="/signup"
          element={currentUser ? <Navigate to="/feed" /> : <Signup />}
        />
        <Route
          path="/feed"
          element={
            currentUser ? <Feed /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/question"
          element={
            currentUser ? <Question /> : <Navigate to="/login" replace />
          }
        />
        {/* Optional: 404 fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
