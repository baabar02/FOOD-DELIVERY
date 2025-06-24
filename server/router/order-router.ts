import { Router } from "express";
import { UserRouter } from "./user-router";
import { createCategory } from "../controller/category/create-category";
import { allCategory } from "../controller/category/get-Categories";
import { allOrder } from "../controller/foodOrder/get-orders-by-userId";
import { CreateFoodOrder } from "../controller/foodOrder/CreatFood-order";
import { TokenChecker } from "../src/middleware/token-checker";

export const OrderRouter = Router();

OrderRouter.post("/create-order", TokenChecker, CreateFoodOrder);
OrderRouter.get("/food-order", TokenChecker, allOrder);
