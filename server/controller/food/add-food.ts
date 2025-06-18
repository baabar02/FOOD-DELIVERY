import { Request, Response } from "express";
import { UserModel } from "../../model/usersModel";
import jwt from "jsonwebtoken";
import { FoodModel } from "../../model/foodModel";

export const addFood = async (request: Request, response: Response) => {

  try {
    const { foodName, price, category, ingredients, image } = request.body;

    await FoodModel.create({foodName,price, category, ingredients, image });
    response.send({message: "Food successfully added"})
  

   
  } catch (error) {
    
    response.status(400).send({ message: "Food name must not be duplicated" });
  }
};



