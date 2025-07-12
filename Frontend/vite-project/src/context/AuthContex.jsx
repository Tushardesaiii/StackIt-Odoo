// context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get("/api/v1/users/me", { withCredentials: true });
      setCurrentUser(res.data.data);
    } catch (error) {
      setCurrentUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
