import { model, ObjectId, Schema } from "mongoose";

export enum StatusEnum {
  CANCELED = "CANCELED",
  DELIVERED = "DELIVERED",
  PENDING = "PENDING",
}

export type FoodOrder = {
  user: ObjectId;
  totalPrice: number;
  foodOrderItems: FoodOrderItem[];
  status: StatusEnum;
  createdAt: Date;
  updatedAt: Date;
};

type FoodOrderItem = {
  food: ObjectId;
  quantity: number;
};

const FoodOrderItemSchema = new Schema(
  {
    food: { type: Schema.ObjectId, ref: "Foods", required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

export const FoodOrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  foodOrderItems: { type: [FoodOrderItemSchema], required: true },
  totalPrice: { type: Number, required: true },
  address: { type: String, required: true },
  status: {
    type: String,

    enum: Object.values(StatusEnum),
    default: StatusEnum.PENDING,
  },
  createdAt: { type: Date, default: Date.now, immutable: true },
  updatedAt: { type: Date, default: Date.now },
});

export const FoodOrderModel = model<FoodOrder>("Food-Order", FoodOrderSchema);
