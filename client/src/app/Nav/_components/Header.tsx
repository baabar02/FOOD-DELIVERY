import  Image  from "next/image"
import { Input } from "@/components/ui/input"
import { ChevronRight, MapPin, Pin, ShoppingCart, User } from "lucide-react"



export const Header = () =>{
    return (
        <div className="flex w-full h-[172px] bg-[#18181B] mx-auto ">
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
          className="object-contain"/>
            </div>
            <div className="flex gap-4 mx-auto items-center">
                 <div className="flex w-[251px] h-[36px] gap-4 rounded-[16px] text-xs justify-center items-center content-center bg-amber-50">
                    <p className="flex text-red-500 gap-2"><MapPin className="w-[20px] h-[20px]"/>Delivery address:</p>
                    <p className="flex text-gray-500 gap-2">Add location<ChevronRight className="w-[20px] h-[20px]"/></p>
                </div>
                <div className="bg-amber-50 w-[36px] h-[36px] flex items-center justify-center rounded-full"><ShoppingCart className="w-[16px] h-[16px]" /></div>
                <div className="bg-[#EF4444] w-[36px] h-[36px] flex items-center justify-center rounded-full text-amber-50"><User className="w-[16px] h-[16px]" /></div>
              
            </div>
           
        </div>
    )
} 