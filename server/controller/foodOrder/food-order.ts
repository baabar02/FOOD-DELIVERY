import { Request, Response } from "express";
import { FoodOrderModel } from "../../model/foodOrderModel";


export const allOrder = async (request: Request, response: Response) => {
    // "/food-order"
  response.send("food-order");
  const { user } = request.body;
  if (!user) {
    response.status(401).send({ message: "User authentication required" });
  }

  const orders = await FoodOrderModel.find({ user })
    .populate("user", "email phoneNumber address")
    .populate("foodOrderItems.food", "foodName price image");
  response.status(200).send({
    message: "Food orders retrieved successfully",
    data: orders,
  });
};