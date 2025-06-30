"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

import { Plus } from "lucide-react";
import { InsertFoodTab } from "@/app/Add-food/_components/insert-food";
import { UpdateFoodTab } from "@/app/Add-food/_components/Update-food-tab";
import { CategoryPage } from "@/app/Add-food/_components/Add-category";

type UserType = {
  _id: string;
  userName: string;
};

type FoodNewType = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
};

type CategoryType = {
  categoryName: string;
  _id: string;
};

const AdminMenuPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserType>();
  const [foods, setFoods] = useState<Record<string, FoodNewType[]>>();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [showCategories, setShowCategories] = useState(false);

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
        setCategories(data?.data || []);
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
      console.log(error);
    }
  };

  const refreshFoods = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("http://localhost:8000/foods", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFoods(data?.foods);
    } catch (error) {
      console.error("Error refreshing foods:", error);
    }
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-row-reverse w-20">
        <Button onClick={handleLogout} className="mt-6">
          Logout
        </Button>
      </div>
      <h1 className="text-xl font-bold mb-4">Dishes Category</h1>
      <div className="flex gap-[10px]">
        {categories.map((category) => {
          return (
            <Button key={category._id} variant="outline">
              {category.categoryName}:{" "}
              {foods && foods[category.categoryName]?.length}
            </Button>
          );
        })}

        <Button
          onClick={() => setShowCategories(!showCategories)}
          variant="outline"
          className="bg-red-500 text-white"
        >
          <Plus />
        </Button>
      </div>
      {showCategories && <CategoryPage onCreatedCategory={saveCategories} />}
      <div className="flex flex-col gap-4">
        {categories.map((category) => {
          return (
            <div key={category._id}>
              <h2 className="text-lg font-semibold">
                {category.categoryName}({category.categoryName.length})
              </h2>

              <div className=" grid grid-cols-4 gap-2">
                <div className="flex flex-col border  border-dashed border-red-400 p-2 rounded justify-center">
                  <div className="gap-2 self-center content-center">
                    <InsertFoodTab category={category} />
                  </div>
                  <p className="self-center">Add new dishes</p>
                </div>
                {foods?.[category.categoryName as keyof typeof foods]?.map(
                  (food) => (
                    <div
                      key={food._id}
                      className="flex flex-col  border p-2 rounded"
                    >
                      <div>
                        <img
                          src={food.image}
                          alt={food.foodName}
                          className="w-[260px] h-[130px] object-cover"
                        />
                        <div className="absolute mt-[-50px] ml-[220px]">
                          <UpdateFoodTab
                            food={food}
                            categories={categories}
                            onFoodUpdated={refreshFoods}
                          />
                        </div>
                      </div>
                      <div className="flex">
                        <div>{food.foodName}</div>
                        <div>${food.price}</div>
                      </div>

                      <div className="text-sm text-gray-600">
                        {food.ingredients}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminMenuPage;
