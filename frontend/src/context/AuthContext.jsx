import { createContext, useContext, useState } from "react";
import { loginApi } from "../api/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem("access_token"));

  const login = async (credentials) => {
    const res = await loginApi(credentials);
    localStorage.setItem("access_token", res.data.access_token);
    setUser(res.data.access_token);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
