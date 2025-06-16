"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "./UserProvider";
import { Button } from "@/components/ui/button";
import NavPage from "./Nav/page";

const Home = () => {
  const { user, setUser } = useAuth();
  const router = useRouter();

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   setUser(null);
  //   router.push("/LogIn");
  // };

  return (
    <div className="text-2xl">
      <h1>Welcome {user ? user.userId : "Guest"}!</h1>
      <NavPage />

      {/* <Button
        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        onClick={handleLogout}
      >
        Log out
      </Button> */}

      <Button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => router.push("/LogIn")}
      >
        Log in
      </Button>
    </div>
  );
};

export default Home;
