import { Request, Response } from "express";
import { UserModel } from "../../model/usersModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Login = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      response
        .status(400)
        .send({ message: "User email or password not match" });
      return;
    }

    // if (!user.password) {
    //   response
    //     .status(500)
    //     .send({ message: " User password not found in DataBase" });
    // }

    const isPasswordValid = await bcrypt.compare(password, user.password!);

    const tokenPassword = "foodDelivery";

    const token = jwt.sign(
      { userId: user._id, isAdmin: user.role === "ADMIN" ? true : false },
      tokenPassword
    );

    if (!isPasswordValid) {
      response.status(401).send({ message: " Wrong password, try again" });
      return;
    } else {
      response
        .status(200)
        .send({ message: "Successfully logged in ", token, userId: user._id });
      return;
    }
  } catch (error) {
    console.log(error, "Login error");
    response.status(401).send({ message: "Server error ?" });
  }
};
