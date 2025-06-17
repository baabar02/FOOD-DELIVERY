import { Request, Response } from "express";
import {UserModel} from "../../model/usersModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OtpModel, OtpPopulated } from "../../model/otpModel";
import nodemailer from "nodemailer"

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


export const sendOtp = async (request: Request, response: Response) => {
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
};


export const checkOtp = async (request: Request, response: Response) => {
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
};


export const resetPassword = async (request: Request, response: Response) => {
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
};