

"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import CategoryPage from "../Add-category/page";
import { Plus } from "lucide-react";

type UserType ={
  _id:string;
  userName:string;
}

type FoodNewType = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
};

type CategoryType ={
  categoryName:string
}

const AdminMenuPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserType>();
  const [foods, setFoods] = useState<Record<string, FoodNewType[]>>();
  const [categories,setCategories] = useState<CategoryType[]>([]);
  const [showCategories, setShowCategories] = useState(false)

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

useEffect(() => {
    const token = localStorage.getItem("token");
    const getCategories = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(data?.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategories();
  }, []);

const saveCategories = async (categoryName: string) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        "http://localhost:8000/categories", 
        { categoryName },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCategories((prev) => [...prev, data.data]); 
      alert(data.message);
      setShowCategories(false);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to create category.";
      alert(errorMessage);
    }
  };
 

 
const categoryKey = Object.keys(categories || {})
console.log(categoryKey, 'categories');



 

  return (



    <div>
      <h1 className="text-xl font-bold mb-4">Dishes Category</h1>
      <div className="flex gap-[10px]">
        {keys.map((key) => {
          return (
            <Button 
            variant="outline">
              {key}: {foods && foods[key].length} 
             
            </Button>
            
          );        
        })}
      
<Button onClick={() => setShowCategories(!showCategories)} variant="outline">
  <Plus/>
</Button>
       
      </div>
        {showCategories && <CategoryPage onCreatedCategory={saveCategories}/>}
      <div className="flex flex-wrap gap-4">
        {keys.map((key) => (
          <div key={key}>
            <h2 className="text-lg font-semibold">{key} ({key.length})</h2>
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

      <div>
        <CategoryPage onCreatedCategory={function (categoryName: string): void {
          throw new Error("Function not implemented.");
        } }/>
      </div>
      <Button onClick={handleLogout} className="mt-6">
        Logout
      </Button>
    </div>
  );
};

export default AdminMenuPage;
