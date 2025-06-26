"use client";

import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { redirect, useRouter } from "next/navigation";
import axios from "axios";

type UserData = {
  userId?: string;
  role?: boolean;
};

type AuthContextType = {
  user: UserData | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserData | undefined>>;
  tokenChecker: (_token: string) => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<UserData | undefined>();

  const tokenChecker = async (token: string) => {
    try {
      const response = await axios.post("http://localhost:8000/verify", {
        token: token,
      });

      //         if (response.data?.userId) {
      //   setUser({ userId: response.data.userId });
      // } else {
      //   throw new Error("Invalid token response");
      // }
      setUser({
        userId: response.data.userId,
        role: response.data.isAdmin,
      });
    } catch (err) {}
  };
  console.log(user, "From Provider");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      tokenChecker(token);
    } else {
      // router.push("/LogIn");
    }
  }, []);

  useEffect(() => {
    if (user?.role) {
      console.log("user is admin");
      router.push("/admin/orders");
    } else {
      console.log("after token");
      router.push("/");
      console.log("after redirect");
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser, tokenChecker }}>
      <div style={{ backgroundColor: "#f0f0f0", minHeight: "100vh" }}>
        {children}
      </div>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext<AuthContextType>(AuthContext);
