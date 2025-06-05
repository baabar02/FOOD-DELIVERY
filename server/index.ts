import express, { request, Request, Response } from "express";
import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const databaseConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://baabarmx:EA6CG3oFW45UnlTB@cluster0.p7lafs3.mongodb.net/food-delivery"
    );
  } catch (err) {
    console.log(err);
  }
};

const Users = new Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },

  createdAt: { type: Date, default: Date.now, immutable: true },
  updatedAt: { type: Date, default: Date.now },
});

const UserModel = model("Users", Users);

const app = express();
app.use(express.json());
databaseConnect();

app.get("/users", async (request: Request, response: Response) => {
  const users = await UserModel.find();
  response.send("successfully");
});

app.post("/users", async (request: Request, response: Response) => {
  console.log("hi");

  const { email, password } = request.body;

  const result = await UserModel.create({ email, password });
  response.send(result);
});

app.put("/users", async (request: Request, response: Response) => {
  const { id, input } = request.body;

  const updateUser = await UserModel.findByIdAndUpdate(
    { _id: id },
    {
      email: input.email,
      password: input.password,
    },
    {
      new: true,
    }
  );
  response.send(updateUser);
});

app.delete("/users", async (request: Request, response: Response) => {
  const { id } = request.body;
  const deleteUser = await UserModel.findByIdAndDelete(
    { _id: id },

    { new: true }
  );

  response.send(deleteUser);
});

app.listen(8000, () => {
  console.log(`running on http://localhost:8000`);
});
