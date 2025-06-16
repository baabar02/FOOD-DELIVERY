import express, { request, Request, Response } from "express";
import mongoose, { ObjectId } from "mongoose";
import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import cors from "cors";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const app = express();
app.use(express.json());
app.use(cors());
// require("dotenv").config();

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

type FoodOrderItem = {
  food: ObjectId;
  quantity: Number;
};

enum StatusEnum {
  CANCELED = "CANCELED",
  DELIVERED = "DELIVERED",
  PENDING = "PENDING",
}

type food = {
  foodName: string;
  price: Number;
  image: string;
  ingredients: string;
  category: ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

type User = {
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  role: UserRoleEnum;
  orderedFoods: ObjectId;
  ttl: Date;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const FoodOrderItemSchema = new Schema({
  food: { type: Schema.ObjectId, ref: "Food", required: true },
  // FoodOrder:{type:{type:[FoodOrderSchema]}, required:true, ref:"FoodOrder"},
  quantity: { type: Number, required: true },
});

const FoodOrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  foodOrderItems: { type: [FoodOrderItemSchema], required: true },
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: Object.values(StatusEnum),
    default: StatusEnum.PENDING,
  },
  createdAt: { type: Date, default: Date.now, immutable: true },
  updatedAt: { type: Date, default: Date.now },
});

const FoodSchema = new Schema({
  foodName: { type: String, required: true },
  FoodOrder: { type: [FoodOrderSchema], required: true, ref: "FoodOrder" }, // ?
  price: { type: Number, required: true },
  image: { type: String, required: true },
  ingredients: { type: String, required: true },
  category: {
    type: Schema.Types.ObjectId,
    ref: "FoodCategory",
    required: true,
  },
  createdAt: { type: Date, default: Date.now, immutable: true },
  updatedAt: { type: Date, default: Date.now },
});

type UserRoleEnum = {
  user: User;
  admin: ADMIN;
};

type FoodOrder = {
  user: ObjectId;
  totalPrice: Number;
  foodOrderItems: FoodOrderItem[];
  status: StatusEnum;
  createdAt: Date;
  updatedAt: Date;
};

type FoodOrderStatusEnum = {
  pending: "PENDING";
  canceled: "CANCELED";
  delivered: "DELIVERED";
};

const FoodOrderStatusEnum = new Schema({
  pending: {
    type: { type: [FoodOrderSchema] },
    required: true,
    ref: "FoodOrder",
  },
  canceled: {},
  delivered: {},
});

type FoodCategory = {
  categoryName: string;
  createdAt: Date;
  updatedAt: Date;
};

const FoodCategorySchema = new Schema({
  categoryName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, immutable: true },
  updatedAt: { type: Date, default: Date.now },
});
const UserRoleEnumSchema = {
  USER: "USER",
  ADMIN: "ADMIN",
};

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  role: {
    type: String,
    enum: Object.values(UserRoleEnum),
    default: UserRoleEnum.USER,
  },
  orderedFoods: [{ type: Schema.Types.ObjectId, ref: "FoodOrder" }],
  ttl: { type: Date },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, immutable: true },
  updatedAt: { type: Date, default: Date.now },
});

type UserType = {
  email: string;
  password: string;
  id?: string;
  otp?: string | null;
  otpExpires: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

const Users = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: false },
  id: { type: String },
  otp: { type: String },
  otpExpires: { type: Date },
  createdAt: { type: Date, default: Date.now, immutable: true },
  updatedAt: { type: Date, default: Date.now },
});

type OtpType = {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  code: string;

  createdAt: Date;
};

type OtpPopulated = {
  userId: UserType;
  code: string;
  createdAt: Date;
};

const Otp = new Schema({
  code: { type: String, required: true },
  userId: { type: Schema.ObjectId, required: true, ref: "Users" },
  createdAt: { type: Date, default: Date.now, expires: 900 },
});

