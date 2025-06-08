import express, { request, Request, Response } from "express";
import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import cors from "cors";

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
  firstName: { type: String, request: true },
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
  const { email, password } = request.body;
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
  const { email, password } = request.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    response.status(400).send({ message: "User doesn't exit " });
    return;
  } else {
    const hashedPassword = await bcrypt.compareSync(
      password,
      user.password!
    );

    if (hashedPassword) {
      response.send({ message: "Successfully logged in " });
      return;
    } else {
      response.send({ message: " Wrong password, try again" });
      return;
    }
  }
});

app.post('/reset-password', async (request:Request, response: Response) => {
  const {email} = request.body;
  if(!email) {
    response.status(400).send({message: "User does not exist"});
    return;
  }
})

app.listen(8000, () => {
  console.log(`running on http://localhost:8000`);
});


// app.get("/users", async (request: Request, response: Response) => {
//   const users = await UserModel.find();
//   response.send("successfully");
// });

// app.post("/users", async (request: Request, response: Response) => {
//   console.log("hi");

//   const { email, password, firstName } = request.body;

//   const result = await UserModel.create({ email, password, firstName });
//   response.send(result);
// });

// app.put("/users", async (request: Request, response: Response) => {
//   const { id, input } = request.body;

//   const updateUser = await UserModel.findByIdAndUpdate(
//     { _id: id },
//     {
//       email: input.email,
//       password: input.password,
//       firstName: input.firstName,
//     },
//     {
//       new: true,
//     }
//   );
//   response.send(updateUser);
// });

// app.patch("/users", async (request: Request, response: Response) => {
//   const { id, input } = request.body;
//   const patchUser = await UserModel.findOneAndReplace(
//     { _id: id },
//     {
//       email: input.email,
//       password: input.password,
//       firstName: input.firstName,
//     },
//     { new: true }
//   );
//   response.send(patchUser);
// });

// app.delete("/users", async (request: Request, response: Response) => {
//   const { id } = request.body;
//   const deleteUser = await UserModel.findByIdAndDelete(
//     { _id: id },

//     { new: true }
//   );

//   response.send(deleteUser);
// });