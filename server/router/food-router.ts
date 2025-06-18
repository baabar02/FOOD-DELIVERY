import { Router } from "express";
import { addFood } from "../controller/food/add-food";
import { getFoodsbyCategory } from "../controller/food/getfoods-by-category";
import { TokenChecker } from "../middleware/token-checker";


export const FoodRouter = Router();

FoodRouter.get("/foods", getFoodsbyCategory);
FoodRouter.post("/foods", TokenChecker, addFood);