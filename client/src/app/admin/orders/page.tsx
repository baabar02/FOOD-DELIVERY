"use client";
import { Button } from "@/components/ui/button";

import axios from "axios";
import { Calendar, Table } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DataTableDemo } from "./_components/table";
import { format } from "date-fns";
import { StateChanger } from "./_components/statechanger";
import { Payment } from "./_components/column";
// import DatePicker from "react-datepicker";

export enum orderStatusType {
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
  DELIVERED = "DELIVERED",
}

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
      `${process.env.NEXT_PUBLIC_API_URL}/admin/order/update`,
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
    <div className="w-full bg-gray-50 container mx-4">
       <Button  
       className="flex flex-reverse"
       onClick={handleLogout}>Logout</Button>
      <div className="flex flex-col justify-between">
        <div className="flex justify-between">
            <h1 className="text-2xl font-black mb-5">Orders</h1>
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
          selectedOrderIds={selectedOrderId} />
        </div>
    
      <DataTableDemo data={data} 
      onCheckedChangeAction={function (_id: string, _status: boolean): void {
    throw new Error("Function not implemented.");
  }}

        />
      </div>
     
    </div>
  );
};

export default AdminOrderPage;

