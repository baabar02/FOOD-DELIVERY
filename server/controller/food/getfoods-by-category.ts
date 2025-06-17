import { Request, Response } from "express";
import { UserModel } from "../../model/usersModel";
import jwt from "jsonwebtoken";
import { FoodModel } from "../../model/foodModel";

export const getFoodsbyCategory = async (_request: Request, response: Response) => {

  try {
    const allFoodsbyCategory = await FoodModel.find().populate("category", )
   console.log(allFoodsbyCategory);
   
   
  } catch (error) {
    
    response.status(400).send({ message: "Food name must not be duplicated" });
  }
};