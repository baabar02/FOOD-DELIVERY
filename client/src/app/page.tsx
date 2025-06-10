"use client";

import { useAuth } from "./UserProvider";

const Home = () => {
  const { user } = useAuth();
  return (
    <div className="text-2xl">
      {user?.userId}
      Hello
    </div>
  );
};

export default Home;
