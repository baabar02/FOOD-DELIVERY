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



// export const getFoodsByCategory = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { categoryId } = req.query; // Optional category filter
//     const query = categoryId ? { category: categoryId } : {}; // Empty query for all foods
//     const foods = await FoodModel.find(query)
//       .select("name price description imageUrl") // Adjust fields based on your schema
//       .populate("category", "categoryName"); // Optional, to include category name

//     res.status(200).send({
//       message: "Foods retrieved successfully",
//       data: foods,
//     });
//   } catch (err) {
//     console.error("Error fetching foods:", err);
//     res.status(500).send({ message: "Server error occurred" });
//   }
// };
