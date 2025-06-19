import { Router } from "express";
import { addFood } from "../controller/food/add-food";

import { TokenChecker } from "../src/middleware/token-checker";
import { getFoodsGroupedByCategory } from "../controller/food/getfoods-by-category";

export const FoodRouter = Router();

FoodRouter.get("/foods", getFoodsGroupedByCategory);
FoodRouter.post("/foods", TokenChecker, addFood);
