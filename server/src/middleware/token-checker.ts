import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const TokenChecker = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authorization = request.headers.authorization;

  if (!authorization) {
    return response.status(401).send({ message: "Token is missing ?" });
  }

  const token = authorization.split(" ")[1];

  const secret = "foodDelivery";

  try {
    const decoded = jwt.verify(token, secret) as { userId: string };

    response.locals.userId = decoded.userId;

    return next();
  } catch (err) {
    console.error("JWT verification error:", err);
    return response.status(401).send({ message: "Token is invalid" });
  }
};
