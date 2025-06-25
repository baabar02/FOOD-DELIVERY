import { NextFunction, Request, Response } from "express";
import { UserModel, UserRoleEnum } from "../../model/usersModel";

export const isAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { userId } = response.locals;

  try {
    const user = await UserModel.findById({ _id: userId });
    console.log(user, "saddsa");

    if (!user) {
      response.status(404).send({ message: "user not found" });
    }
    if (user?.role === UserRoleEnum.ADMIN) {
      console.log(user.role, "lll");

      next();
      return;
    }
    response.status(401).send({ message: "Unauthorized user" });
    return;
  } catch (error) {
    response.status(400).send({ message: "token is invalid" });
  }
};
