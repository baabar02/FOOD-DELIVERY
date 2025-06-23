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

// 'use client';

// import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';

// type UserData = {
//   userId: string;
// };

// type JwtPayload = {
//   userId: string;
// };

// type AuthContextType = {
//   user: UserData | null;
//   setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
// };

// export const AuthContext = createContext<AuthContextType>({
//   user: null,
//   setUser: () => {},
// });

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const router = useRouter();
//   const [user, setUser] = useState<UserData | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const tokenChecker = async (token: string) => {
//     try {

//       await axios.post('http://localhost:8000/verify', { token });

//       const decoded: JwtPayload = jwtDecode(token);
//       if (!decoded.userId) {
//         throw new Error('No userId in token');
//       }
//       setUser({ userId: decoded.userId });
//     } catch (err) {
//       console.error('Token verification failed:', err);
//       localStorage.removeItem('token');
//       localStorage.removeItem('userId');
//       router.push('/LogIn');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token && !user) {
//       tokenChecker(token);
//     } else if (!token && !user) {
//       setIsLoading(false);
//       router.push('/LogIn');
//     } else {
//       setIsLoading(false);
//     }
//   }, [user]);

//   if (isLoading) return null;

//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>{children}</div>
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext<AuthContextType>(AuthContext);
