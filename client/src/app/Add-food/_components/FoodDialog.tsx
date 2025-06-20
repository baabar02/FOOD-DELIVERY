import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

type FoodProps = {
  foodName: string;
  image: string;
  ingredients: string;
  price: number;
  _id: string;
  onAddToCart?: (food: FoodProps & {quantity:number}) => void;
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
onAddToCart

}: FoodProps) => {

  const [quantity, setQuantity] =useState<number>(1)

const addButton = () =>{
setQuantity((prev)=> prev + 1);
}

const decButton = () =>{
  setQuantity((prev)=> (prev > 1 ? prev - 1 : 1))
}

  return (
    <Dialog>
      <DialogTrigger asChild>
      
          <Plus />
       
      </DialogTrigger>
     <DialogContent
  className="fixed z-50 flex items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
>
  <div className=" bg-white rounded-lg shadow-xl max-w-[826px] w-full h-[412px] p-6">
    <div className="flex flex-col sm:flex-row items-center sm:items-start">
      <img
        src={image}
        alt={foodName}
        className="w-[377px]  h-[364px] object-cover rounded-lg"
        loading="lazy"
      />
      <div className="flex flex-col ml-3 w-[377px] h-[364px] justify-between">
       
      <div className=" w-[328px] h-[364px]  mx-auto sm:ml-6 sm:mt-0 ">
        <h3 className="text-2xl font-bold text-red-500">{foodName}</h3>
        <p className="text-gray-700 text-base mt-2">{ingredients}</p>
        <div className="flex justify-between mt-30">
         
 <div className="flex flex-col text-black">
      <p className="text-m ">Total price</p>
        <p className="text-xl mt-0 font-semibold"> ${price.toFixed(2)}</p>
        </div>
        <div className="flex text-black items-center gap-4 mt-4">
              <Button
                onClick={decButton}
                className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-00"
                aria-label={`Decrease quantity of ${foodName}`}
              >
                <Minus size={16} />
              </Button>
              <span className="text-lg font-medium">{quantity}</span>
              <Button
                onClick={addButton}
                className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-500"
                aria-label={`Increase quantity of ${foodName}`}
              >
                <Plus size={16} />
              </Button>
            </div>
      </div>
        </div>
       
      {onAddToCart && (
              <Button
                onClick={() => onAddToCart({ foodName, image, ingredients, price, _id, quantity })}
                className="mt-6  bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                aria-label={`Add ${foodName} to cart`}
              >
                Add to Cart
              </Button>
            )}
      </div>
     
    </div>
  </div>
</DialogContent>

    </Dialog>
  );
};

