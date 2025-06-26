
// import type { Metadata } from "next";
// import { Link, MenuSquare, TruckIcon } from "lucide-react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { usePathname, useRouter } from "next/navigation";

// export const metadata: Metadata = {
//   title: "Admin",
//   description: "admin",
// };


// export default function AdminLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;

// }>) {

//   }

//   return (
//     <html lang="en">
//       <body>
//         <div className="flex flex-row w-screen justify-center">
//      <div className="flex flex-col items-center gap-5 w-[200px] h-screen bg-amber-50">


//         <Image className="mt-4 self-center"
//               width={165}
//               height={44}
//               src="/Logo Container.png" alt={""} ></Image>

//   <Button 
//   className="w-[165px] h-[40px] rounded-2xl">
//                <MenuSquare/> Food menu
//               </Button>

//               <Button 
          
//               className="w-[165px] h-[40px] rounded-2xl">
//                 <TruckIcon/> Orders
//               </Button>
//       </div>
//            {children}
//         </div>
        
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import { MenuSquare, TruckIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";




export const metadata: Metadata = {
  title: "Admin",
  description: "Admin dashboard",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // const router = useRouter();

  // const [position, setPosition] = useState<string>(pathname); 

  // const handleNavigation = (route: string) => {
  //   setPosition(route); 
  //   router.push(route); 
  // };

  return (
    <div className="flex flex-row min-h-screen">
      {/* Sidebar */}
      <div className="flex flex-col items-center gap-5 w-[200px] md:w-[250px] bg-amber-50 p-4">
        <Image
          className="mt-4"
          width={165}
          height={44}
          src="/Logo Container.png"
          alt="Company Logo"
        />

        <Button
          className="w-[165px] h-[40px] rounded-2xl flex items-center gap-2"      
        >
          <MenuSquare /> Food Menu
        </Button>

        <Button
           className="w-[165px] h-[40px] rounded-2xl flex items-center gap-2" 
          // onClick={() => handleNavigation("/admin/orders")}
        >
          <TruckIcon /> Orders
        </Button>
      </div>

  
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}