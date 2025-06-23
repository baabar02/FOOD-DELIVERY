// import { Request, Response } from "express";
// import { FoodOrderModel } from "../../model/foodOrderModel";

// export const allOrder = async (request: Request, response: Response) => {
//   // "/food-order"
//   response.send("food-order");
//   const { user } = request.body;
//   if (!user) {
//     response.status(401).send({ message: "User authentication required" });
//   }
//   console.log("Received foodOrderItems:", request.body.foodOrderItems);
//   const orders = await FoodOrderModel.find({ user })
//     .populate("user", "email phoneNumber address")
//     .populate("foodOrderItems.food", "foodName price image");
//   response.status(200).send({
//     message: "Food orders retrieved successfully",
//     data: orders,
//   });
// };

import { Request, Response } from "express";
import { FoodOrderModel } from "../../model/foodOrderModel";

export const allOrder = async (request: Request, response: Response) => {
  try {
    const userId = request.body.user?._id; 
    if (!userId) {
      return response.status(401).send({ message: "User authentication required" });
    }

    const orders = await FoodOrderModel.find({ user: userId })
      .populate("user", "email phoneNumber address")
      .populate("foodOrderItems.food", "foodName price image")
      .sort({ createdAt: -1 }); 

    console.log("Retrieved orders for user:", userId, orders);

    response.status(200).send({
      message: "Food orders retrieved successfully",
      data: orders,
    });
  } catch (error) {
    console.error("Get order history error:", error);
    response.status(500).send({ message: "Internal server error" });
  }
};