import { Router } from "express";

import { UserRouter } from "./user-router";
import { TokenChecker } from "../middleware/token-checker";
import { Request, Response } from "express";
import { allCategory } from "../controller/category/get-Categories";
import { createCategory } from "../controller/category/create-category";

export const CategoryRouter = Router();

CategoryRouter.get("/categories", allCategory);
CategoryRouter.post("/categories", TokenChecker, createCategory)
