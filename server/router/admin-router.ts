import { Router } from "express";
import { allCategory } from "../controller/category/get-Categories";

import { TokenChecker } from "../src/middleware/token-checker";
import { isAdmin } from "../src/middleware/authorization";
import { getAllOrders } from "../controller/admin/get-all-orders";

export const AdminRouter = Router();

AdminRouter.get("/admin/all-orders", [TokenChecker, isAdmin], getAllOrders);
