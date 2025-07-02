import { useState, useEffect } from "react";

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
}

const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "iom2025",
};

const AUTH_STORAGE_KEY = "oim_admin_auth";

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    username: null,
  });

  useEffect(() => {
    // Check if user is already authenticated
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth);
        if (parsedAuth.isAuthenticated && parsedAuth.timestamp) {
          // Check if session is still valid (24 hours)
          const now = new Date().getTime();
          const sessionAge = now - parsedAuth.timestamp;
          const maxAge = 24 * 60 * 60 * 1000; // 24 hours

          if (sessionAge < maxAge) {
            setAuthState({
              isAuthenticated: true,
              username: parsedAuth.username,
            });
          } else {
            // Session expired
            localStorage.removeItem(AUTH_STORAGE_KEY);
          }
        }
      } catch (error) {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      const authData = {
        isAuthenticated: true,
        username,
        timestamp: new Date().getTime(),
      };

      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));

      setAuthState({
        isAuthenticated: true,
        username,
      });

      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setAuthState({
      isAuthenticated: false,
      username: null,
    });
    window.location.href = "/";
  };

  return {
    ...authState,
    login,
    logout,
  };
};
