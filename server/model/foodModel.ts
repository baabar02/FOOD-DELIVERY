import { model, ObjectId, Schema } from "mongoose";

type NewType = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type Food = NewType;

export const FoodSchema = new Schema({
  foodName: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  ingredients: { type: String, required: true },
  category: {
    type: Schema.Types.ObjectId,
    ref: "FoodCategories",
    required: true,
  },
  createdAt: { type: Date, default: Date.now, immutable: true },
  updatedAt: { type: Date, default: Date.now },
});

FoodSchema.index({ foodName: 1 }, { unique: true });

export const FoodModel = model<Food>("Foods", FoodSchema);
