import { ReactNode, createContext, useContext, useEffect, useState } from "react";

type UserData = {
  userId: string;
};

type AuthContextType = {
  user: UserData | null;
};

export const AuthContext = createContext<AuthContextType>({ user: null });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(()=>{
    const token = localStorage.getItem("token")
    console.log(token);
    
    if(token) {
        console.log(token, 'kk');
        
        setUser(user)
    }
  },[])

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext<AuthContextType>(AuthContext);

