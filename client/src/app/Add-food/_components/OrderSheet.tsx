

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Minus, Plus, ShoppingCart } from "lucide-react"
import image from "next/image"
import { useState } from "react"


// type FoodProps = {
//   foodName: string;
//   image: string;
//   ingredients: string;
//   price: number;
//   _id: string;
//   onAddToCart?: (food: FoodProps & {quantity:number}) => void;
// };


// type PropsType = {
//   foods: Record<string, FoodProps[]>;
 
// };

//   const [quantity, setQuantity] =useState<number>(1)

// const addButton = () =>{
// setQuantity((prev)=> prev + 1);
// }

// const decButton = () =>{
//   setQuantity((prev)=> (prev > 1 ? prev - 1 : 1))
// }

export const OrderDetail = ()=> {
  
  return (
   
    <Sheet >
      <SheetTrigger asChild >
        <ShoppingCart/>
      </SheetTrigger>
      <SheetContent className="!max-w-[535px] h-[1024px]">
        <SheetHeader>
          <SheetTitle className="flex gap-3"><ShoppingCart/> Order detail</SheetTitle>
          <div className="w-full h-[44px] bg-white shadow-md rounded-xl p-4 flex justify-between items-center">
      <Button
        className="bg-red-500 w-[227px] h-[36px] text-white hover:bg-red-600 px-6 py-2 rounded-2xl text-sm font-semibold"
      >
        Cart
      </Button>
      <Button
        className=" w-[227px] h-[36px] bg-transparent text-gray-800 hover:bg-gray-200 px-6 py-2 rounded-r-2xl text-sm font-semibold"
      >
        Order
      </Button>
    </div>
      
         <SheetHeader>
            My cart
         </SheetHeader>

{/* 
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
     
    </div> */}
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Name</Label>
            <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Username</Label>
            <Input id="sheet-demo-username" defaultValue="@peduarte" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}



// const cartItem = foods["Appetizer"]?.[0] || {
//     foodName: "Sunshine Stackers",
//     image: "/images/default-food.jpg",
//     ingredients: "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar",
//     price: 12.99,
//     _id: "default",
//   };