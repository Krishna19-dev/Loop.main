"use client";

import React, { createContext, useContext, useState } from "react";
import { User } from "@/types/auth";
import { authService } from "@/services/auth.service";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => User;
  register: (name: string, email: string, pass: string) => User;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser());
  const loading = false;

  const login = (email: string, pass: string) => {
    const loggedInUser = authService.login(email, pass);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const register = (name: string, email: string, pass: string) => {
    const registeredUser = authService.register(name, email, pass);
    setUser(registeredUser);
    return registeredUser;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}