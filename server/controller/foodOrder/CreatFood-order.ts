import { Request, Response } from "express";
import { FoodOrderModel, StatusEnum } from "../../model/foodOrderModel";
import { Types } from "mongoose";
import { FoodModel } from "../../model/foodModel";

export const CreateFoodOrder = async (request: Request, response: Response) => {
  try {
    const { user, totalPrice, foodOrderItems, address } = request.body;
    const { userId } = response.locals;
    console.log(response.locals, "userIda]");

    if (!user || !totalPrice || !foodOrderItems || !address) {
      return response.status(400).send({ message: "Missing required fields" });
    }

    if (!Array.isArray(foodOrderItems) || foodOrderItems.length === 0) {
      return response
        .status(400)
        .send({ message: "foodOrderItems must be a non-empty array" });
    }

    for (const [index, item] of foodOrderItems.entries()) {
      if (!item.food || !Types.ObjectId.isValid(item.food)) {
        console.log(index);
        console.log(item);
        console.log(foodOrderItems);

        return response.status(400).send({
          message: `Invalid food ID at index ${index}: ${item.food}`,
        });
      }

      const foodExists = await FoodModel.findById(item.food);
      if (!foodExists) {
        return response.status(400).send({
          message: `Food item with ID ${item.food} at index ${index} does not exist`,
        });
      }
    }

    const newOrder = await FoodOrderModel.create({
      user: userId,
      foodOrderItems,
      totalPrice,
      address,
      status: StatusEnum.PENDING,
    });

    const populatedOrder = await FoodOrderModel.findById(newOrder._id).populate(
      "foodOrderItems",
      "user",
      "email phoneNumber address"
    );
    // .populate("foodOrderItems.food");
    console.log("Received foodOrderItems:", foodOrderItems);
    response.status(201).send({
      message: "Food order created successfully",
      data: populatedOrder,
    });
  } catch (err) {
    console.error("Order creation error:", err);
    response.status(500).send({ message: "Internal server error" });
  }
};
