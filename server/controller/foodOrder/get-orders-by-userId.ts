import { Request, Response } from "express";
import { FoodOrderModel } from "../../model/foodOrderModel";

export const allOrder = async (request: Request, response: Response) => {
  try {
    const { userId } = response.locals;
    // const {userId} = request.body.user?._id;
    if (!userId) {
      return response
        .status(401)
        .send({ message: "User authentication required" });
    }

    const ordersbyUserId = await FoodOrderModel.find({ user: userId }).populate(
      {
        path: "foodOrderItems",
        populate: {
          path: "food",
          model: "Foods",
        },
      }
    );
    // .populate("foodOrderItems.food", "foodName price image")

    console.log("Retrieved orders for user:", userId, ordersbyUserId);

    response.status(200).send({
      message: "Food orders retrieved successfully",
      data: ordersbyUserId,
    });
  } catch (error) {
    console.error("Get order history error:", error);
    response.status(500).send({ message: "Internal server error" });
  }
};
