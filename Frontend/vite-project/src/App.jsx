import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Landing from "./pages/Landing";

function AppContent() {
  const location = useLocation();
  // Always enable dark mode for the app
  React.useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);
  return (
    <>
      {/* Navbar is included inside LandingPage and hidden on /login, /signup */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
