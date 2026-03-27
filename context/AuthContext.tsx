"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { getStoredToken, getStoredUser, persistAuthSession, clearAuthStorage } from "@/lib/auth";
import type { AuthResponse, User, UserRole } from "@/types";

type AuthContextType = {
  user: User | null;
  token: string | null;
  isReady: boolean;
  login: (payload: any) => Promise<void>;
  register: (payload: any) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedToken = getStoredToken();
    const storedUser = getStoredUser();
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
    setIsReady(true);
  }, []);

  const login = async (payload: any) => {
    const res = await api<AuthResponse>("/auth/login", {
      method: "POST",
      body: payload,
      auth: false,
    });
    persistAuthSession(res.token, res.user);
    setToken(res.token);
    setUser(res.user);
    redirectToDashboard(res.user.role);
  };

  const register = async (payload: any) => {
    const res = await api<AuthResponse>("/auth/register", {
      method: "POST",
      body: payload,
      auth: false,
    });
    persistAuthSession(res.token, res.user);
    setToken(res.token);
    setUser(res.user);
    redirectToDashboard(res.user.role);
  };

  const logout = () => {
    clearAuthStorage();
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  const redirectToDashboard = (role: UserRole) => {
    switch (role) {
      case "SENDER":
        router.push("/sender/dashboard");
        break;
      case "COURIER":
        router.push("/courier/dashboard");
        break;
      case "RECEIVER":
        router.push("/receiver/dashboard");
        break;
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, isReady, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
