import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // named import

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const decoded = jwtDecode(token);

      // Check expiration
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
      } else {
        setUser(decoded);
      }
    } catch (err) {
      localStorage.removeItem("token");
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };
};

