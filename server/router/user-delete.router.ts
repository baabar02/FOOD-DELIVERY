import { Router } from "express";
import { TokenChecker } from "../middleware/token-checker";
import { UserRouter } from "./user-router";
import { createCategory } from "../controller/category/create-category";
import { allCategory } from "../controller/category/get-Categories";
import { allOrder } from "../controller/foodOrder/food-order";
import { addFoodOrder } from "../controller/foodOrder/addFood-order";
import { deleteUser } from "../controller/user/deleteUser";

export const DeleteRouter = Router();

DeleteRouter.post("/delete",TokenChecker, deleteUser)
