import { Request, Response } from "express";
import { FoodOrderModel, StatusEnum } from "../../model/foodOrderModel";
import { FoodModel } from "../../model/foodModel";

export const addFoodOrder =  async (request: Request, response: Response) => {
  const { user, totalPrice, quantity, foodOrderItems } = request.body;

  console.log(user, totalPrice, quantity);

  const orderFood = await FoodOrderModel.find({
    user,
    totalPrice,
    quantity,
  });
  // const userId = request.user?.userId;
  // if(!userId){
  // response.status(401).send("User authentication required");
  // return;
  // }

  const { food: foodId } = request.body;

  if (!foodId || !quantity) {
    response.status(401).send("Invalid food or quantity");
    return;
  }
  const food = await FoodModel.findById({ foodId });

  const newOrder = await FoodOrderModel.create({
    user,
foodOrderItems,
    totalPrice,
    status: StatusEnum.PENDING,
  });
  const populatedOrder = await FoodOrderModel.findById({ newOrder }).populate(
    "user",
    "email phoneNumber address"
  );
  response.status(201).json({
    message: "Food order created successfully",
    data: populatedOrder,
  });
};

// export const addFoodOrder = async (request: Request, response: Response) => {
//   const { user, totalPrice, foodOrderItems } = request.body;

//   if (!user || !foodOrderItems || foodOrderItems.length === 0) {
//     return response.status(400).json({ message: "Missing order details" });
//   }

//   try {
//     const newOrder = await FoodOrderModel.create({
//       user,
//       foodOrderItems,
//       totalPrice,
//       status: StatusEnum.PENDING,
//     });

//     const populatedOrder = await FoodOrderModel.findById(newOrder._id)
//       .populate("user", "email phoneNumber address")
//       .populate("foodOrderItems.food", "foodName price image");

//     response.status(201).json({
//       message: "Food order created successfully",
//       data: populatedOrder,
//     });
//   } catch (err) {
//     console.error("Order error:", err);
//     response.status(500).json({ message: "Failed to place food order" });
//   }
// };
