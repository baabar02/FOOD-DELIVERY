import { Router } from "express";
import { allCategory } from "../controller/category/get-Categories";
import { createCategory } from "../controller/category/create-category";
import { TokenChecker } from "../src/middleware/token-checker";

export const CategoryRouter = Router();

CategoryRouter.get("/categories",  TokenChecker, allCategory);
CategoryRouter.post("/categories", TokenChecker, createCategory);
