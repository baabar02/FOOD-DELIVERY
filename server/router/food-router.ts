import { TokenCheker } from "../middleware/verify";
import { UserRouter } from "./user-router";

export const FoodRouter = ();

FoodRouter.get("/",TokenCheker)
FoodRouter.post("/", TokenCheker)