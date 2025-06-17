import router, { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { UserModel } from "../model/usersModel";

export const TokenCheker = async (request: Request, response: Response, next: NextFunction) => {
    const authorization = request.headers.authorization;

    if(!authorization){
       response.status(401).send({ message: "token is not valid" });
        return;
    }

    const token = authorization.split('')[1];

    const tokenPassword = "foodDelivery";

    const isValid = jwt.verify(token, tokenPassword);

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



