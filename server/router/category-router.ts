import { Router } from "express";
import { TokenCheker } from "../middleware/token-checker";
import { UserRouter } from "./user-router";
import { createCategory } from "../controller/category/create-category";
import { allCategory } from "../controller/category/get-Categories";

export const CategoryRouter = Router();

CategoryRouter.post("/addCategories",TokenCheker, createCategory)
CategoryRouter.get("/categories", allCategory)