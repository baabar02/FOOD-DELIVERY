import express, { request, Request, Response } from "express";
import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import cors from "cors";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { string } from "yup";


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



const Users = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: false },
  otp: {type: String },
  otpExpires: { type: Date},
  createdAt: { type: Date, default: Date.now, immutable: true },
  updatedAt: { type: Date, default: Date.now },
});

const UserModel = model("Users", Users);

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



app.post("/resend-verification", async (request: Request, response: Response) => {
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



app.delete("/delete", async (req: Request, res: Response) => {
  const { email } = req.body;
  await UserModel.findOneAndDelete({ email });
  res.send("Amjilttai");
});



app.post("/email", async (request: Request, response: Response) => {
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

  app.post("/sendOtp", async (request: Request, response: Response) => {
    const {email} = request.body;
    if(!email) {
      response.status(400).send({message:"Email is required"})
      return;
    }

    const user = await UserModel.findOne({email});

    if(!user) {
      response.send("User does not exist")
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
    text:`your OTP code is, ${otp}, "It expires 10 minutes"`
    }

  await transporter.sendMail(options)
    response.send("OTP sent to email")
  });

  app.post("checkOtp", async (request: Request, response: Response) => {
    const {email, otp} = request.body;
    if(!email || !otp) {
      response.send({message:"Email and OTP are required"})
      return;
    }
    const user = await UserModel.findOne({email});
    if(!user) {
      response.send({message:"Invalid or expired OTP"});
      return;
    }
    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save();
    response.send({message: "OTP verified successfully"})
    
  });

  app.post("/reset-password", async (request: Request, response: Response) => {
  const { email, newPassword } = request.body;

  if (!email || !newPassword) {
    response.status(400).send({ message: "Email and new password are required" });
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

});


app.listen(8000, () => {
  console.log(`running on http://localhost:8000`);
});







