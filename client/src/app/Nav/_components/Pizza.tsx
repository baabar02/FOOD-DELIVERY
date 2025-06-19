"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type FoodProps = {
  foodName: string;
  image: string;
  ingredients: string;
  price: number;
  _id: string;
};

type PropsType = {
  foods: Record<string, FoodProps[]>;
 
};



export const Pizza = ({ foods }: PropsType) => {

    const [selectedFood, setSelectedFood] = useState<FoodProps | null>(null)

  if (!foods || !foods["Pizza"]) return null;

  const handleAddToCart = (food: FoodProps) => {
    console.log(`Added ${food.foodName} to cart`);
  };


  const handleEnlarge = (food:FoodProps) =>{
    setSelectedFood(food);
  }

//   const handleClose =(food:FoodProps) =>{
//     setSelectedFood();
//   }
  return (
    <div className="flex w-full bg-[#404040] mx-auto py-10 justify-center items-center">
      <div className="mb-8 w-full max-w-[1250px] px-4">
        <h2 className="text-4xl font-bold text-amber-50 mb-6">Pizza</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {foods["Pizza"].slice(0, 6).map((food) => (
            <div
              key={food._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow w-full max-w-[398px] mx-auto"
            >
              <div className="relative mt-2 mx-2">
                <img
                  src={food.image}
                  alt={food.foodName}
                  className="w-full h-48 object-cover rounded-lg"
                  
                />
                <Button
                  onClick={() => handleAddToCart(food)}
                  className="absolute top-35 right-3 h-10 w-10 bg-amber-50 text-red-500 rounded-full hover:bg-amber-100 flex items-center justify-center text-lg"
                  aria-label={`Add ${food.foodName} to cart`}
                >
                  +
                </Button>
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
          ))}
        </div>
        
            {selectedFood && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            role="dialog"
            aria-labelledby="modal-title"
            aria-modal="true"
        
            onClick={() => {
                return handleEnlarge(selectedFood);
            }}
          >
            <div
              className="bg-white rounded-lg shadow-lg p-6 w-full max-w-[600px] mx-4"
              onClick={(e) => e.stopPropagation()} 
            >
              <div className="relative">
                <img
                  src={selectedFood.image}
                  alt={selectedFood.foodName}
                  width={600}
                  height={300}
                //   onClick={handleEnlarge}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <Button
                  className="absolute top-2 right-2 text-2xl text-gray-600 hover:text-gray-800"
                  onClick={() => {handleAddToCart(selectedFood);
}}

                  aria-label="Close enlarged view"
                >
                  &times;
                </Button>
              </div>
              <div className="mt-4">
                <h3 id="modal-title" className="text-2xl font-semibold text-red-500">
                  {selectedFood.foodName}
                </h3>
                <p className="text-lg font-bold text-gray-800 mt-2">
                  ${selectedFood.price.toFixed(2)}
                </p>
                <p className="text-gray-600 mt-2">{selectedFood.ingredients}</p>
                <Button
                  onClick={() => {
                    handleAddToCart(selectedFood);
                
                  }}
                  className="mt-4 bg-red-500 text-white hover:bg-red-600"
                  aria-label={`Add ${selectedFood.foodName} to cart`}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    
  
    </div>
  );
};