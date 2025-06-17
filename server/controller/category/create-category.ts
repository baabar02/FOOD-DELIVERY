import { Request, Response } from "express";
import { FoodCategoryModel } from "../../model/categoryModel";
import { FoodModel } from "../../model/foodModel";


export const createCategory = async (request: Request, response: Response) => {
try{
 const { categoryName } = request.body;
  response.send(categoryName);
  const categories = await FoodCategoryModel.create({ categoryName });
  response.send({message:"Successully created category"});
  
  if (!categoryName) {
    response.status(401).send({ message: "Category name is required" });
  }
//   const populatedCategories:any = await FoodCategoryModel.findOne(
//     categories.map(async (category: { _id: any; }) => {
//       const foods = await FoodModel.find({ category: category._id });
//       return foods;
//     })
//   );

  response.status(200).send({
    message: "food categories returned successfully",
    // data: populatedCategories,
  });
} catch (err) {
    response.status(400).send({message:"server occured error"})
}
  
 
};

