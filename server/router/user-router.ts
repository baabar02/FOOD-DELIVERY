import { Router } from "express";
import signUp from "../controller/user/signup";
import { Login } from "../controller/user/login";
import { checkOtp, resetPassword, sendOtp } from "../controller/user/forgot";
import { resendVerification, Verify } from "../src/middleware/verify";

export const UserRouter = Router();

UserRouter.post("/signup", signUp);
UserRouter.post("/login", Login);
UserRouter.post("/verify", Verify);
UserRouter.put("/resend-verification", resendVerification);

UserRouter.post("/sendOtp", sendOtp);
UserRouter.post("/checkOtp", checkOtp);
UserRouter.post("/reset-password", resetPassword);

