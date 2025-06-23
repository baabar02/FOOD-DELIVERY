import { useAuth } from "@/app/_components/UserProvider";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Dialog } from "@/components/ui/dialog";
import axios from "axios";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
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
  address: string;
  userId: string;
};

export const OrderDetail = () => {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [addressInput, setAddressInput] = useState<string>("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart") || "[]");

    console.log("localCart", localCart);

    setCart(localCart);

    const savedAddress = localStorage.getItem("deliveryAddress");
    if (savedAddress) {
      setAddressInput(savedAddress);
    }
  }, []);

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
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
      updatedCart(newCart);
    } else {
      newCart.splice(index, 1);
      updatedCart(newCart);
    }
  };

  const removeItem = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    updatedCart(newCart);
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

  console.log(user, "asdsd");

  const handleCheckout = async () => {
    if (!user?.userId) {
      setShowLoginDialog(true);
      return;
    }

    const userId = localStorage.getItem("token");

    if (!userId) {
      alert("User ID not found. Please log in again.");
      setShowLoginDialog(true);
      return;
    }

    if (!addressInput || addressInput.trim().length < 6) {
      alert("Please provide a valid delivery address (minimum 6 characters).");
      return;
    }

    const checkoutData = {
      userId,
      cart,
      address: addressInput,
      total: totalPrice + 0.99,
    };
    // console.log("Checkout payload:", {
    //   user: user.userId,
    //   totalPrice: totalPrice + 0.99,
    //   address: addressInput,
    //   foodOrderItems: cart.map((item) => ({
    //     food: item._id,
    //     quantity: item.quantity,
    //   })),
    // });

    try {
      const response = await axios.post(
        "http://localhost:8000/food-order",

        {
          user: user.userId,
          totalPrice: totalPrice + 0.99,
          address: addressInput,
          foodOrderItems: cart.map((item) => ({
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
      setCart([]);
      localStorage.setItem("cart", JSON.stringify([]));
      setAddressInput("");
      localStorage.removeItem("deliveryAddress");
      setShowSuccessDialog(true);
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
    router.push("/categories");
  };

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
              Order Detail
            </SheetTitle>
            <div className="w-full bg-white shadow-md rounded-2xl p-2 flex justify-between items-center mt-2">
              <Button className="bg-red-500 text-white w-[48%] h-[36px] rounded-2xl text-sm font-semibold">
                Cart
              </Button>
              <Button className="bg-transparent text-gray-800 w-[48%] h-[36px] rounded-2xl text-sm font-semibold hover:bg-gray-200">
                Order History
              </Button>
            </div>
            <p className="text-amber-50 mt-4">My Cart</p>
          </SheetHeader>

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
                    <p className="text-sm text-gray-500">{item.ingredients}</p>
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
                          onClick={() => removeItem(index)}
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
        </SheetContent>
      </Sheet>
      {}
      {!user && (
        <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
          <DialogContent
            className="w-[400px] rounded-lg bg-white p-6"
            aria-labelledby="dialog-title"
          >
            <DialogTitle>
              <div id="dialog-title" className="text-lg font-semibold">
                You need to log in first
              </div>
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
      )}
      {user && (
        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent
            className="w-[400px] rounded-lg bg-white p-6"
            aria-labelledby="dialog-title"
          >
            <div id="dialog-title" className="text-lg font-semibold">
              Order Placed Successfully!
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Your order has been successfully placed. You will receive a
              confirmation soon.
            </p>

            <Button
              onClick={handleCloseSuccessDialog}
              className="bg-gray-600 text-white rounded-full"
              aria-label="Back to home"
            >
              Back to Home
            </Button>
          </DialogContent>
        </Dialog>
      )}
      ;
    </>
  );
};
