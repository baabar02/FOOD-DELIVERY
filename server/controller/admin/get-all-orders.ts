import { Request, Response } from "express";
import { OrderRouter } from "../../router/order-router";
import { FoodOrderModel } from "../../model/foodOrderModel";

export const getAllOrders = async (_request: Request, response: Response) => {
  const allOrders = await FoodOrderModel.find({}).populate({
    path: "foodOrderItems",
    populate: {
      path: "food",
      model: "Foods",
    },
  });
  response.status(200).send({ orders: allOrders });
};
