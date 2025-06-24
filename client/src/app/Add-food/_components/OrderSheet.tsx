"use client";

import { useAuth } from "@/app/_components/UserProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import axios from "axios";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFoodCart } from "@/app/_components/CardProvider";

type FoodOrderProps = {
  foodName: string;
  image: string;
  ingredients: string;
  price: number;
  _id: string;
};

type CartItem = FoodOrderProps & {
  quantity: number;
  address: string;
};

type Order = {
  _id: string;
  user: { email: string; phoneNumber: string; address: string };
  foodOrderItems: { food: FoodOrderProps; quantity: number }[];
  totalPrice: number;
  address: string;
  status: string;
  createdAt: string;
};

export const OrderDetail = () => {
  const { cart, removeCartFood, incQuantity, decQuantity, clearCard } =
    useFoodCart();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"cart" | "history">("cart");

  const [orders, setOrders] = useState<Order[]>([]);
  const [addressInput, setAddressInput] = useState<string>("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const savedAddress = localStorage.getItem("deliveryAddress");
    if (savedAddress) {
      setAddressInput(savedAddress);
    }
  }, []);

  useEffect(() => {
    if (view === "history" && user?.userId) {
      const fetchOrders = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            alert("You must logged in");
          }
          const response = await axios.get("http://localhost:8000/food-order", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("Fetched orders:", response.data);

          setOrders(response.data.data);
        } catch (error) {
          console.error("Fetch order history error:", error);
        }
      };
      fetchOrders();
    }
  }, [view, user]);


  const removeItem = (foodId: string) => {
    removeCartFood(foodId);
  };

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddressInput(value);
    localStorage.setItem("deliveryAddress", value);
  };

  const handleCheckout = async () => {
    if (!user?.userId) {
      setShowLoginDialog(true);
      return;
    }

    if (!addressInput || addressInput.trim().length < 6) {
      alert("Please provide a valid delivery address (minimum 6 characters).");
      return;
    }

    const normalizedCart = cart.map((item) => ({
      ...item,
      _id: item._id,
    }));

    const invalidItem = normalizedCart.find(
      (item) => !item._id || !/^[a-f\d]{24}$/i.test(item._id)
    );
    if (invalidItem) {
      console.error("Invalid _id found in cart:", invalidItem);
      alert(
        `Invalid food ID detected in cart: ${invalidItem._id || "undefined"}`
      );
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/create-order",

        {
          user: user.userId,
          totalPrice: totalPrice + 0.99,
          address: addressInput,
          foodOrderItems: normalizedCart.map((item) => ({
            food: item._id,
            quantity: item.quantity,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Checkout successful:", response);
      clearCard();
      localStorage.setItem("cart", JSON.stringify([]));
      setAddressInput("");
      localStorage.removeItem("deliveryAddress");
      setShowSuccessDialog(true);
    } catch (error: any) {
      console.error("Checkout error:", error);
      alert(
        error.response?.data?.message ||
          "Failed to place order. Please try again."
      );
    }
  };

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
    router.push("/");
  };

  const clearOrderHistory = (_id:string) =>{
    const updateHistory = orders.filter((foodOrder)=> foodOrder._id !==_id);
    setOrders(updateHistory);
  }

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button className="bg-gray-700 rounded-full text-white relative">
            <ShoppingCart className="w-5 h-5" />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {totalQuantity}
              </span>
            )}
          </Button>
        </SheetTrigger>

        <SheetContent className="bg-[#18181B] !max-w-[535px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-amber-50 flex gap-3 items-center">
              <ShoppingCart className="text-amber-50" />
              {view === "cart" ? "Order Detail" : "Order History"}
            </SheetTitle>
            <div className="w-full bg-white shadow-md rounded-2xl p-2 flex justify-between items-center mt-2">
              <Button
                className={`w-[48%] h-[36px] rounded-2xl text-sm font-semibold ${
                  view === "cart"
                    ? "bg-red-500 text-white"
                    : "bg-transparent text-gray-800 hover:bg-gray-200"
                }`}
                onClick={() => setView("cart")}
              >
                Cart
              </Button>
              <Button
                className={`w-[48%] h-[36px] rounded-2xl text-sm font-semibold ${
                  view === "history"
                    ? "bg-red-500 text-white"
                    : "bg-transparent text-gray-800 hover:bg-gray-200"
                }`}
                onClick={() => setView("history")}
              >
                Order History
              </Button>
            </div>
          </SheetHeader>

          {view === "cart" && (
            <>
              <p className="text-amber-50 mt-4">My Cart</p>
              <div className="self-center max-w-[471px] mt-4 flex flex-col gap-4 rounded-2xl bg-white p-6">
                {cart.length === 0 ? (
                  <p className="text-sm text-gray-500">Your cart is empty.</p>
                ) : (
                  cart.map((item, index) => (
                    <div
                      key={`${item._id}-${index}`}
                      className="flex items-center justify-between gap-4 border-b pb-2"
                    >
                      <img
                        src={item.image}
                        alt={item.foodName}
                        className="w-20 h-20 rounded object-cover"
                      />
                      <div className="flex flex-col flex-1">
                        <p className="font-semibold">{item.foodName}</p>
                        <p className="text-sm text-gray-500">
                          {item.ingredients}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex gap-3 items-center">
                            <Button
                              onClick={() => decQuantity(index)}
                              className="h-8 w-8 bg-gray-200 rounded-full hover:bg-gray-300"
                              aria-label={`Decrease quantity of ${item.foodName}`}
                            >
                              <Minus size={16} />
                            </Button>
                            <span className="text-lg font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              onClick={() => incQuantity(index)}
                              className="h-8 w-8 bg-gray-200 rounded-full hover:bg-gray-300"
                              aria-label={`Increase quantity of ${item.foodName}`}
                            >
                              <Plus size={16} />
                            </Button>
                            <Button
                              onClick={() => removeItem(item._id)}
                              className="h-8 w-8 bg-red-100 rounded-full hover:bg-red-200"
                              aria-label={`Remove ${item.foodName} from cart`}
                            >
                              <Trash2 size={16} className="text-red-500" />
                            </Button>
                          </div>
                          <p className="font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
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
                    placeholder="Enter your complete address"
                    className="mt-2"
                  />
                  {!addressInput && (
                    <p className="text-red-500 italic mt-1">
                      Please provide a delivery address.
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
                  className="bg-red-500 rounded-2xl text-amber-50"
                  disabled={cart.length === 0 || !addressInput}
                  aria-label="Proceed to checkout"
                >
                  Checkout
                </Button>
              </div>
            </>
          )}

          {view === "history" && (
            <div className=" max-w-[471px] mt-4 ml-4 flex flex-col gap-4 rounded-2xl bg-white p-6">
              {orders.length === 0 ? (
                <p className="w-full text-sm text-gray-500">
                  No order history available.
                </p>
              ) : (
                orders.map((order) => (
                  <div key={order._id} className="border-b pb-4 mb-4">
                    <p className="font-semibold">
                      Order #{order._id.slice(-6)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Status: {order.status}
                    </p>
                    <p className="text-sm text-gray-500">
                      Delivery: {order.address}
                    </p>
                    {order.foodOrderItems.map((item, index) => (
                      <div
                        key={`${item.food._id}-${index}`}
                        className="flex items-center justify-between gap-4 mt-2"
                      >
                       
                        <div className="flex flex-col flex-1">
                          <p className="font-medium">{item.food.foodName}</p>
                          <p className="flex content-between text-sm text-gray-500">
                            <p>Quantity:</p> <p>{item.quantity}</p>
                          </p>
                          <p className="text-sm font-semibold">
                            ${(item.food.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                    <p className="font-bold mt-2">
                      Total: ${order.totalPrice.toFixed(2)}
                    </p>
                    <Button  ><Trash2 /></Button>
                  </div>
                ))
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>

      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="w-[400px] rounded-lg bg-white p-6">
          <DialogTitle id="dialog-title" className="text-lg font-semibold">
            You need to log in first
          </DialogTitle>
          <p className="text-sm text-gray-600 mt-2">
            Please log in or create an account to continue checkout.
          </p>
          <Button
            onClick={() => router.push("/SignUp")}
            className="bg-blue-600 text-white rounded-full"
            aria-label="Sign up"
          >
            Sign Up
          </Button>
          <Button
            onClick={() => router.push("/LogIn")}
            className="bg-gray-600 text-white rounded-full"
            aria-label="Log in"
          >
            Log In
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="w-[400px] rounded-lg bg-white p-6">
          <DialogTitle id="dialog-title" className="text-lg font-semibold">
            Your order has been Successfully placed!
          </DialogTitle>
          <div className="flex justify-center">
          <img 
          alt="confirmation"
          src="./illustration.png"
          className="self-center text-sm text-gray-600 mt-2">
          </img>
          </div>
        
          <Button
            onClick={handleCloseSuccessDialog}
            className="bg-gray-600 text-white rounded-full"
            aria-label="Back to home"
          >
            Back to Home
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
