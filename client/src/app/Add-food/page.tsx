"use client";
import { useEffect, useState } from "react";
import axios from "axios";

// Define the food item type
type FoodItem = {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl?: string; // Optional, depending on your API
};



const FoodPage = () => {
const food: FoodItem[] = [
    { _id: "1", name: "Finger food", price: 12.99, description: "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.", imageUrl: "/finger-food.jpg" },
    { _id: "2", name: "Cranberry Brie Bites", price: 12.99, description: "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.", imageUrl: "/cranberry-brie.jpg" },
    { _id: "3", name: "Sunshine Stackers", price: 12.99, description: "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.", imageUrl: "/sunshine-stackers.jpg" },
  ];

  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const response = await axios.get("http://localhost:8000/foods", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFoods(response.data.data || []); 
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch foods");
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Appetizers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.map((food) => (
          <div
            key={food._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={food.imageUrl || "/placeholder-image.jpg"} 
              alt={food.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{food.name}</h3>
              <p className="text-red-500 font-bold mt-2">${food.price.toFixed(2)}</p>
              <p className="text-gray-600 text-sm mt-2">{food.description}</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Add +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodPage;