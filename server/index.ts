"use client";

import express, { request, Request, Response } from "express";
import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import cors from "cors";
import jwt from "jsonwebtoken";

const databaseConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://baabarmx:EA6CG3oFW45UnlTB@cluster0.p7lafs3.mongodb.net/food-delivery"
    );
    console.log("Connected to mongoDB");
  } catch (err) {
    console.log(err, "Database connection error");
  }
};

const Users = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, immutable: true },
  updatedAt: { type: Date, default: Date.now },
});

const UserModel = model("Users", Users);

const app = express();
app.use(express.json());
app.use(cors());

databaseConnect();

app.get("/", async (request: Request, response: Response) => {
  response.send("Hello world");
});

app.post("/signup", async (request: Request, response: Response) => {
  const { email, password, firstName } = request.body;

  const isEmailExisted = await UserModel.findOne({ email });
  if (!isEmailExisted) {
    const hashedPassword = await bcrypt.hashSync(password, 10);
    await UserModel.create({ email, password: hashedPassword });
    response.send({ messege: "Successfully registered" });
    return;
  }
  response.send({ message: "User already existed" });
});

app.post("/login", async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      response.status(400).send({ message: "User doesn't exist " });
      return;
    }

    if (!user.password) {
      response
        .status(500)
        .send({ messegae: " User password not found in DataBase" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password!);

    const tokenPassword = "foodDelivery";

    const token = jwt.sign({ userId: user._id }, tokenPassword);
    if (!isPasswordValid) {
      response.status(401).send({ message: " Wrong password, try again" });
      return;
    } else {
      response
        .status(200)
        .send({ message: "Successfully logged in ", token, userID: user?._id });
      return;
    }
  } catch (error) {
    console.log(error, " Login error");
    response.status(500).send({ message: "Server error" });
  }
});

// app.post("/login", async (request: Request, response: Response) => {
//   console.log("Request body:", request.body);
//   response.status(200).send({ message: "Test response" });
// });

app.post("/reset-password", async (request: Request, response: Response) => {
  const { email } = request.body;

  if (!email) {
    response.status(400).send({ message: "Email is required" });
    return;
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    response.status(404).send({ message: "User does not exist" });
    return;
  }
});

app.post(
  "/resend-verification",
  async (request: Request, response: Response) => {
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
  }
);

app.post("verify-code", async (request: Request, response: Response) => {});

app.delete("/delete", async (req: Request, res: Response) => {
  const { email } = req.body;
  await UserModel.findOneAndDelete({ email });
  res.send("Amjilttai");
});

app.listen(8000, () => {
  console.log(`running on http://localhost:8000`);
});
