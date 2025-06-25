import { Request, Response } from "express";
import { FoodOrderModel } from "../../model/foodOrderModel";

export const ClearOrderHistory = async (
  request: Request,
  response: Response
) => {
  try {
    const { userId } = response.locals;
    const { _id } = request.params;

    if (!userId) {
      response.status(400).send({ message: "User authentication required" });
      return;
    }
    const order = await FoodOrderModel.findByIdAndDelete({ _id });

    if (!order) {
      response.status(404).json({ message: "Order not found" });
      return;
    }

    response.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    response.status(400).send({ message: "User authentification required" });
    return;
  }
};
