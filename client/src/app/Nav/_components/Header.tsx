"use client";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { ChevronRight, MapPin, Pin, ShoppingCart, User } from "lucide-react";

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
import { useEffect, useState } from "react";
import { OrderDetail } from "@/app/Add-food/_components/OrderSheet";
import ForgotPassword from "@/app/ForgotPassword/page";

export const Header = () => {
  const path = usePathname();
  const arr = ["/LogIn", "/SignUp", "ForgotPassword"];

  if (arr.includes(path)) {
    return null;
  }

  const { setUser } = useAuth();
  const router = useRouter();

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
    <div className="flex w-full h-[172px] bg-[#18181B] mx-auto ">
      <Button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => router.push("/LogIn")}
      >
        Log in
      </Button>
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
        {/* <Dialog>
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
                placeholder="location here..."
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
        <DialogContent className="flex flex-col border border-green-400 !w-[400px] !h-[200px] bg-white">
          <div className="grid gap-3">
            <label htmlFor="location">Add Location</label>
            <Input
              id="location"
              name="location"
              placeholder="Location here..."
              value={addressInput}
              onChange={handleOnChange}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button">Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent> */}

        <div className="bg-amber-50 w-[36px] h-[36px] flex items-center justify-center rounded-full">
          <OrderDetail />
        </div>
        <div className="bg-[#EF4444] w-[36px] h-[36px] flex items-center justify-center rounded-full text-amber-50">
          <Button
            className="bg-[#EF4444] w-[36px] h-[36px] flex items-center justify-center rounded-full text-amber-50"
            type="button"
            onClick={handleLogout}
          >
            <User className="w-[16px] h-[16px]" />
          </Button>
        </div>
      </div>
    </div>
  );
};
