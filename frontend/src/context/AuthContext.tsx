import React, { createContext, useContext, useEffect, useState } from "react";
import type User from "../interfaces/user_interface";
import { toast } from "sonner";

type AuthContextType = {
  user: User | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (ctx === undefined)
    throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/auth/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          toast("✔ Logged in successfully");
        }
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
  // return <AuthContext.Provider value={user}><h1>Hello from auth</h1></AuthContext.Provider>;
};
