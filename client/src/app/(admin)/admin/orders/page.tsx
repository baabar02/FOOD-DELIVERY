"use client";
import { Button } from "@/components/ui/button";

import axios from "axios";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DataTableDemo } from "./_components/table";
import { format } from "date-fns";
import { StateChanger } from "./_components/statechanger";
import { Payment } from "./_components/column";
import { orderStatusType } from "./enum";

const AdminOrderPage = () => {
  const router = useRouter();
  const [user, setUser] = useState();
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string[]>([]);
  const [orderStatus, setOrderStatus] = useState<orderStatusType>(
    orderStatusType.PENDING
  );
  // const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getAdminOrders = async () => {
      const { data } = await axios.get(
        "https://food-delivery-p342.onrender.com/admin/all-orders",
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
    image: `${order.image}`,
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
  // console.log(selectedOrderId, "hhha");

  const statusHandlerAction = (orderStatus: orderStatusType) => {
    setOrderStatus(orderStatus);
  };

  const saveChangeAction = async (): Promise<void> => {
    if (selectedOrderId.length === 0) {
      alert("Please select at least one order to update.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in!");
        return;
      }

      const prepare = selectedOrderId.map((order) => ({
        _id: order,
        status: orderStatus,
      }));

      await axios.put(
        "https://food-delivery-p342.onrender.com/admin/order/update",
        { orders: prepare },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updated = orders.map((order) =>
        selectedOrderId.includes(order._id)
          ? { ...order, status: orderStatus }
          : order
      );
      setOrders(updated);
      setSelectedOrderId([]);
    } catch (error) {
      console.error("Failed to update orders:", error);
      throw new Error("Failed to update orders");
    } finally {
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(undefined);
    router.push("/LogIn");
  };

  return (
    <div className="flex flex-col w-full bg-gray-50 container mx-4">
      <Button className="flex w-[50px] flex-reverse" onClick={handleLogout}>
        Logout
      </Button>
      <div className="flex flex-col justify-between">
        <div className="flex mx-4 justify-between">
          <div>
            <h1 className="text-2xl font-black mb-5">Orders</h1>
            <div>
              <h2 className="mt-2 text-sm text-muted-foreground">
                Items: {data.length}
              </h2>
            </div>
          </div>

          {/* <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => setSelectedDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select a date"
              className="border rounded-md p-2"
              isClearable
            /> */}
          <StateChanger
            saveChangeAction={saveChangeAction}
            statusHandlerAction={statusHandlerAction}
            orderStatus={orderStatus}
            selectedOrderIds={selectedOrderId}
          />
        </div>

        <DataTableDemo data={data} onCheckedChangeAction={selectHandler} />
      </div>
    </div>
  );
};

export default AdminOrderPage;
