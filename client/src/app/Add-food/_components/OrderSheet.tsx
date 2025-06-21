

import { useAuth } from "@/app/UserProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import axios from "axios";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import  { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type FoodOrderProps = {
  foodName: string;
  image: string;
  ingredients: string;
  price: number;
  _id: string;
};

type CartItem = FoodOrderProps & {
  quantity: number;
  id: string;
  index: number;
  address: string;
};

export const OrderDetail = () => {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
 const [addressInput, setAddressInput] = useState<string>("");
 const router = useRouter();
const {user} = useAuth()

 const [isLoggedIn, setISLoggedIn]=useState<boolean>(false)
  useEffect(() => {
    if (open) {
      const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(localCart);
    }
  }, [open]);

  const updatedCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const incQuantity = (index: number) => {
    const newCart = [...cart];
    newCart[index].quantity += 1;
    updatedCart(newCart);
  };

  const decQuantity = (index: number) => {
    const newCart = [...cart];
    if (newCart[index].quantity >= 1) {
      newCart[index].quantity -= 1;
      updatedCart(newCart);
    }
  };

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddressInput(value);
    localStorage.setItem("deliveryAddress", JSON.stringify(value));
  };

const handleCheckout = async () => {
    if (!user) {
      // If user is not logged in, redirect to login page
      router.push("/login");
    } else {
      // Proceed with checkout logic
      const userId = localStorage.getItem("userId");
      if (!addressInput) {
        alert("Please provide a delivery address.");
        return;
      }

      // Example: Prepare checkout data
      const checkoutData = {
        userId,
        cart,
        address: addressInput,
        total: totalPrice + 0.99,
      };

      // Example: Send checkout data to backend (replace with your API call)
      await axios.post("http://localhost:8000/login", checkoutData)
        .then((response) => {
          console.log("Checkout successful:", response.data);
          // Clear cart after successful checkout
          setCart([]);
          localStorage.setItem("cart", JSON.stringify([]));
          alert("Order placed successfully!");
          // Optionally redirect to an order confirmation page
          router.push("http://localhost:8000/categories");
        })
        .catch((error) => {
          console.error("Checkout error:", error);
          alert("Failed to place order. Please try again.");
        });
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="bg-gray-700 rounded-full text-white">
          <ShoppingCart className="w-5 h-5" />
        </Button>
      </SheetTrigger>

      <SheetContent className="bg-[#18181B] !max-w-[535px] h-[1024px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-amber-50 flex gap-3 items-center">
            <ShoppingCart className="text-amber-50" />
            Order Detail
          </SheetTitle>
          <div className="w-full h-[44px] bg-white shadow-md rounded-2xl p-2 flex justify-between items-center mt-2">
            <Button className="bg-red-500 text-white w-[48%] h-[36px] rounded-2xl text-sm font-semibold">
              Cart
            </Button>
            <Button className="bg-transparent text-gray-800 w-[48%] h-[36px] rounded-2xl text-sm font-semibold hover:bg-gray-200">
              Order
            </Button>
          </div>
          <p className="text-amber-50 mt-4">My Cart</p>
        </SheetHeader>

        <div className="self-center max-w-[471px] mt-4 flex flex-col gap-4 rounded-2xl bg-white p-6">
          {cart.length === 0 ? (
            <p className="text-sm text-gray-500">Cart is empty.</p>
          ) : (
            cart.map((item, index) => ( 
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 border-b pb-2"
              >
                <img
                  src={item.image}
                  alt={item.foodName}
                  className="w-20 h-20 rounded object-cover"
                />
                <div className="flex flex-col">
                  <div className="flex-1">
                    <p className="font-semibold">{item.foodName}</p>
                    <p className="text-sm text-gray-500">{item.ingredients}</p>
                  </div>
                  <div className="flex justify-between text-black items-center gap-2">
                    <div className="flex gap-3">
                      <Button
                        onClick={() => decQuantity(index)} 
                        className="h-8 w-8 bg-gray-200 rounded-full hover:bg-gray-300"
                        aria-label={`Decrease quantity of ${item.foodName}`}
                      >
                        <Minus size={16} />
                      </Button>
                      <span className="text-lg font-medium">{item.quantity}</span>
                      <Button
                        onClick={() => incQuantity(index)} 
                        className="h-8 w-8 bg-gray-200 rounded-full hover:bg-gray-300"
                        aria-label={`Increase quantity of ${item.foodName}`}
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                    <p className="font-semibold">${item.price * item.quantity}</p>
                  </div>
                </div>
              </div>
            ))
          )}
          <div>
            <p>Delivery location</p>
           
            <Input
              
              onChange={handleOnChange}
              value={addressInput}
              placeholder="Please share your complete address"
            />
            {addressInput ? (
              <p className="text-gray-500 border border-gray-100">{addressInput}</p>
              ) : (
                <p className="text-red-500 italic">
                  Please complete your address
                </p>
              )}
          </div>
        </div>

        <div className="self-center w-[471px] bg-white rounded-xl mt-6 p-4 flex flex-col gap-4">
          <div className="flex justify-between">
            <p className="font-semibold">Items</p>
            <p>{totalQuantity}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Shipping</p>
            <p>$0.99</p>
          </div>
          <hr className="border-t border-dashed border-gray-400" />
          <div className="flex justify-between text-lg font-bold">
            <p>Total</p>
            <p>${(totalPrice + 0.99).toFixed(2)}</p>
          </div>
       
          <Button 
            onClick={handleCheckout}
            className="bg-red-500 rounded-2xl text-amber-50">
            Checkout
          </Button>
           
        </div>
      </SheetContent>
    </Sheet>
  );
};
