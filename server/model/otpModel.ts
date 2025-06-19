import { model, Schema } from "mongoose";
import { UserType } from "./usersModel";

export type OtpType = {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  code: string;

  createdAt: Date;
};

export type OtpPopulated = {
  userId: UserType;
  code: string;
  createdAt: Date;
};

export const Otp = new Schema({
  code: { type: String, required: true },
  userId: { type: Schema.ObjectId, required: true, ref: "Users" },
  createdAt: { type: Date, default: Date.now, expires: 900 },
});

export const OtpModel = model<OtpType>("Otps", Otp);
