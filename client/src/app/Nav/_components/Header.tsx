"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { ChevronRight, MapPin, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/_components/UserProvider";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {  useState } from "react";
import { OrderDetail } from "@/app/Add-food/_components/OrderSheet";

export const Header = () => {
  const path = usePathname();
  const arr = ["/LogIn", "/SignUp", "/ForgotPassword"];

  if (arr.includes(path)) return null;

  const { user, setUser } = useAuth();
  const router = useRouter();

const handleLogin = () => {
    router.push("/LogIn");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/LogIn");
  };


  const [addressInput, setAddressInput] = useState<string>("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddressInput(value);
    localStorage.setItem("deliveryAddress", value);
  };

  const handleSave = () => {
    localStorage.setItem("deliveryAddress", addressInput);
    console.log("Saved address:", addressInput);
  };

  const DeliveryAddressButton = () => (
    <div className="flex w-[251px] h-[36px] gap-4 rounded-[16px] text-xs justify-center items-center bg-amber-50 cursor-pointer">
      <p className="flex text-red-500 gap-2">
        <MapPin className="w-[20px] h-[20px]" />
        Delivery address:
      </p>
      <p className="flex text-gray-500 gap-2">
        Add location
        <ChevronRight className="w-[20px] h-[20px]" />
      </p>
    </div>
  );

  return (
<div className="flex w-full h-[172px] sticky top-0 z-50 bg-[#18181B] mx-auto">
      <div className="mx-auto px-4 flex gap-4">
        <Image
          alt="Food Delivery App Logo"
          width={38}
          height={46}
          src="/Logo.png"
          priority
          className="object-contain"
        />
        <Image
          src="/Text.png"
          alt="Food Delivery logo"
          width={88}
          height={44}
          className="object-contain"
        />
      </div>

      <div className="flex gap-4 mx-auto items-center">

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost">
              <DeliveryAddressButton />
            </Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col border border-green-400 !w-[400px] !h-[200px] bg-white">
            <div className="grid gap-3">
              <label htmlFor="username-1">Add Location</label>
              <Input
                id="username-1"
                name="location"
                placeholder="Location here..."
                onChange={handleOnChange}
                value={addressInput}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleSave} type="submit">
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="bg-amber-50 w-[36px] h-[36px] flex items-center justify-center rounded-full">
          <OrderDetail />
        </div>

      
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="bg-[#EF4444] w-[36px] h-[36px] flex items-center justify-center rounded-full text-amber-50"
              type="button"
            >
              <User className="w-[16px] h-[16px]" />
            </Button>
          </DialogTrigger>
          <DialogContent className=" flex flex-col border border-red-400 !w-[300px] !h-[200px] bg-white">
            <div className="flex flex-col gap-4 p-4">
              <h3 className="text-lg font-semibold">Account</h3>
              {user ? (
                <Button
                  className="bg-gray-500 text-white hover:bg-red-600"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  className="bg-blue-500 text-white hover:bg-blue-600"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              )}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
