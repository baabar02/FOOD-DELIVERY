

"use client";

import { MenuSquare, TruckIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLayoutChild({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [position, setPosition] = useState<string>(pathname);

  const handleNavigation = (route: string) => {
    setPosition(route);
    router.push(route);
  };

  return (
    <div className="flex flex-row min-h-screen">
      <div className="flex flex-col items-center gap-5 w-[200px] md:w-[250px] bg-amber-50 p-4">
        <Image
          className="mt-4"
          width={165}
          height={44}
          src="/Logo Container.png"
          alt="Company Logo"
        />

        <Button
          onClick={() => handleNavigation("/admin/menu")}
          className="w-[165px] h-[40px] rounded-2xl flex items-center gap-2"
        >
          <MenuSquare /> Food Menu
        </Button>

        <Button
          className="w-[165px] h-[40px] rounded-2xl flex items-center gap-2"
          onClick={() => handleNavigation("/admin/orders")}
        >
          <TruckIcon /> Orders
        </Button>
      </div>

      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
