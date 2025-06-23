import { Request, Response } from "express";
import { FoodOrderModel, StatusEnum } from "../../model/foodOrderModel";

export const addFoodOrder = async (request: Request, response: Response) => {
  try {
    const { user, totalPrice, foodOrderItems, address } = request.body;

    if (!user || !totalPrice || !foodOrderItems || !address) {
      return response.status(400).send({ message: "Missing required fields" });
    }

    console.log({
      foodOrderItems: foodOrderItems,
    });

    const newOrder = await FoodOrderModel.create({
      user,
      foodOrderItems,
      totalPrice,
      address,
      status: StatusEnum.PENDING,
    });
    console.log("Created order:", newOrder);
    const populatedOrder = await FoodOrderModel.findById(newOrder._id).populate(
      "user",
      "email phoneNumber address"
    );

    response.status(201).send({
      message: "Food order created successfully",
      data: populatedOrder,
    });
  } catch (err) {
    console.error("Order creation error:", err);
    response.status(500).send({ message: "Internal server error" });
  }
};
