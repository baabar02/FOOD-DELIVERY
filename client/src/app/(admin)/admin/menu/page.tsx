// "use client";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { Payment } from "../orders/_components/column";
// import { format } from "path";
// import axios from "axios";

// type FoodNewType = {
//   foodName: string;
//   price: number;
//   image: string;
//   ingredients: string;
//   category: string;
//   createdAt: Date;
//   updatedAt: Date;
// };

// const AdminMenuPage = () => {
//   const router = useRouter();
//   const [user, setUser] = useState();
//   const [foods, setFoods] = useState<Record<string, FoodNewType[]>>();

//   const handleLogout = async () => {
//     localStorage.removeItem("token");
//     setUser(undefined);
//     router.push("/LogIn");
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const getFoodsGroupedByCategory = async () => {
//       const { data } = await axios.get(
//         "http://localhost:8000/foods",

//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setFoods(data?.foods);
//     };
//     getFoodsGroupedByCategory();
//   }, []);
//   console.log(foods, "foods");

//   const keys = Object.keys(foods || {});
//   console.log(keys);

//   // const foodName = keys.map((key)=>{
//   //   foods[key].map((el)=>{
//   //     return el.
//   //   })
//   // })

//   return (
//     <div>
//       Dishes category
//       <div className="flex gap-[10px]">
//         {keys.map((key) => {
//           return foods[key].map((food) => {
//             return <div>{food}</div>;
//           });
//         })}
//       </div>
//       <Button onClick={handleLogout}></Button>
//     </div>
//   );
// };

// export default AdminMenuPage;

"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

type FoodNewType = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
};

const AdminMenuPage = () => {
  const router = useRouter();
  const [user, setUser] = useState();
  const [foods, setFoods] = useState<Record<string, FoodNewType[]>>();

  const handleLogout = async () => {
    localStorage.removeItem("token");
    setUser(undefined);
    router.push("/LogIn");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getFoodsGroupedByCategory = async () => {
      const { data } = await axios.get("http://localhost:8000/foods", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFoods(data?.foods);
    };
    getFoodsGroupedByCategory();
  }, []);

  const keys = Object.keys(foods || {});
  console.log(foods, "foods");

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Dishes Category</h1>
      <div className="flex gap-[10px]">
        {keys.map((key) => {
          return (
            <Button>
              {key}: {foods && foods[key].length}
            </Button>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-4">
        {keys.map((key) => (
          <div key={key}>
            <h2 className="text-lg font-semibold">{key}</h2>
            <div className="grid grid-cols-2 gap-2">
              {foods?.[key as keyof typeof foods]?.map((food) => (
                <div key={food.foodName} className="border p-2 rounded">
                  <img
                    src={food.image}
                    alt={food.foodName}
                    className="w-24 h-24 object-cover"
                  />
                  <div>{food.foodName}</div>
                  <div>${food.price}</div>
                  <div className="text-sm text-gray-600">
                    {food.ingredients}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Button onClick={handleLogout} className="mt-6">
        Logout
      </Button>
    </div>
  );
};

export default AdminMenuPage;
