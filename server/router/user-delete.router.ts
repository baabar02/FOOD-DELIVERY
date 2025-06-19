import { Router } from "express";
import { deleteUser } from "../controller/user/deleteUser";
import { TokenChecker } from "../src/middleware/token-checker";

export const DeleteRouter = Router();

DeleteRouter.post("/delete", TokenChecker, deleteUser);
