import { Request, Response } from "express";
import { FoodCategoryModel } from "../../model/categoryModel";


export const allCategory = async (request: Request, response: Response) => {
  const { categoryName } = request.body;
  if (!categoryName) {
    response.status(400).send({ message: "Category name is required" });
    return;
  }
  const existingCategory = await FoodCategoryModel.find({ categoryName });
  if (existingCategory) {
    response.status(400).send({ message: "Category already exists" });
  }
  try {
    const newCategory = await FoodCategoryModel.create({ categoryName });
    response.status(201).send({
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
  
    response.status(500).json({ message: "Database connection has error" });
  }
};