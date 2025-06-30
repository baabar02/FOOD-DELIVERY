import { Router } from "express";
import { allCategory } from "../controller/category/get-Categories";

import { TokenChecker } from "../src/middleware/token-checker";
import { isAdmin } from "../src/middleware/authorization";
import { getAllOrders } from "../controller/admin/get-all-orders";
import { updateOrderStatus } from "../controller/admin/update-order-status";
import { updateFoods } from "../controller/admin/update-foods";

export const AdminRouter = Router();

AdminRouter.get("/admin/all-orders", [TokenChecker, isAdmin], getAllOrders);
AdminRouter.put(
  "/admin/order/update",
  [TokenChecker, isAdmin],
  updateOrderStatus
);
AdminRouter.put("/admin/food-update/", [TokenChecker, isAdmin], updateFoods);
