"use client";
import { Button } from "@/components/ui/button";

import axios from "axios";
import { Table } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DataTableDemo, Payment } from "./_components/table";
import { format } from "date-fns";

enum orderStatusType {
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
  DELIVEVED = "DELIVERED",
}

const AdminOrderPage = () => {
  const router = useRouter();
  const [user, setUser] = useState();
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string[]>([]);
  const [orderStatus, setOrderStatus] = useState<orderStatusType>(
    orderStatusType.PENDING
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getAdminOrders = async () => {
      const { data } = await axios.get(
        "http://localhost:8000/admin/all-orders",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("haha", data);

      setOrders(data.orders);
    };
    getAdminOrders();
  }, []);
  console.log(orders, "orderss");

  const data: Payment[] = orders.map((order: Record<string, any>, index) => ({
    id: order._id,
    number: index + 1,
    customer: `${order.email}`,
    food: `${order.foodOrderItems?.length || 0} food`,
    date: format(new Date(order.createdAt), "yyyy-MM-dd"),
    total: Number(order.totalPrice),
    status: order.status,
    address: order.address,
    quantity: order.quantity,
  }));

  const selectHandler = (_id: string, selected: boolean) => {
    if (selected) {
      setSelectedOrderId((prev) => [...prev, _id]);
    } else {
      const removed = selectedOrderId.filter((item) => item !== _id);
      setSelectedOrderId(removed);
    }
  };

  const statusHandler = (orderStatus: orderStatusType) => {
    setOrderStatus(orderStatus);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(undefined);
    router.push("/LogIn");
  };

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>

      <DataTableDemo data={data} />
    </div>
  );
};

export default AdminOrderPage;