const UserModel = model<UserType>("Users", Users);
const OtpModel = model<OtpType>("Otp", Otp);

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "baabarmx@gmail.com",
    pass: "yignruoqpvxgluyq",
  },
});

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
    response.send({ message: "Successfully registered" });
    return;
  }
  response.send({ message: "User already existed" });
});

app.post("/login", async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;
    console.log(email, password);

    const user = await UserModel.findOne({ email });
    if (!user) {
      response.status(400).send({ message: "User doesn't exist " });
      return;
    }

    if (!user.password) {
      response
        .status(500)
        .send({ message: " User password not found in DataBase" });
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
    console.log(error, "Login error");
    response.status(500).send({ message: "Server error" });
  }
});

app.post("/verify", async (request: Request, response: Response) => {
  const { token } = request.body;

  const tokenPassword = "foodDelivery";

  const isValid = jwt.verify(token, tokenPassword);

  try {
    const destructToken = jwt.decode(token);

    if (isValid) {
      const destructToken = jwt.decode(token);
      response.send({ destructToken });
      return;
    } else {
      response.status(401).send({ message: "token is not valid" });
      return;
    }
  } catch (err) {
    response.status(401).send({ message: "token is not valid" });
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
    response.send({ message: "Verification email resent" });
  }
);

app.post("/sendOtp", async (request: Request, response: Response) => {
  const { email } = request.body;

  const isExistingUser = await UserModel.findOne({ email });

  if (!isExistingUser) {
    response.status(401).send({ message: "User does not exist" });
    return;
  }

  if (!email) {
    response.status(400).send({ message: "Email is required" });
    return;
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    response.send("User does not exist");
    return;
  }

  const otp = Math.floor(100000 + Math.random() * 90000).toString();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

  user.otp = otp;
  user.otpExpires = otpExpires;
  await user.save();

  const options = {
    from: "baabarmx@gmail.com",
    to: "baabar_mx@yahoo.com",
    subject: "Your OTP code",
    html: `your OTP code is, ${otp}, "It expires 10 minutes"`,
  };
  await OtpModel.create({ code: otp, userId: isExistingUser._id });

  await transporter.sendMail(options);
  response.send("OTP sent to email");
  return;
});

app.post("/checkOtp", async (request: Request, response: Response) => {
  const { email, otp } = request.body;

  if (!email || !otp) {
    response.status(400).send({ message: "Email and OTP are required" });
    return;
  }

  try {
    const isOtpExisting = await OtpModel.findOne({
      code: otp,
    }).populate<OtpPopulated>("userId");

    if (!isOtpExisting) {
      response.status(400).send({ message: "Invalid or expired OTP" });
      return;
    }

    if (email === isOtpExisting || isOtpExisting?.userId?.email) {
      response.status(200).send({ message: "Success", isOtpExisting });
      return;
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      response.send({ message: "Invalid or expired OTP" });
      return;
    }
    user.otp = null;
    user.otpExpires = null;

    await user.save();

    response.status(200).send({ message: "OTP verified successfully" });
    return;
  } catch (err) {
    response.status(400).send("Error");
  }
});

// app.put("/updatePassword", async)

app.post("/reset-password", async (request: Request, response: Response) => {
  const { email, newPassword } = request.body;

  if (!email || !newPassword) {
    response
      .status(400)
      .send({ message: "Email and new password are required" });
    return;
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    response.status(404).send({ message: "User does not exist" });
    return;
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;

  await user.save();
  response.send("New password successfully created");
});

app.delete("/delete", async (req: Request, res: Response) => {
  const { email } = req.body;
  await UserModel.findOneAndDelete({ email });
  res.send("Amjilttai");
});

app.post("/email", async (request: Request, response: Response) => {
  const { email } = request.body;
  const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "baabarmx@gmail.com",
      pass: "yignruoqpvxgluyq",
    },
  });

  const options = {
    from: "baabarmx@gmail.com",
    to: "baabar_mx@yahoo.com",
    subject: "Hellooo",
    text: "testing",
  };

  await transport.sendMail(options);
});

app.listen(8000, () => {
  console.log(`running on http://localhost:8000`);
});

//ads//
