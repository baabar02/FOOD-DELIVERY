import { Request, Response } from "express";
import { FoodOrderModel } from "../../model/foodOrderModel";

export const updateOrderStatus = async (
  request: Request,
  response: Response
) => {
  const { orders } = request.body;
  console.log(request.body);

  if (!request.body) {
    return response.status(400).json({ error: "Missing _id in request body" });
  }

  if (!orders || !Array.isArray(orders)) {
    return response.status(400).json({ message: "Invalid request format" });
  }
  try {
    await Promise.all(
      orders.map(
        async (order: Record<string, string>) =>
          await FoodOrderModel.findByIdAndUpdate(
            { _id: order._id },
            { status: order.status },
            { new: true }
          )
      )
    );
    response.status(200).send({ message: "success" });
  } catch (error) {
    console.log(error);
  }
};
