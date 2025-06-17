import mongoose, { model } from "mongoose";
import cors from "cors";
import { Schema } from "mongoose";

enum UserRoleEnum {
  USER = "USER",
  ADMIN = "ADMIN",
}

export type UserType = {
  _id:String;
  // user: ObjectId;
  email: string;
  password: string;
  phoneNumber?: string;
  address?: string;
  role: UserRoleEnum;
  id?: string;
  otp?: string | null;
  otpExpires: Date | null;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export const UserSchema = new Schema<UserType>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: false },
  address: { type: String, required: false },
  role: { type: String, enum: ["ADMIN", "USER"], required: false },

  id: { type: String },
  // orderedFoods: [{ type: Schema.Types.ObjectId, ref: "FoodOrder" }],
  otp: { type: String },
  otpExpires: { type: Date },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, immutable: true },
  updatedAt: { type: Date, default: Date.now },
});

UserSchema.index({email: 1}, {unique:true});

export const UserModel = model<UserType>("Users", UserSchema);
