import { Request, Response } from "express";
import { FoodModel } from "../../../model/foodModel";

export const getFoodsGroupedByCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await FoodModel.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      { $unwind: "$categoryInfo" },
      {
        $group: {
          _id: "$categoryInfo.categoryName",
          foods: {
            $push: {
              _id: "$_id",
              foodName: "$foodName",
              image: "$image",
              price: "$price",
              ingredients: "$ingredients",
            },
          },
        },
      },
    ]);

    const groupedByCategory = result.reduce((acc, item) => {
      acc[item._id] = item.foods;
      return acc;
    }, {} as Record<string, any[]>);

    res.send({ foods: groupedByCategory });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error while fetching foods" });
  }
};
