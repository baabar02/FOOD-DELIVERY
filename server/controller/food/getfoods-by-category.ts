import { Request, Response } from "express";
import { FoodModel } from "../../model/foodModel";

export const getFoodsGroupedByCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await FoodModel.aggregate([
      {
        $lookup: {
          from: "foodcategories",
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

// const obj: Record<string, number | string> = {};
// const item = "hehe";
// const hello = "haha";

// obj[hello] = 123;
// obj.hello = 123;

// obj[item] = "dagger";

// const arr = [1, 2, 3, 4, 5];
// const sumOfArray = arr.reduce((accumulator: any, eachElement: any) => {
//   accumulator += eachElement;
//   return accumulator;
// }, 0);
