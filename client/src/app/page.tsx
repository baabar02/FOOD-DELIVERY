"use client";

import { useContext, useEffect } from "react";
// import { AuthContext, useAuth } from "./UserProvider";
// const {user} = useAuth();
// console.log(user?.userId, "hh");

// const context = useContext(AuthContext);
// const {user} = context
const Home = () => {
  return (
    <div className="text-2xl">
      {/* {user?.userId} */}
      Hello
    </div>
  );
};

export default Home;

//   useEffect(()=>{
//     const token = localStorage.getItem("token")
//  console.log("token",token);
//   },[])
