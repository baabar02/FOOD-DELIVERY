import type { Metadata } from "next";
import { Link } from "lucide-react";


export const metadata: Metadata = {
  title: "Admin",
  description: "admin",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-row w-screen">
     <div className="flex flex-col gap-20 w-[200px] h-screen bg-amber-300">
        <p>logo</p>
   <Link href="admn/menu">menu</Link>
   <Link href="admin/orders">menu</Link>
      </div>
           {children}
        </div>

 
   
       
         
      </body>
    </html>
  );
}
