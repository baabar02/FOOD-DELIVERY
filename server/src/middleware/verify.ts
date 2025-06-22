import router, { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { UserModel } from "../../model/usersModel";
import axios from "axios";



export const Verify = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { token } = request.body;

  const tokenPassword = "foodDelivery";

  const isValid = jwt.verify(token, tokenPassword);

// const result = await axios.post('http://localhost:8000/verify', { token });
// console.log('Verify response bn uu:', result.data);

  try {
    const destructToken = jwt.decode(token);

    if (isValid) {
      const destructToken: any = jwt.decode(token);
      response.locals.userId = destructToken?.userId;
      next();
      return;
    } else {
      response.status(401).send({ message: "token is not valid" });
      return;
    }
  } catch (err) {
    response.status(401).send({ message: "token is not valid" });
    return;
  }
};

// "/resend-verification"
export const resendVerification = async (
  request: Request,
  response: Response
) => {
  const { email } = request.body;
  if (!email) {
    response.status(400).send({ message: "Email is required" });
    return;
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    response.status(400).send({ message: "User does not exist" });
    return;
  }
  response.send({ message: "Verification email resent" });
};
