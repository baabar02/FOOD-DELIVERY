"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { FoodDialog } from "./FoodDialog";
import { InsertFood } from "./insert-food";

type FoodProps = {
  foodName: string;
  image: string;
  ingredients: string;
  price: number;
  _id: string;
 address:string;
};

type PropsType = {
  foods: Record<string, FoodProps[]>;
 
};

export const Appetizer = ({ foods, }: PropsType) => {
  if (!foods || !foods["Appatizer"]) return null;

  const handleAddToCart = (food: FoodProps) => {
    console.log(`Added ${food.foodName} to cart`);
  };



  return (
    <div className="flex w-full bg-[#404040] mx-auto py-10 justify-center items-center">
      <div className="mb-8 w-full max-w-[1250px] px-4">
        <h2 className="text-4xl font-bold text-amber-50 mb-6">Appetizers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <Plus/>
         
           <InsertFood foods={foods} />}
         {foods["Appatizer"].slice(0, 6).map((food) => {
           return (
             <div
               key={food._id}
               className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow w-full max-w-[398px] mx-auto"
             >
               <div className="relative mt-2 mx-2">
                 <img
                   src={food.image}
                   alt={food.foodName}
                   className="w-full h-48 object-cover rounded-lg"
                   loading="lazy" />
                 <div className="absolute top-35 right-3 h-10 w-10 bg-amber-50 text-red-500 rounded-full hover:bg-amber-100 flex items-center justify-center text-lg">

                   <FoodDialog
                     foodName={food.foodName}
                     image={food.image}
                     ingredients={food.ingredients}
                     price={food.price}
                     _id={food._id}
                     address={food.address}
                      />
                 </div>
               </div>
               <div className="p-4">
                 <div className="flex justify-between items-center">
                   <h3 className="text-xl font-semibold text-red-500">
                     {food.foodName}
                   </h3>
                   <p className="font-bold text-lg">${food.price.toFixed(2)}</p>
                 </div>
                 <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                   {food.ingredients}
                 </p>
               </div>
             </div>
           );
         })}

        </div>
      </div>
    </div>
  );
};
