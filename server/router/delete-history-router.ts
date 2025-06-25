import { Router } from "express";
import { allCategory } from "../controller/category/get-Categories";

import { TokenChecker } from "../src/middleware/token-checker";
import { ClearOrderHistory } from "../controller/foodOrder/delete-food-history";

export const DeleteHistoryRouter = Router();

DeleteHistoryRouter.delete(
  "/clear-order/:_id",
  TokenChecker,
  ClearOrderHistory
);
