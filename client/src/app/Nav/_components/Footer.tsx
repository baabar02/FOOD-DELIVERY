import { Copyright, Link } from "lucide-react";
import Image from "next/image";

export const Footer = () => {
  return (
    <div className="flex w-full h-[775px] bg-[#18181B]">
      <div className="flex flex-col mx-auto">
        <div className="mt-[60px] w-full h-[92px] bg-[#EF4444] text-amber-50 flex items-center gap-10 overflow-hidden hover:animate-none">
          <p className="text-[36px] font-bold animate-slide">
            Fresh Fast Delivered
          </p>
          <p className="text-[36px] font-bold animate-slide">
            Fresh Fast Delivered
          </p>
          <p className="text-[36px] font-bold animate-slide">
            Fresh Fast Delivered
          </p>
          <p className="text-[36px] font-bold animate-slide">
            Fresh Fast Delivered
          </p>
          <p className="text-[36px] font-bold animate-slide">
            Fresh Fast Delivered
          </p>
          <style className="">
            {`
            @keyframes slide {
              0% { transform: translateX(100%); }
              100% { transform: translateX(-100%); }
            }
            .animate-slide {
              animation: slide 20s linear infinite;
              display: inline-block; 
              white-space: nowrap;
            }
          `}
          </style>
        </div>
        <div className="flex gap-40 mt-20 justify-center ">
          <div className="flex flex-col justify-center">
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
          <div className="flex gap-30">
            <div className="flex flex-col gap-4">
              <h1 className="text-[#71717A] text-[16px]">NOMNOM</h1>
              <h2 className="text-[#FAFAFA] text-[16px]">Home</h2>
              <h2 className="text-[#FAFAFA] text-[16px]">Contact us</h2>
              <h2 className="text-[#FAFAFA] text-[16px]">Delivery zone</h2>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-[#71717A] text-[16px]">MENU</h1>
              <Link 
                className="text-[#FAFAFA] text-[16px] hover:text-[#EF4444] transition-colors"
                href="/Appetizer">
              <h2 className="text-[#FAFAFA] text-[16px]">Appatizer</h2>
              </Link>
              
              <h2 className="text-[#FAFAFA] text-[16px]">Salads</h2>
              <h2 className="text-[#FAFAFA] text-[16px]">Pizzas</h2>
              <h2 className="text-[#FAFAFA] text-[16px]">Main dishes</h2>
              <h2 className="text-[#FAFAFA] text-[16px]">Desserts</h2>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-[16px]">XXXX</h1>
              <h2 className="text-[#FAFAFA] text-[16px]">Side dish</h2>
              <h2 className="text-[#FAFAFA] text-[16px]">Brunch</h2>
              <h2 className="text-[#FAFAFA] text-[16px]">Desserts</h2>
              <h2 className="text-[#FAFAFA] text-[16px]">Beverages</h2>
              <h2 className="text-[#FAFAFA] text-[16px]">Fish & sea foods</h2>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-[#71717A] text-[16px]">FOLLOW US</h1>
              <div className="flex gap-6">
                <h2 className="flex items-center">
                  <Image
                    className="filter invert-[95%] sepia-[10%] saturate-[200%] hue-rotate-[180deg] brightness-[150%]" // Approx #FAFAFA
                    alt="facebook-icon"
                    src="/fb.png"
                    width={28}
                    height={28}
                  />
                </h2>
                <h2 className="flex items-center">
                  <Image
                    className=""
                    alt="facebook-icon"
                    src="/instagram.png"
                    width={28}
                    height={28}
                  />
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-[84px] gap-20 mt-[100px] border-t border-[#71717A]">
          <div className="flex mx-auto gap-20">
            <h1 className="flex gap-2 items-center text-[14px] text-[#71717A]">
              Copy right 2025 <Copyright className="w-[14px] h-[14px]" /> NOMNOM
              LLC
            </h1>
            <h1 className="flex gap-2 items-center text-[14px] text-[#71717A]">
              Privicy policy
            </h1>
            <h1 className="flex gap-2 items-center text-[14px] text-[#71717A]">
              Terms and condition
            </h1>
            <h1 className="flex gap-2 items-center text-[14px] text-[#71717A]">
              Cookie policy
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

