import { Request, Response } from "express";
import { UserModel } from "../../model/usersModel";

export const deleteUser = async (req: Request, res: Response) => {
  const { email } = req.body;
  await UserModel.findOneAndDelete({ email });
  res.send("Amjilttai");
};