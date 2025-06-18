

import { Request, Response } from "express";
import { FoodCategoryModel } from "../../model/categoryModel";

export const createCategory = async (request: Request, response: Response) => {
  try {
    const { categoryName } = request.body;

    if (!categoryName) {
      return response.status(401).send({ message: "Category name is required" });
    }

    const existingCategory = await FoodCategoryModel.findOne({ categoryName });
    if (existingCategory) {
      return response.status(400).send({ message: "Category already exists" });
    }

    const newCategory = await FoodCategoryModel.create({ categoryName });

    return response.status(201).send({
      message: "Successfully created category",
      data: newCategory,
    });

  } catch (err) {
    console.error(err);
    return response.status(500).send({ message: "Server error occurred" });
  }
};
