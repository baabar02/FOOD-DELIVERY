"use client";

import React, {
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
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  tokenChecker: (_token: string) => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);




  const tokenChecker = async (token: string) => {
    try {
      const response = await axios.post("http://localhost:8000/verify", {
        token: token,
      });

        if (response.data?.userId) {
  setUser({ userId: response.data.userId });
} else {
  throw new Error("Invalid token response");
}
      setUser({ userId: response.data.userId });
    } catch (err) {}
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
    <AuthContext.Provider value={{ user, setUser, tokenChecker }}>
      <div style={{ backgroundColor: "#f0f0f0", minHeight: "100vh" }}>
        {children}
      </div>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext<AuthContextType>(AuthContext);
