import { Request, Response } from "express";
import { FoodCategoryModel } from "../../model/categoryModel";


export const allCategory = async (request: Request, response: Response) => {
  const { categoryName } = request.body;
  console.log(categoryName,'categories');

  if (!categoryName || typeof categoryName !== "string" || categoryName.trim() === "") {
    return response.status(400).json({ message: "Valid category name is required" });
  }


  try {
    const existing = await FoodCategoryModel.findOne({ categoryName });
    if (existing) {
      return response.status(409).json({ message: "Category already exists" });
    }
 
    const newCategory = await FoodCategoryModel.create({ categoryName });
    response.status(201).send({
      message: "Category created successfully",
      data: newCategory,
    });
     console.log(newCategory, "saved");
    
  } catch (error) {
  
    console.error("Error creating category:", error);
    response.status(500).json({ message: "Database connection has error" });
  }
};