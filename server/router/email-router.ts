import { Router } from "express";
import { sendEmail } from "../controller/user/sendEmail";
import { TokenChecker } from "../src/middleware/token-checker";

export const EmailRouter = Router();

EmailRouter.post("/email", TokenChecker, sendEmail);
