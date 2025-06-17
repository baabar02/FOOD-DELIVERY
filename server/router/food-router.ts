import { Router } from "express";
import { TokenCheker } from "../middleware/token-checker";
import { addFood } from "../controller/food/add-food";
import { getFoodsbyCategory } from "../controller/food/getfoods-by-category";


export const FoodRouter = Router();

FoodRouter.get("/foods", getFoodsbyCategory);
FoodRouter.post("/addFoods", TokenCheker, addFood);