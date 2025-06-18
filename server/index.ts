import express, { request, Request, Response } from "express";
import mongoose, { ObjectId } from "mongoose";
import { Schema, model } from "mongoose";

import cors from "cors";

import nodemailer from "nodemailer";
import { UserRouter } from "./router/user-router";
import { UserModel } from "./model/usersModel";
import { CategoryRouter } from "./router/category-router";
import { FoodRouter } from "./router/food-router";
import { OrderRouter } from "./router/order-router";
import { DeleteRouter } from "./router/user-delete.router";

const app = express();
app.use(express.json());
app.use(cors());

const databaseConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://new:newnew@cluster0.p7lafs3.mongodb.net/food-delivery?retryWrites=true",
      {}
    );
    console.log("Connected to mongoDB");
  } catch (err) {
    console.log(err, "Database connection error");
  }
};

app.get("/", async (request: Request, response: Response) => {
  response.send("hi");
  return;
});

databaseConnect();

app.use(UserRouter);
app.use(CategoryRouter);
app.use(FoodRouter);
app.use(OrderRouter);
app.use(DeleteRouter);

app.listen(8000, () => {
  console.log(`running on http://localhost:8000`);
});
