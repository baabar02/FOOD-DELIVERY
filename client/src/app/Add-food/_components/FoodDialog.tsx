import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@/components/ui/dialog";

import { Minus, Plus } from "lucide-react";

import { useState } from "react";




type FoodProps = {
  foodName: string;
  image: string;
  ingredients: string;
  price: number;
  _id: string;
  address: string;
};

type PropsType = {
  foods: Record<string, FoodProps[]>;
};

export const FoodDialog = ({
  foodName,
  image,
  ingredients,
  price,
  _id,
  address,
}: FoodProps) => {

    const [quantity, setQuantity] = useState<number>(1);

const handleAddToCart = () => {
  const foodData = {
    _id, 
    foodName,
    price,
    ingredients,
    image,
    quantity,
    address,
  };

  const existingCart: any[] = JSON.parse(localStorage.getItem("cart") || "[]");

  const normalizedCart = existingCart.map((item) => ({
    ...item,
    _id: item._id || item.id,
  }));

  const existingIndex = normalizedCart.findIndex(
    (item) => item._id === foodData._id
  );

  if (existingIndex !== -1) {
    normalizedCart[existingIndex].quantity += quantity;
  } else {
    normalizedCart.push(foodData);
  }


  localStorage.setItem("cart", JSON.stringify(normalizedCart));
  console.log("Cart updated:", normalizedCart);


};


  const addButton = () => {
    setQuantity((prev) => prev + 1);
  };

  const decButton = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
  <Dialog>
  <DialogTrigger asChild>
    {/* <Button variant="ghost"> */}
      <Plus />
    {/* </Button> */}
  </DialogTrigger>

  <DialogContent className="z-50 w-full !max-w-[826px] max-h-[412px] flex items-center justify-center">
   
     <DialogHeader>
  <img
        src={image}
        alt={foodName}
        className="w-[377px] h-[364px] object-cover rounded-lg"
        loading="lazy"
      />
     </DialogHeader>
    
    <DialogFooter>
 <div className="flex flex-col ml-3 w-[377px] h-[364px] justify-between">
        <div className="w-[328px] h-[364px]">
             <DialogTitle className="text-2xl font-bold text-red-500">
      {foodName}
    </DialogTitle>
          <p className="text-gray-700 text-base mt-2">{ingredients}</p>
          <div className="flex justify-between mt-4">
            <div className="flex flex-col text-black">
              <p className="text-m">Total price</p>
              <p className="text-xl font-semibold">${price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={decButton} className="h-8 w-8 bg-gray-200 rounded-full">
                <Minus size={16} />
              </Button>
              <span className="text-lg font-medium">{quantity}</span>
              <Button onClick={addButton} className="h-8 w-8 bg-gray-200 rounded-full">
                <Plus size={16} />
              </Button>
            </div>
          </div>
        </div>
        <Button
          onClick={handleAddToCart}
          className="mt-6 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Add to Cart
        </Button>
      </div>
    </DialogFooter>
     
  
  </DialogContent>
</Dialog>

  );
};

