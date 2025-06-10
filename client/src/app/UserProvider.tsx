"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";
import axios from "axios";

type UserData = {
  userId: string;
};

type AuthContextType = {
  user: UserData | null;
};

export const AuthContext = createContext<AuthContextType>({ user: null });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);

  const tokenChecker = async (token: string) => {
    try {
      const response = await axios.post("http://localhost:8000/verify", {
        token: token,
      });
      setUser({ userId: response.data.destructToken.userId });
    } catch (err) {
      router.push("/LogIn");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      tokenChecker(token);
    } else {
      // router.push("/LogIn");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext<AuthContextType>(AuthContext);
