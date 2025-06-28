import { Request, Response } from "express";
import { FoodCategoryModel } from "../../model/categoryModel";

export const allCategory = async (_request: Request, response: Response) => {
  try {
    const newCategory = await FoodCategoryModel.find({});

    response.status(200).send({
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    response.status(500).json({ message: "Database connection has error" });
  }
};
