"use client";

import axios from "axios";
import FoodPage from "./FoodPage";
import { useEffect, useState } from "react";

type FoodProps = {
  foodName: string;
  image: string;
  ingredients: string;
  price: number;
  _id: string;
  address: string;
};

const Food = () => {
  const [foods, setFoods] = useState<FoodProps[]>([]);

  const getFoods = async () => {
    try {
      const res = await axios.get(
        "https://food-delivery-p342.onrender.com/foods"
      );
      setFoods(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFoods();
  }, []);

  return (
    <div className="flex flex-col">
      <FoodPage foods={foods} />
    </div>
  );
};

export default Food;
