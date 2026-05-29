import React, { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "../services/supabaseApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("devbank_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (email, password) => {
    setLoading(true);
    setError("");
    try {
      const res = await authApi.login(email, password);
      setUser(res.user);
      localStorage.setItem("devbank_user", JSON.stringify(res.user));
      localStorage.setItem("devbank_token", res.token);
      return true;
    } catch (e) {
      setError(e.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
    localStorage.removeItem("devbank_user");
    localStorage.removeItem("devbank_token");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, logout, setError }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
