import { Request, Response } from "express";
import { FoodModel } from "../../model/foodModel";



export const updateFoods = async (
  request: Request,
  response: Response
) => {
  const { foods } = request.body;
  console.log(request.body, 'food?');
 

  if (!request.body) {
    return response.status(400).json({ error: "Missing _id in request body" });
  }

  if (!foods || !Array.isArray(foods)) {
    return response.status(400).json({ message: "Invalid request format" });
  }
  try {
     await Promise.all(

      foods.map(
        async (food: Record<string, string>) =>
          await FoodModel.findByIdAndUpdate(
            food._id,

            { _id: food._id, 
            foodName:food.foodName, 
            ingredients: food.ingredients,
            price:food.price,
             image:food.image,
            category:food.category },
            { new: true }
            
          )
      )
      
    );
   
    response.status(200).send({ message: "success" });
  } catch (error) {
    console.log(error);
  }
};

