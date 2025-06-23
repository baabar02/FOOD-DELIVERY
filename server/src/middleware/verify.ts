import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { UserModel } from "../../model/usersModel";

export const Verify = async (request: Request, response: Response) => {
  const { token } = request.body;

  const tokenPassword = "foodDelivery";

  const isValid = jwt.verify(token, tokenPassword);
  try {
    if (isValid) {
      const destructToken: any = jwt.decode(token);
      response.send(destructToken);
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
